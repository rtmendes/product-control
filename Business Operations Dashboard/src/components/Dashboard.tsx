import { useState } from 'react';
import { Plus, BookOpen, GraduationCap, ShoppingCart, Palette, FileText, Share2, Trash2, Rocket, LayoutGrid, Kanban, GitBranch, Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { KanbanView } from './KanbanView';
import { WhiteboardView } from './WhiteboardView';
import { GanttView } from './GanttView';
import type { Product } from '../App';

interface DashboardProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onCreateProduct: (name: string, type: Product['type']) => void;
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

export function Dashboard({ products, onSelectProduct, onCreateProduct, onDeleteProduct }: DashboardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductType, setNewProductType] = useState<Product['type']>('book');
  const [viewMode, setViewMode] = useState<'grid' | 'kanban' | 'whiteboard' | 'gantt'>('grid');

  const handleCreate = () => {
    if (newProductName.trim()) {
      onCreateProduct(newProductName, newProductType);
      setNewProductName('');
      setNewProductType('book');
      setIsDialogOpen(false);
    }
  };

  const getProductProgress = (product: Product) => {
    const completed = product.stages.filter(s => s.status === 'completed').length;
    const total = product.stages.length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2>Product Launches</h2>
          <p className="text-gray-600">Manage your digital product launch workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList>
              <TabsTrigger value="grid">
                <LayoutGrid className="size-4 mr-2" />
                Grid
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                New Launch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Product Launch</DialogTitle>
                <DialogDescription>
                  Select a product type to create a new launch workflow
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="Enter product name..."
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-type">Product Type</Label>
                  <Select value={newProductType} onValueChange={(value) => setNewProductType(value as Product['type'])}>
                    <SelectTrigger id="product-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(productTypeConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreate} className="w-full">
                  Create Launch
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {products.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Rocket className="size-16 text-gray-400 mb-4" />
            <h3 className="text-gray-900 mb-2">No product launches yet</h3>
            <p className="text-gray-600 mb-6 text-center">
              Create your first product launch to start tracking your workflow
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="size-4 mr-2" />
              Create First Launch
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'kanban' ? (
        <KanbanView 
          products={products}
          onSelectProduct={onSelectProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ) : viewMode === 'whiteboard' ? (
        <WhiteboardView 
          products={products}
          onSelectProduct={onSelectProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ) : viewMode === 'gantt' ? (
        <GanttView 
          products={products}
          onSelectProduct={onSelectProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const config = productTypeConfig[product.type];
            const Icon = config.icon;
            const progress = getProductProgress(product);

            return (
              <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader onClick={() => onSelectProduct(product)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`${config.color} p-2 rounded-lg`}>
                      <Icon className="size-5" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProduct(product.id);
                      }}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="mt-2">
                      {config.label}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent onClick={() => onSelectProduct(product)}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 pt-2">
                      Created {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}