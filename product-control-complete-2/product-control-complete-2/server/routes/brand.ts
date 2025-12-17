import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/guidelines', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const guidelines = await prisma.brandGuidelines.findFirst({ where: { userId } });
    res.json(guidelines || {});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/guidelines', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const guidelines = await prisma.brandGuidelines.upsert({
      where: { userId },
      update: req.body,
      create: { userId, ...req.body }
    });
    res.json(guidelines);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/avatar', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const { avatarUrl } = req.body;
    const guidelines = await prisma.brandGuidelines.upsert({
      where: { userId },
      update: { avatarUrl },
      create: { userId, avatarUrl }
    });
    res.json(guidelines);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
