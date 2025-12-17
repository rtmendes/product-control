import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { CopywritingAgent } from '../services/ai-agents/copywriting.agent';
import { VisualAssetAgent } from '../services/ai-agents/visual-asset.agent';
import { SEOAgent } from '../services/ai-agents/seo.agent';
import { QualityAssuranceAgent } from '../services/ai-agents/quality-assurance.agent';
import { OptimizationAgent } from '../services/ai-agents/optimization.agent';
import { KnowledgeManagementAgent } from '../services/ai-agents/knowledge-management.agent';

const router = Router();

// Initialize AI agents
const copywritingAgent = new CopywritingAgent();
const visualAgent = new VisualAssetAgent();
const seoAgent = new SEOAgent();
const qaAgent = new QualityAssuranceAgent();
const optimizationAgent = new OptimizationAgent();
const knowledgeAgent = new KnowledgeManagementAgent();

// Get all agents status
router.get('/status', requireAuth(), async (req, res) => {
  try {
    const statuses = {
      copywriting: await copywritingAgent.getStatus(),
      visual: await visualAgent.getStatus(),
      seo: await seoAgent.getStatus(),
      qa: await qaAgent.getStatus(),
      optimization: await optimizationAgent.getStatus(),
      knowledge: await knowledgeAgent.getStatus(),
    };
    
    res.json(statuses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Generate copywriting for product
router.post('/copywriting/generate', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productId, assetTypes } = req.body;
    
    const result = await copywritingAgent.generateCopy({
      userId,
      productId,
      assetTypes,
    });
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Generate visual assets
router.post('/visual/generate', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productId, assetTypes, specifications } = req.body;
    
    const result = await visualAgent.generateVisuals({
      userId,
      productId,
      assetTypes,
      specifications,
    });
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Generate SEO optimizations
router.post('/seo/optimize', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productId, targetKeywords } = req.body;
    
    const result = await seoAgent.optimizeProduct({
      userId,
      productId,
      targetKeywords,
    });
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Run quality assurance check
router.post('/qa/check', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productId, checkTypes } = req.body;
    
    const result = await qaAgent.runQualityCheck({
      userId,
      productId,
      checkTypes,
    });
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get optimization recommendations
router.post('/optimization/recommend', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productId } = req.body;
    
    const result = await optimizationAgent.getRecommendations({
      userId,
      productId,
    });
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Train knowledge base
router.post('/knowledge/train', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { trainingData } = req.body;
    
    const result = await knowledgeAgent.train({
      userId,
      trainingData,
    });
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Generate complete product bundle (all assets)
router.post('/generate-bundle', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { productId, options } = req.body;
    
    // This triggers all agents in sequence with quality checks
    const results = {
      productId,
      status: 'generating',
      steps: [],
    };
    
    // Step 1: Generate copywriting
    results.steps.push({ agent: 'copywriting', status: 'in_progress' });
    const copyResult = await copywritingAgent.generateCopy({
      userId,
      productId,
      assetTypes: options.copyAssets || ['product_description', 'email_sequence', 'social_posts'],
    });
    results.steps[0].status = 'completed';
    results.steps[0].data = copyResult;
    
    // Step 2: Quality check on copy
    results.steps.push({ agent: 'qa', status: 'in_progress', checkpoint: 'copywriting' });
    const copyQA = await qaAgent.runQualityCheck({
      userId,
      productId,
      checkTypes: ['copywriting'],
    });
    results.steps[1].status = 'completed';
    results.steps[1].data = copyQA;
    
    // Step 3: Generate visuals
    results.steps.push({ agent: 'visual', status: 'in_progress' });
    const visualResult = await visualAgent.generateVisuals({
      userId,
      productId,
      assetTypes: options.visualAssets || ['product_images', 'social_graphics', 'ad_creatives'],
      specifications: options.visualSpecs,
    });
    results.steps[2].status = 'completed';
    results.steps[2].data = visualResult;
    
    // Step 4: SEO optimization
    results.steps.push({ agent: 'seo', status: 'in_progress' });
    const seoResult = await seoAgent.optimizeProduct({
      userId,
      productId,
      targetKeywords: options.keywords,
    });
    results.steps[3].status = 'completed';
    results.steps[3].data = seoResult;
    
    // Step 5: Final quality check
    results.steps.push({ agent: 'qa', status: 'in_progress', checkpoint: 'final' });
    const finalQA = await qaAgent.runQualityCheck({
      userId,
      productId,
      checkTypes: ['all'],
    });
    results.steps[4].status = 'completed';
    results.steps[4].data = finalQA;
    
    // Step 6: Get optimization recommendations
    results.steps.push({ agent: 'optimization', status: 'in_progress' });
    const recommendations = await optimizationAgent.getRecommendations({
      userId,
      productId,
    });
    results.steps[5].status = 'completed';
    results.steps[5].data = recommendations;
    
    // Step 7: Update knowledge base
    results.steps.push({ agent: 'knowledge', status: 'in_progress' });
    await knowledgeAgent.train({
      userId,
      trainingData: {
        productId,
        results: {
          copywriting: copyResult,
          visual: visualResult,
          seo: seoResult,
          qa: finalQA,
          optimization: recommendations,
        },
      },
    });
    results.steps[6].status = 'completed';
    
    results.status = 'completed';
    results.completedAt = new Date();
    
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
