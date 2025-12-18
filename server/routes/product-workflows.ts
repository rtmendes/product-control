import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

router.get('/', async (req, res) => {
  try {
    const { project_id } = req.query;

    let query = supabase.from('product_workflows').select('*');

    if (project_id) {
      query = query.eq('project_id', project_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching product workflows:', error);
    res.status(500).json({ error: 'Failed to fetch product workflows' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('product_workflows')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Product workflow not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching product workflow:', error);
    res.status(500).json({ error: 'Failed to fetch product workflow' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { project_id, product_type } = req.body;

    const { data: template, error: templateError } = await supabase
      .from('workflow_templates')
      .select('stages')
      .eq('product_type', product_type)
      .maybeSingle();

    if (templateError) throw templateError;

    const initialStages = template?.stages || [];

    const { data, error } = await supabase
      .from('product_workflows')
      .insert({
        project_id,
        product_type,
        stages: initialStages.map((stage: any) => ({
          ...stage,
          status: 'not-started',
          notes: '',
          resources: [],
          mediaFiles: [],
          tags: [],
          knowledgeBase: [],
        })),
        marketing_config: {},
        ecommerce_config: {},
        branding_canvas: {},
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating product workflow:', error);
    res.status(500).json({ error: 'Failed to create product workflow' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('product_workflows')
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
    console.error('Error updating product workflow:', error);
    res.status(500).json({ error: 'Failed to update product workflow' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('product_workflows')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product workflow:', error);
    res.status(500).json({ error: 'Failed to delete product workflow' });
  }
});

export default router;
