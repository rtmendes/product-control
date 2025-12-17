import { BookOpen, GraduationCap, ShoppingCart, Palette, FileText, Share2, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import type { Product } from '../App';

interface GanttViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const productTypeConfig = {
  book: { icon: BookOpen, label: 'Book', color: 'bg-blue-100 text-blue-700' },
  course: { icon: GraduationCap, label: 'Course', color: 'bg-green-100 text-green-700' },
  ecommerce: { icon: ShoppingCart, label: 'Ecommerce', color: 'bg-purple-100 text-purple-700' },
  'print-on-demand': { icon: Palette, label: 'Print on Demand', color: 'bg-orange-100 text-orange-700' },
  article: { icon: FileText, label: 'Article', color: 'bg-pink-100 text-pink-700' },
  'social-media': { icon: Share2, label: 'Social Media', color: 'bg-cyan-100 text-cyan-700' },
};

export function GanttView({ products, onSelectProduct, onDeleteProduct }: GanttViewProps) {
  const getProductProgress = (product: Product) => {
    const completed = product.stages.filter(s => s.status === 'completed').length;
    return (completed / product.stages.length) * 100;
  };

  const getStageProgress = (product: Product) => {
    return product.stages.map(stage => ({
      name: stage.name,
      status: stage.status,
      progress: stage.status === 'completed' ? 100 : stage.status === 'in-progress' ? 50 : 0,
    }));
  };

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-6">
        {products.map((product) => {
          const config = productTypeConfig[product.type];
          const Icon = config.icon;
          const progress = getProductProgress(product);
          const stageProgress = getStageProgress(product);

          return (
            <Card key={product.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${config.color} p-2 rounded-lg`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="cursor-pointer hover:text-purple-600" onClick={() => onSelectProduct(product)}>
                      {product.name}
                    </h3>
                    <Badge variant="secondary" className="mt-1">
                      {config.label}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Gantt Timeline */}
              <div className="space-y-2">
                {stageProgress.map((stage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-40 text-sm text-gray-700 flex-shrink-0">
                      {stage.name}
                    </div>
                    <div className="flex-1 relative">
                      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-6 rounded-full transition-all flex items-center justify-end px-2 text-xs ${
                            stage.status === 'completed'
                              ? 'bg-green-500 text-white'
                              : stage.status === 'in-progress'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                          style={{ width: `${stage.progress}%` }}
                        >
                          {stage.progress > 0 && (
                            <span>
                              {stage.status === 'completed' ? 'Done' : 'In Progress'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="w-40 text-sm flex-shrink-0">
                    <span>Overall Progress</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                      <div
                        className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all flex items-center justify-end px-2 text-xs text-white"
                        style={{ width: `${progress}%` }}
                      >
                        {Math.round(progress)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
