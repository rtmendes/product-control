import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/', requireAuth(), async (req, res) => {
  try {
    const { productId } = req.query;
    const assets = await prisma.asset.findMany({
      where: productId ? { productId: productId as string } : {}
    });
    res.json(assets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', requireAuth(), async (req, res) => {
  try {
    const asset = await prisma.asset.create({ data: req.body });
    res.json(asset);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
