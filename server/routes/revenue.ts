import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const goals = await prisma.revenueGoal.findMany({ where: { userId } });
    res.json(goals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;
    const goal = await prisma.revenueGoal.create({ data: { userId, ...req.body } });
    res.json(goal);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', requireAuth(), async (req, res) => {
  try {
    const goal = await prisma.revenueGoal.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(goal);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
