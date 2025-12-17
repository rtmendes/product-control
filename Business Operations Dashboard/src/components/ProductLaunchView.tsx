import { useState } from 'react';
import { WorkflowStageCard } from './WorkflowStageCard';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { BookOpen, GraduationCap, ShoppingCart, Palette, FileText, Share2, List, Kanban, Pencil, GitBranch, Settings, BarChart3 } from 'lucide-react';
import { StageKanbanView } from './StageKanbanView';
import { StageWhiteboardView } from './StageWhiteboardView';
import { StageGanttView } from './StageGanttView';
import { EcommercePlatformConfig } from './EcommercePlatformConfig';
import { EnhancedMarketingHub } from './EnhancedMarketingHub';
import { WorkflowComparisonTable } from './WorkflowComparisonTable';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import type { Product, WorkflowStage, EcommercePlatformConfig as PlatformConfig, MarketingConfig } from '../App';

interface ProductLaunchViewProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onBack: () => void;
}

const productTypeConfig = {
  book: { icon: BookOpen, label: 'Book', color: 'bg-blue-100 text-blue-700' },
  course: { icon: GraduationCap, label: 'Course', color: 'bg-green-100 text-green-700' },
  ecommerce: { icon: ShoppingCart, label: 'Ecommerce', color: 'bg-purple-100 text-purple-700' },
  'print-on-demand': { icon: Palette, label: 'Print on Demand', color: 'bg-orange-100 text-orange-700' },
  article: { icon: FileText, label: 'Article', color: 'bg-pink-100 text-pink-700' },
  'social-media': { icon: Share2, label: 'Social Media', color: 'bg-cyan-100 text-cyan-700' },
};

export function ProductLaunchView({ product, onUpdate }: ProductLaunchViewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'whiteboard' | 'gantt'>('list');
  const config = productTypeConfig[product.type];
  const Icon = config.icon;

  const updateStage = (updatedStage: WorkflowStage) => {
    const updatedProduct = {
      ...product,
      stages: product.stages.map(s => s.id === updatedStage.id ? updatedStage : s),
    };
    onUpdate(updatedProduct);
  };

  const getProgress = () => {
    const completed = product.stages.filter(s => s.status === 'completed').length;
    return (completed / product.stages.length) * 100;
  };

  const updateEcommercePlatform = (platformConfig: PlatformConfig) => {
    onUpdate({ ...product, ecommercePlatform: platformConfig });
  };

  const updateMarketingConfig = (marketingConfig: MarketingConfig) => {
    onUpdate({ ...product, marketingConfig });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`${config.color} p-3 rounded-lg`}>
              <Icon className="size-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-1">{product.name}</h2>
                  <Badge variant="secondary">{config.label}</Badge>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="size-4 mr-2" />
                        View Comparison Table
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>Product Workflow Comparison</DialogTitle>
                        <DialogDescription>
                          Compare workflow stages across different product types
                        </DialogDescription>
                      </DialogHeader>
                      <WorkflowComparisonTable />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Overall Progress</span>
                  <span>{Math.round(getProgress())}%</span>
                </div>
                <Progress value={getProgress()} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ecommerce Platform Configuration - Only for ecommerce products */}
      {product.type === 'ecommerce' && (
        <EcommercePlatformConfig
          config={product.ecommercePlatform}
          onChange={updateEcommercePlatform}
        />
      )}

      {/* Marketing & Promotion Configuration - For all products */}
      <EnhancedMarketingHub
        config={product.marketingConfig}
        onChange={(config) => onUpdate({ ...product, marketingConfig: config })}
        projectName={product.name}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Workflow Stages</h3>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList>
              <TabsTrigger value="list">
                <List className="size-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="kanban">
                <Kanban className="size-4 mr-2" />
                Kanban
              </TabsTrigger>
              <TabsTrigger value="whiteboard">
                <Pencil className="size-4 mr-2" />
                Whiteboard
              </TabsTrigger>
              <TabsTrigger value="gantt">
                <GitBranch className="size-4 mr-2" />
                Gantt
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {viewMode === 'kanban' ? (
          <StageKanbanView stages={product.stages} onUpdate={updateStage} />
        ) : viewMode === 'whiteboard' ? (
          <StageWhiteboardView stages={product.stages} onUpdate={updateStage} />
        ) : viewMode === 'gantt' ? (
          <StageGanttView stages={product.stages} onUpdate={updateStage} />
        ) : (
          <div className="space-y-3">
            {product.stages.map((stage) => (
              <WorkflowStageCard
                key={stage.id}
                stage={stage}
                onUpdate={updateStage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}