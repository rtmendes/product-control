import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { KnowledgeBaseService } from '../services/knowledge-base.service';

const router = Router();
const kb = new KnowledgeBaseService();

router.get('/brand/:userId', requireAuth(), async (req, res) => {
  try {
    const data = await kb.getBrandGuidelines(req.params.userId);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync', requireAuth(), async (req, res) => {
  try {
    await kb.syncToMCP(req.body);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
