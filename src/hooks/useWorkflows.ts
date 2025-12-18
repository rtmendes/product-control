import { useState, useEffect } from 'react';

interface WorkflowTemplate {
  id: string;
  product_type: string;
  stages: any[];
  conditional_fields?: any;
  description?: string;
}

interface ProductWorkflow {
  id: string;
  project_id: string;
  product_type: string;
  stages: any[];
  marketing_config?: any;
  ecommerce_config?: any;
  branding_canvas?: any;
}

export function useWorkflows() {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [workflows, setWorkflows] = useState<ProductWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/workflow-templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (err) {
      setError('Failed to fetch workflow templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createWorkflow = async (projectId: string, productType: string) => {
    try {
      const response = await fetch('/api/product-workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, product_type: productType }),
      });

      if (response.ok) {
        const newWorkflow = await response.json();
        setWorkflows([...workflows, newWorkflow]);
        return newWorkflow;
      }
    } catch (err) {
      console.error('Failed to create workflow:', err);
      throw err;
    }
  };

  const updateWorkflow = async (workflowId: string, updates: Partial<ProductWorkflow>) => {
    try {
      const response = await fetch(`/api/product-workflows/${workflowId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updated = await response.json();
        setWorkflows(workflows.map(w => w.id === workflowId ? updated : w));
        return updated;
      }
    } catch (err) {
      console.error('Failed to update workflow:', err);
      throw err;
    }
  };

  const getWorkflowByProject = (projectId: string) => {
    return workflows.find(w => w.project_id === projectId);
  };

  const getTemplateByType = (productType: string) => {
    return templates.find(t => t.product_type === productType);
  };

  return {
    templates,
    workflows,
    loading,
    error,
    createWorkflow,
    updateWorkflow,
    getWorkflowByProject,
    getTemplateByType,
  };
}
