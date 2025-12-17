import { BookOpen, GraduationCap, ShoppingCart, Palette, FileText, Share2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import type { Product } from '../App';

interface KanbanViewProps {
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

const statusColumns = [
  { id: 'not-started', label: 'Not Started', color: 'bg-gray-50' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-blue-50' },
  { id: 'completed', label: 'Completed', color: 'bg-green-50' },
];

export function KanbanView({ products, onSelectProduct, onDeleteProduct }: KanbanViewProps) {
  const getProductsByStatus = (status: string) => {
    return products.filter(product => {
      const completedStages = product.stages.filter(s => s.status === 'completed').length;
      const inProgressStages = product.stages.filter(s => s.status === 'in-progress').length;
      
      if (status === 'completed' && completedStages === product.stages.length) return true;
      if (status === 'in-progress' && (inProgressStages > 0 || (completedStages > 0 && completedStages < product.stages.length))) return true;
      if (status === 'not-started' && completedStages === 0 && inProgressStages === 0) return true;
      
      return false;
    });
  };

  const getProductProgress = (product: Product) => {
    const completed = product.stages.filter(s => s.status === 'completed').length;
    return Math.round((completed / product.stages.length) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statusColumns.map((column) => {
        const productsInColumn = getProductsByStatus(column.id);
        
        return (
          <div key={column.id} className="flex flex-col">
            <div className={`${column.color} rounded-t-lg p-4 border-b-2 border-gray-200`}>
              <div className="flex items-center justify-between">
                <h3>{column.label}</h3>
                <Badge variant="secondary">{productsInColumn.length}</Badge>
              </div>
            </div>
            <ScrollArea className="flex-1 min-h-[500px] bg-gray-50/50 rounded-b-lg p-4">
              <div className="space-y-3">
                {productsInColumn.map((product) => {
                  const config = productTypeConfig[product.type];
                  const Icon = config.icon;
                  const progress = getProductProgress(product);

                  return (
                    <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow group">
                      <CardHeader className="pb-3" onClick={() => onSelectProduct(product)}>
                        <div className="flex items-start justify-between mb-2">
                          <div className={`${config.color} p-2 rounded-lg`}>
                            <Icon className="size-4" />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteProduct(product.id);
                            }}
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                        <CardTitle className="text-base">{product.name}</CardTitle>
                        <Badge variant="secondary" className="mt-2 w-fit">
                          {config.label}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pt-0" onClick={() => onSelectProduct(product)}>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}
