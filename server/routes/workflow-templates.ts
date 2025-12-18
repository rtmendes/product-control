import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('workflow_templates')
      .select('*')
      .order('product_type');

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching workflow templates:', error);
    res.status(500).json({ error: 'Failed to fetch workflow templates' });
  }
});

router.get('/:productType', async (req, res) => {
  try {
    const { productType } = req.params;

    const { data, error } = await supabase
      .from('workflow_templates')
      .select('*')
      .eq('product_type', productType)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Workflow template not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching workflow template:', error);
    res.status(500).json({ error: 'Failed to fetch workflow template' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { product_type, stages, conditional_fields, description } = req.body;

    const { data, error } = await supabase
      .from('workflow_templates')
      .insert({
        product_type,
        stages,
        conditional_fields,
        description,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating workflow template:', error);
    res.status(500).json({ error: 'Failed to create workflow template' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('workflow_templates')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating workflow template:', error);
    res.status(500).json({ error: 'Failed to update workflow template' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('workflow_templates')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting workflow template:', error);
    res.status(500).json({ error: 'Failed to delete workflow template' });
  }
});

export default router;
