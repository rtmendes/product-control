import { useRef, useState, useEffect } from 'react';
import { BookOpen, GraduationCap, ShoppingCart, Palette, FileText, Share2, Trash2, Move } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Product } from '../App';

interface WhiteboardViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

interface Position {
  x: number;
  y: number;
}

const productTypeConfig = {
  book: { icon: BookOpen, label: 'Book', color: 'bg-blue-100 text-blue-700' },
  course: { icon: GraduationCap, label: 'Course', color: 'bg-green-100 text-green-700' },
  ecommerce: { icon: ShoppingCart, label: 'Ecommerce', color: 'bg-purple-100 text-purple-700' },
  'print-on-demand': { icon: Palette, label: 'Print on Demand', color: 'bg-orange-100 text-orange-700' },
  article: { icon: FileText, label: 'Article', color: 'bg-pink-100 text-pink-700' },
  'social-media': { icon: Share2, label: 'Social Media', color: 'bg-cyan-100 text-cyan-700' },
};

export function WhiteboardView({ products, onSelectProduct, onDeleteProduct }: WhiteboardViewProps) {
  const [positions, setPositions] = useState<Record<string, Position>>(() => {
    const saved = localStorage.getItem('whiteboardPositions');
    return saved ? JSON.parse(saved) : {};
  });
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('whiteboardPositions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    // Initialize positions for new products
    products.forEach((product, index) => {
      if (!positions[product.id]) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        setPositions(prev => ({
          ...prev,
          [product.id]: {
            x: 50 + col * 320,
            y: 50 + row * 200,
          },
        }));
      }
    });
  }, [products]);

  const handleMouseDown = (e: React.MouseEvent, productId: string) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    const pos = positions[productId] || { x: 0, y: 0 };
    setDragging(productId);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const x = e.clientX - containerRect.left - offset.x;
    const y = e.clientY - containerRect.top - offset.y;

    setPositions(prev => ({
      ...prev,
      [dragging]: {
        x: Math.max(0, Math.min(x, containerRect.width - 280)),
        y: Math.max(0, Math.min(y, containerRect.height - 180)),
      },
    }));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const getProductProgress = (product: Product) => {
    const completed = product.stages.filter(s => s.status === 'completed').length;
    return Math.round((completed / product.stages.length) * 100);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
      style={{ height: '600px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {products.map((product) => {
        const config = productTypeConfig[product.type];
        const Icon = config.icon;
        const progress = getProductProgress(product);
        const pos = positions[product.id] || { x: 0, y: 0 };

        return (
          <Card
            key={product.id}
            className="absolute cursor-move hover:shadow-lg transition-shadow group w-[280px]"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              userSelect: 'none',
            }}
            onMouseDown={(e) => handleMouseDown(e, product.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Move className="size-4 text-gray-400" />
                  <div className={`${config.color} p-2 rounded-lg`}>
                    <Icon className="size-4" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                  >
                    <FileText className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProduct(product.id);
                    }}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-base">{product.name}</CardTitle>
              <Badge variant="secondary" className="mt-2 w-fit">
                {config.label}
              </Badge>
            </CardHeader>
            <CardContent className="pt-0">
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
  );
}
