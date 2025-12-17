import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const integrations = await prisma.integration.findMany({ where: { userId } });
    res.json(integrations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const integration = await prisma.integration.create({ data: { userId, ...req.body } });
    res.json(integration);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
