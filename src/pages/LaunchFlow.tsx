import { useState } from 'react';
import { BookOpen, GraduationCap, ShoppingBag, Printer, FileText, Share2 } from 'lucide-react';
import { ProductWorkflowManager } from '@/components/workflows/ProductWorkflowManager';

type ProductType = 'book' | 'course' | 'ecommerce' | 'print-on-demand' | 'article' | 'social-media';

interface ProductTypeConfig {
  id: ProductType;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  stageCount: number;
}

const PRODUCT_TYPES: ProductTypeConfig[] = [
  {
    id: 'book',
    name: 'Book',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    description: 'Amazon KDP & Self-Publishing',
    stageCount: 15
  },
  {
    id: 'course',
    name: 'Course',
    icon: <GraduationCap className="h-6 w-6" />,
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
    description: 'Online Education Platform',
    stageCount: 14
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce',
    icon: <ShoppingBag className="h-6 w-6" />,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-300',
    description: 'Shopify, EZsite & More',
    stageCount: 13
  },
  {
    id: 'print-on-demand',
    name: 'Print on Demand',
    icon: <Printer className="h-6 w-6" />,
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    description: 'Etsy, Redbubble & Custom Designs',
    stageCount: 12
  },
  {
    id: 'article',
    name: 'Article',
    icon: <FileText className="h-6 w-6" />,
    color: 'text-pink-700',
    bgColor: 'bg-pink-100',
    borderColor: 'border-pink-300',
    description: 'Blog Posts & Content Marketing',
    stageCount: 12
  },
  {
    id: 'social-media',
    name: 'Social Media',
    icon: <Share2 className="h-6 w-6" />,
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100',
    borderColor: 'border-cyan-300',
    description: 'Content Creation & Community',
    stageCount: 14
  }
];

export default function LaunchFlow() {
  const [selectedProductType, setSelectedProductType] = useState<ProductType | null>(null);
  const [workflowStages, setWorkflowStages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectProductType = async (productType: ProductType) => {
    setLoading(true);
    setSelectedProductType(productType);

    try {
      const response = await fetch(`/api/workflow-templates/${productType}`);
      if (response.ok) {
        const template = await response.json();
        const initializedStages = template.stages.map((stage: any) => ({
          ...stage,
          status: 'not-started',
          notes: '',
          resources: [],
          mediaFiles: [],
          tags: [],
          knowledgeBase: []
        }));
        setWorkflowStages(initializedStages);
      }
    } catch (error) {
      console.error('Failed to load workflow template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStagesUpdate = (updatedStages: any[]) => {
    setWorkflowStages(updatedStages);
  };

  if (selectedProductType) {
    const config = PRODUCT_TYPES.find(pt => pt.id === selectedProductType);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedProductType(null)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 capitalize flex items-center gap-3">
                <span className={`${config?.bgColor} ${config?.color} p-2 rounded-lg`}>
                  {config?.icon}
                </span>
                {selectedProductType.replace('-', ' ')} Workflow
              </h1>
              <p className="text-slate-600 mt-1">{config?.description}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ProductWorkflowManager
            productType={selectedProductType}
            stages={workflowStages}
            onStagesUpdate={handleStagesUpdate}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">LaunchFlow Dashboard</h1>
        <p className="text-slate-600 mt-2">
          Complete end-to-end workflows for 6 product types: Books, Courses, Ecommerce, Print-on-Demand, Articles & Social Media
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">🚀 Choose Your Product Type</h2>
        <p className="text-slate-700">
          Each workflow includes stage-by-stage guidance from ideation to launch, with comprehensive marketing tools,
          asset management, and analytics tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCT_TYPES.map((productType) => (
          <button
            key={productType.id}
            onClick={() => handleSelectProductType(productType.id)}
            className={`group relative bg-white rounded-lg border-2 ${productType.borderColor} p-6 text-left hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${productType.bgColor} ${productType.color} mb-4`}>
              {productType.icon}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{productType.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{productType.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-sm font-medium text-slate-700">
                {productType.stageCount} Stages
              </span>
              <span className={`text-sm font-medium ${productType.color} group-hover:translate-x-1 transition-transform`}>
                Start →
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">✨ What's Included in Every Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <div className="font-medium text-slate-900">Stage-by-Stage Guidance</div>
              <div className="text-sm text-slate-600">Detailed descriptions for each workflow phase</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="font-medium text-slate-900">Status Tracking</div>
              <div className="text-sm text-slate-600">Not Started, In Progress, Completed states</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <div className="font-medium text-slate-900">Notes & Documentation</div>
              <div className="text-sm text-slate-600">Add unlimited notes to each stage</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔗</span>
            <div>
              <div className="font-medium text-slate-900">Resources & Links</div>
              <div className="text-sm text-slate-600">Attach helpful resources and references</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <div className="font-medium text-slate-900">Knowledge Base</div>
              <div className="text-sm text-slate-600">Link SOPs, Google Docs, Notion pages</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏷️</span>
            <div>
              <div className="font-medium text-slate-900">Tags & Organization</div>
              <div className="text-sm text-slate-600">Categorize and filter stages easily</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
