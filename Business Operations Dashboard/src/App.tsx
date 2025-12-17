import { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { ProductLaunchView } from "./components/ProductLaunchView";
import { Header } from "./components/Header";

export interface Resource {
  id: string;
  url: string;
  title: string;
}

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface MarketingPlatform {
  platform: "facebook" | "instagram" | "youtube" | "tiktok" | "linkedin" | "blog";
  enabled: boolean;
  handle: string;
  contactInfo: string;
}

export interface UTMConfig {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export interface TrackingMetric {
  id: string;
  name: string;
  type: "paid" | "organic" | "both";
  platform: string;
  utmConfig?: UTMConfig;
  engagementTracking: boolean;
  conversionTracking: boolean;
  notes: string;
}

export interface AdStrategyKnowledgeBase {
  id: string;
  name: string;
  author: string; // e.g., "Russell Brunson", "Alex Hormozi", "Dan Kennedy"
  description: string;
  framework: string;
  enabled: boolean;
}

export interface WritingStyle {
  id: string;
  name: string;
  description: string;
  useCase: string;
  journeyStep: "awareness" | "consideration" | "decision" | "retention";
  enabled: boolean;
}

export interface AdPlatform {
  platform: "google" | "facebook" | "instagram" | "youtube" | "tiktok" | "linkedin";
  type: "organic" | "ppc";
  enabled: boolean;
  budget?: string;
  knowledgeBaseEnabled: boolean;
  selectedStrategies?: AdStrategyKnowledgeBase[];
  writingStyles?: WritingStyle[];
  trackingMetrics?: TrackingMetric[];
}

export interface BrandingAsset {
  id: string;
  type: "image" | "ai-generated" | "uploaded";
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  prompt?: string; // For AI-generated images
  tags?: string[];
  notes?: string;
}

export interface BrandingCanvas {
  assets: BrandingAsset[];
  colorPalette?: string[];
  typography?: { primary: string; secondary: string };
  notes?: string;
  figmaUrl?: string; // Added for Figma/FigJam integration
}

export interface MarketingConfig {
  platforms: MarketingPlatform[];
  adPlatforms: AdPlatform[];
  strategy?: string;
  goal?: string;
  budgetStrategy?: string;
  adFramework?: string;
  trackingMetrics?: TrackingMetric[];
  brandingCanvas?: BrandingCanvas;
}

export interface EcommercePlatformConfig {
  platform: "shopify" | "ezsite" | "thrivecart" | "ghl" | "other";
  customPlatform?: string;
  url?: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  status: "not-started" | "in-progress" | "completed";
  notes: string;
  resources: Resource[];
  mediaFiles: MediaFile[];
  tags: string[];
  knowledgeBase: Resource[];
}

export interface Product {
  id: string;
  name: string;
  type:
    | "book"
    | "course"
    | "ecommerce"
    | "print-on-demand"
    | "article"
    | "social-media";
  createdAt: string;
  stages: WorkflowStage[];
  ecommercePlatform?: EcommercePlatformConfig;
  marketingConfig?: MarketingConfig;
}

const workflowTemplates: Record<
  Product["type"],
  Omit<WorkflowStage, "id">[]
> = {
  book: [
    {
      name: "Ideation & Concept",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Market Research",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Competitive Analysis",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Customer Avatar Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Book Outline & Structure",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Writing & Content Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Editing & Revisions",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Cover Design",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Book Formatting",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "SEO & Keywords",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Publishing Setup",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Sales Page Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Marketing Materials",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Launch Campaign",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Data Tracking & Analytics",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
  ],
  course: [
    {
      name: "Ideation & Topic Selection",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Market Research & Validation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Competitive Analysis",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Customer Avatar Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Curriculum Design & Outline",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Content Creation & Scripts",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Video Production & Editing",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Course Platform Setup",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Branding & Visual Design",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Sales Page & VSL",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Email Funnel Setup",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Ad Creation & Copywriting",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Launch Strategy",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Data Tracking & Analytics",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
  ],
  ecommerce: [
    {
      name: "Product Ideation & Research",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Market & Competitor Analysis",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Supplier Sourcing & Negotiations",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Customer Avatar Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Product Photography & Videography",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Product Listing & SEO",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Store Setup & Design",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Branding & Logo Design",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Product Description Copywriting",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Social Media Setup",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Ad Creative & Copy",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Launch Campaign",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Data Tracking & Analytics",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
  ],
  "print-on-demand": [
    {
      name: "Design Ideation & Concept",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Market Research & Trends",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Competitor Analysis",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Customer Avatar Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Art Creation & Design",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "AI Image Generation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Mockup Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Platform Setup (Etsy/Redbubble/etc)",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Product Listing & SEO",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Social Media Content",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Marketing & Promotion",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Data Tracking & Analytics",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
  ],
  article: [
    {
      name: "Topic Ideation & Selection",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Keyword Research & SEO",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Competitive Analysis",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Research & Fact-Checking",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Article Outline",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Writing & Content Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Editing & Proofreading",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Image Creation & Optimization",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "SEO Optimization",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Publishing & Formatting",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Social Media Promotion",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Data Tracking & Analytics",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
  ],
  "social-media": [
    {
      name: "Content Ideation & Planning",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Audience Research",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Competitor Analysis",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Customer Avatar Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Content Calendar Creation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Graphic Design & Images",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "AI Image Generation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Video Production & Editing",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "AI Video Generation",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Copywriting & Captions",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Hashtag Research",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Scheduling & Publishing",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Engagement & Community Management",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
    {
      name: "Data Tracking & Analytics",
      status: "not-started",
      notes: "",
      resources: [],
      mediaFiles: [],
      tags: [],
      knowledgeBase: [],
    },
  ],
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("productLaunches");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "productLaunches",
      JSON.stringify(products),
    );
  }, [products]);

  const createProduct = (
    name: string,
    type: Product["type"],
  ) => {
    const stageTemplate = workflowTemplates[type];
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      type,
      createdAt: new Date().toISOString(),
      stages: stageTemplate.map((stage, index) => ({
        ...stage,
        id: `${Date.now()}-${index}`,
      })),
    };
    setProducts([...products, newProduct]);
    setSelectedProduct(newProduct);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p,
      ),
    );
    setSelectedProduct(updatedProduct);
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onBackToDashboard={() => setSelectedProduct(null)}
        showBack={!!selectedProduct}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedProduct ? (
          <ProductLaunchView
            product={selectedProduct}
            onUpdate={updateProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <Dashboard
            products={products}
            onSelectProduct={setSelectedProduct}
            onCreateProduct={createProduct}
            onDeleteProduct={deleteProduct}
          />
        )}
      </main>
    </div>
  );
}