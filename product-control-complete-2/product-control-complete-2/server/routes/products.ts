import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { prisma } from '../lib/prisma';
import { ProductStrategyAgent } from '../services/ai-agents/product-strategy.agent';
import { KnowledgeBaseService } from '../services/knowledge-base.service';

const router = Router();
const productAgent = new ProductStrategyAgent();
const knowledgeBase = new KnowledgeBaseService();

// Get all products
router.get('/', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    
    const products = await prisma.product.findMany({
      where: { userId },
      include: {
        assets: true,
        revenueGoals: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    
    const product = await prisma.product.findFirst({
      where: { id, userId },
      include: {
        assets: true,
        revenueGoals: true,
      },
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product with AI generation
router.post('/', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productType, productData, generateAssets } = req.body;
    
    // Store product intent in knowledge base
    await knowledgeBase.storeProductIntent({
      userId,
      productType,
      productData,
      timestamp: new Date(),
    });
    
    // Create product
    const product = await prisma.product.create({
      data: {
        userId,
        name: productData.name,
        description: productData.description,
        productType,
        status: 'draft',
        metadata: productData,
      },
    });
    
    // If generateAssets is true, trigger AI agents
    if (generateAssets) {
      // Get brand guidelines from knowledge base
      const brandGuidelines = await knowledgeBase.getBrandGuidelines(userId);
      
      // Generate product strategy
      const strategy = await productAgent.generateStrategy({
        product,
        brandGuidelines,
        productType,
      });
      
      // Store strategy in knowledge base
      await knowledgeBase.storeProductStrategy({
        productId: product.id,
        strategy,
      });
      
      // Trigger other AI agents asynchronously
      // (They will work in background and create assets)
      res.json({
        product,
        strategy,
        message: 'Product created. AI agents are generating assets...',
      });
    } else {
      res.json({ product });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.patch('/:id', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    const updateData = req.body;
    
    const product = await prisma.product.findFirst({
      where: { id, userId },
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        assets: true,
        revenueGoals: true,
      },
    });
    
    // Log update to knowledge base
    await knowledgeBase.logProductUpdate({
      productId: id,
      changes: updateData,
      timestamp: new Date(),
    });
    
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    
    const product = await prisma.product.findFirst({
      where: { id, userId },
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await prisma.product.delete({
      where: { id },
    });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get product performance analytics
router.get('/:id/analytics', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;
    
    const product = await prisma.product.findFirst({
      where: { id, userId },
      include: {
        assets: {
          include: {
            performanceData: true,
          },
        },
        revenueGoals: true,
      },
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Calculate analytics
    const analytics = {
      totalAssets: product.assets.length,
      assetsByType: product.assets.reduce((acc: any, asset) => {
        acc[asset.assetType] = (acc[asset.assetType] || 0) + 1;
        return acc;
      }, {}),
      totalRevenue: product.revenueGoals.reduce((sum, goal) => sum + goal.currentAmount, 0),
      revenueProgress: product.revenueGoals.map(goal => ({
        id: goal.id,
        period: goal.period,
        target: goal.targetAmount,
        current: goal.currentAmount,
        percentage: (goal.currentAmount / goal.targetAmount) * 100,
      })),
    };
    
    res.json(analytics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
