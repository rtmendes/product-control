/*
  # Multi-Brand Product Control Schema
  
  1. New Tables
    - `brands` - Store multiple brand identities with guidelines
    - `products` - POD products linked to brands
    - `assets` - AI-generated content (images, copy, etc)
    - `campaigns` - Marketing campaigns per brand
    - `revenue_goals` - Revenue tracking per brand
    - `conditional_rules` - Automated rules for products
    - `integrations` - Platform integrations (Shopify, etc)
    - `knowledge_base_entries` - Brand-specific knowledge base
    - `activity_logs` - Audit trail of all actions
    
  2. Security
    - Enable RLS on all tables
    - Allow public access for single-user mode (temporarily)
    
  3. Features
    - Multi-brand support with separate guidelines
    - Knowledge base per brand
    - Complete product lifecycle management
*/

-- BRANDS TABLE
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  brand_name TEXT NOT NULL,
  tagline TEXT,
  avatar TEXT,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#10B981',
  accent_color TEXT DEFAULT '#F59E0B',
  font_family TEXT DEFAULT 'Inter',
  heading_font TEXT,
  body_font TEXT,
  voice_tone TEXT,
  target_audience TEXT,
  unique_selling_prop TEXT,
  competitor_urls JSONB,
  sample_products JSONB,
  design_assets JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_brands_active ON brands(is_active);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  shopify_id TEXT UNIQUE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  title TEXT NOT NULL,
  description TEXT,
  handle TEXT,
  variants JSONB,
  pricing JSONB,
  compare_at_price NUMERIC,
  mockup_urls JSONB,
  print_provider TEXT,
  production_cost NUMERIC,
  revenue NUMERIC DEFAULT 0,
  orders INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  conversion_rate NUMERIC DEFAULT 0,
  avg_order_value NUMERIC DEFAULT 0,
  profit_margin NUMERIC DEFAULT 0,
  seo_keywords JSONB,
  meta_title TEXT,
  meta_description TEXT,
  blog_content TEXT,
  faq_content JSONB,
  shopify_data JSONB,
  theme_metafields JSONB,
  generation_context JSONB,
  quality_score NUMERIC,
  ai_generated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id, type);
CREATE INDEX IF NOT EXISTS idx_products_shopify ON products(shopify_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- ASSETS TABLE
CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  subtype TEXT,
  title TEXT,
  description TEXT,
  content TEXT,
  url TEXT,
  thumbnail_url TEXT,
  file_size INTEGER,
  dimensions JSONB,
  duration INTEGER,
  format TEXT,
  ai_model TEXT,
  prompt TEXT,
  generation_params JSONB,
  quality_score NUMERIC,
  tags JSONB,
  eagle_id TEXT,
  airtable_id TEXT,
  s3_key TEXT,
  usage INTEGER DEFAULT 0,
  performance JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_assets_brand ON assets(brand_id, type);
CREATE INDEX IF NOT EXISTS idx_assets_product ON assets(product_id);

-- CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  platform TEXT,
  status TEXT DEFAULT 'draft',
  targeting JSONB,
  budget NUMERIC,
  schedule JSONB,
  variants JSONB,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  spend NUMERIC DEFAULT 0,
  roas NUMERIC,
  klaviyo_flow_id TEXT,
  facebook_campaign_id TEXT,
  google_campaign_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  launched_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_campaigns_brand ON campaigns(brand_id, status);
CREATE INDEX IF NOT EXISTS idx_campaigns_product ON campaigns(product_id);

-- REVENUE GOALS TABLE
CREATE TABLE IF NOT EXISTS revenue_goals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  target_amount NUMERIC NOT NULL,
  current_amount NUMERIC DEFAULT 0,
  deadline TIMESTAMPTZ NOT NULL,
  product_ids JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_revenue_goals_brand ON revenue_goals(brand_id, status);

-- CONDITIONAL RULES TABLE
CREATE TABLE IF NOT EXISTS conditional_rules (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  trigger JSONB NOT NULL,
  conditions JSONB NOT NULL,
  actions JSONB NOT NULL,
  schedule JSONB,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  execution_count INTEGER DEFAULT 0,
  last_executed_at TIMESTAMPTZ,
  success_rate NUMERIC,
  avg_execution_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rules_active ON conditional_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_rules_product ON conditional_rules(product_id);

-- INTEGRATIONS TABLE
CREATE TABLE IF NOT EXISTS integrations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  platform TEXT UNIQUE NOT NULL,
  credentials JSONB NOT NULL,
  configuration JSONB,
  status TEXT DEFAULT 'disconnected',
  last_sync_at TIMESTAMPTZ,
  sync_frequency TEXT,
  sync_errors JSONB,
  display_name TEXT,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_integrations_status ON integrations(status);

-- KNOWLEDGE BASE TABLE
CREATE TABLE IF NOT EXISTS knowledge_base_entries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  category TEXT,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  metadata JSONB,
  tags JSONB,
  related_ids JSONB,
  usage_count INTEGER DEFAULT 0,
  effectiveness_score NUMERIC,
  version INTEGER DEFAULT 1,
  previous_version_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kb_brand ON knowledge_base_entries(brand_id, type, category);

-- ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT,
  agent_name TEXT,
  execution_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_logs_created ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_logs_agent ON activity_logs(agent_name);

-- ENABLE RLS (Single-user mode - allow all operations)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditional_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow all operations in single-user mode
CREATE POLICY "Allow all operations on brands" ON brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on assets" ON assets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on campaigns" ON campaigns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on revenue_goals" ON revenue_goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on conditional_rules" ON conditional_rules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on integrations" ON integrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on knowledge_base_entries" ON knowledge_base_entries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on activity_logs" ON activity_logs FOR ALL USING (true) WITH CHECK (true);