/*
  # LaunchFlow Product Types & Workflow Templates

  1. New Tables
    - `workflow_templates`
      - `id` (uuid, primary key)
      - `product_type` (text) - book, course, ecommerce, print-on-demand, article, social-media
      - `stages` (jsonb) - array of workflow stage definitions
      - `conditional_fields` (jsonb) - product type specific fields
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `product_workflows`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `product_type` (text)
      - `stages` (jsonb) - array of stage instances with status/notes/resources
      - `marketing_config` (jsonb) - universal marketing configuration
      - `ecommerce_config` (jsonb) - conditional ecommerce platform setup
      - `branding_canvas` (jsonb) - branding mood board assets
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Extensions
    - Update projects table to support product_type field
    
  3. Security
    - Enable RLS on new tables
    - Add public access policies
*/

-- Workflow Templates table
CREATE TABLE IF NOT EXISTS workflow_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type text NOT NULL UNIQUE,
  stages jsonb DEFAULT '[]'::jsonb,
  conditional_fields jsonb DEFAULT '{}'::jsonb,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE workflow_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to workflow_templates"
  ON workflow_templates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to workflow_templates"
  ON workflow_templates FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to workflow_templates"
  ON workflow_templates FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to workflow_templates"
  ON workflow_templates FOR DELETE
  TO public
  USING (true);

-- Product Workflows table
CREATE TABLE IF NOT EXISTS product_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  product_type text NOT NULL,
  stages jsonb DEFAULT '[]'::jsonb,
  marketing_config jsonb DEFAULT '{}'::jsonb,
  ecommerce_config jsonb DEFAULT '{}'::jsonb,
  branding_canvas jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE product_workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to product_workflows"
  ON product_workflows FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to product_workflows"
  ON product_workflows FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to product_workflows"
  ON product_workflows FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to product_workflows"
  ON product_workflows FOR DELETE
  TO public
  USING (true);

-- Add product_type column to projects if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'product_type'
  ) THEN
    ALTER TABLE projects ADD COLUMN product_type text;
  END IF;
END $$;

-- Insert workflow templates for all 6 product types

-- 1. BOOK
INSERT INTO workflow_templates (product_type, stages, description) VALUES (
  'book',
  '[
    {"name": "Ideation & Concept", "description": "Initial book concept development, genre selection, target audience definition"},
    {"name": "Market Research", "description": "Amazon KDP analysis, reader demographics, market size validation"},
    {"name": "Competitive Analysis", "description": "Competing books analysis, pricing research, review analysis"},
    {"name": "Customer Avatar Creation", "description": "Ideal reader profile, pain points & desires, reading habits"},
    {"name": "Book Outline & Structure", "description": "Chapter breakdown, content flow, book structure"},
    {"name": "Writing & Content Creation", "description": "Manuscript writing, AI-assisted content, draft completion"},
    {"name": "Editing & Revisions", "description": "Content editing, proofreading, final revisions"},
    {"name": "Cover Design", "description": "Cover concept, professional design, format variations"},
    {"name": "Book Formatting", "description": "Interior layout, eBook formatting, print formatting"},
    {"name": "SEO & Keywords", "description": "Amazon keywords, book description optimization, category selection"},
    {"name": "Publishing Setup", "description": "KDP account setup, ISBN registration, distribution channels"},
    {"name": "Sales Page Creation", "description": "Landing page design, sales copy, buy buttons"},
    {"name": "Marketing Materials", "description": "Book trailers, social media graphics, email templates"},
    {"name": "Launch Campaign", "description": "Pre-launch strategy, launch day activities, post-launch promotion"},
    {"name": "Data Tracking & Analytics", "description": "Sales tracking, review monitoring, ROI analysis"}
  ]'::jsonb,
  '15-stage workflow for book products from ideation to launch'
) ON CONFLICT (product_type) DO NOTHING;

-- 2. COURSE
INSERT INTO workflow_templates (product_type, stages, description) VALUES (
  'course',
  '[
    {"name": "Ideation & Topic Selection", "description": "Course topic brainstorming, niche validation, learning outcomes definition"},
    {"name": "Market Research & Validation", "description": "Competitor course analysis, pricing research, demand validation"},
    {"name": "Competitive Analysis", "description": "Platform analysis (Udemy, Teachable, etc.), feature comparison, pricing strategies"},
    {"name": "Customer Avatar Creation", "description": "Student profile, skill level assessment, learning goals"},
    {"name": "Curriculum Design & Outline", "description": "Module structure, lesson planning, learning path design"},
    {"name": "Content Creation & Scripts", "description": "Video scripts, presentation slides, worksheets & resources"},
    {"name": "Video Production & Editing", "description": "Recording setup, video editing, quality assurance"},
    {"name": "Course Platform Setup", "description": "Platform selection, course upload, payment integration"},
    {"name": "Branding & Visual Design", "description": "Course branding, thumbnail designs, visual identity"},
    {"name": "Sales Page & VSL", "description": "Video sales letter, sales page copy, conversion optimization"},
    {"name": "Email Funnel Setup", "description": "Email sequences, automation setup, nurture campaigns"},
    {"name": "Ad Creation & Copywriting", "description": "Ad creative development, copy testing, platform-specific ads"},
    {"name": "Launch Strategy", "description": "Launch timeline, early bird offers, launch events"},
    {"name": "Data Tracking & Analytics", "description": "Student enrollment, completion rates, revenue tracking"}
  ]'::jsonb,
  '14-stage workflow for online course products from topic selection to launch'
) ON CONFLICT (product_type) DO NOTHING;

-- 3. ECOMMERCE
INSERT INTO workflow_templates (product_type, stages, conditional_fields, description) VALUES (
  'ecommerce',
  '[
    {"name": "Product Ideation & Research", "description": "Product selection, trend analysis, profitability assessment"},
    {"name": "Market & Competitor Analysis", "description": "Competitor research, market gaps, pricing analysis"},
    {"name": "Supplier Sourcing & Negotiations", "description": "Supplier identification, price negotiations, sample ordering"},
    {"name": "Customer Avatar Creation", "description": "Target customer profile, shopping behaviors, demographics"},
    {"name": "Product Photography & Videography", "description": "Professional photos, product videos, 360° views"},
    {"name": "Product Listing & SEO", "description": "Product descriptions, SEO optimization, keyword research"},
    {"name": "Store Setup & Design", "description": "Theme selection, store customization, navigation setup"},
    {"name": "Branding & Logo Design", "description": "Brand identity, logo creation, style guide"},
    {"name": "Product Description Copywriting", "description": "Compelling copy, benefit-focused, SEO-optimized"},
    {"name": "Social Media Setup", "description": "Platform accounts, profile optimization, content calendar"},
    {"name": "Ad Creative & Copy", "description": "Ad creative design, ad copywriting, A/B testing"},
    {"name": "Launch Campaign", "description": "Grand opening, launch promotions, influencer outreach"},
    {"name": "Data Tracking & Analytics", "description": "Sales metrics, conversion rates, customer analytics"}
  ]'::jsonb,
  '{"ecommerce_platform_required": true, "platforms": ["Shopify", "EZsite", "Thrivecart", "GoHighLevel", "Other"]}'::jsonb,
  '13-stage workflow for ecommerce products with platform configuration'
) ON CONFLICT (product_type) DO NOTHING;

-- 4. PRINT ON DEMAND
INSERT INTO workflow_templates (product_type, stages, description) VALUES (
  'print-on-demand',
  '[
    {"name": "Design Ideation & Concept", "description": "Design concepts, niche selection, target audience"},
    {"name": "Market Research & Trends", "description": "Trend analysis, best sellers research, seasonal opportunities"},
    {"name": "Competitor Analysis", "description": "Design competition, pricing strategies, top sellers analysis"},
    {"name": "Customer Avatar Creation", "description": "Buyer persona, demographics, shopping preferences"},
    {"name": "Art Creation & Design", "description": "Original artwork, design software, file preparation"},
    {"name": "AI Image Generation", "description": "AI prompts, image generation, refinement"},
    {"name": "Mockup Creation", "description": "Product mockups, lifestyle mockups, platform-specific mockups"},
    {"name": "Platform Setup (Etsy/Redbubble/etc)", "description": "Account creation, shop customization, payment setup"},
    {"name": "Product Listing & SEO", "description": "Titles & tags, SEO optimization, category selection"},
    {"name": "Social Media Content", "description": "Content creation, post scheduling, engagement strategy"},
    {"name": "Marketing & Promotion", "description": "Promotional campaigns, cross-promotion, Pinterest strategy"},
    {"name": "Data Tracking & Analytics", "description": "Sales tracking, design performance, traffic sources"}
  ]'::jsonb,
  '12-stage workflow for print-on-demand products from design to sales'
) ON CONFLICT (product_type) DO NOTHING;

-- 5. ARTICLE
INSERT INTO workflow_templates (product_type, stages, description) VALUES (
  'article',
  '[
    {"name": "Topic Ideation & Selection", "description": "Topic brainstorming, trend research, angle selection"},
    {"name": "Keyword Research & SEO", "description": "Keyword analysis, search volume, competition assessment"},
    {"name": "Competitive Analysis", "description": "Top ranking articles, content gaps, backlink analysis"},
    {"name": "Research & Fact-Checking", "description": "Source gathering, data verification, expert interviews"},
    {"name": "Article Outline", "description": "Structure planning, headings & subheadings, flow optimization"},
    {"name": "Writing & Content Creation", "description": "Draft writing, AI assistance, tone & voice"},
    {"name": "Editing & Proofreading", "description": "Content editing, grammar check, readability optimization"},
    {"name": "Image Creation & Optimization", "description": "Featured images, infographics, image compression"},
    {"name": "SEO Optimization", "description": "Meta descriptions, internal linking, schema markup"},
    {"name": "Publishing & Formatting", "description": "CMS formatting, visual hierarchy, mobile optimization"},
    {"name": "Social Media Promotion", "description": "Social sharing, platform-specific posts, engagement"},
    {"name": "Data Tracking & Analytics", "description": "Traffic monitoring, engagement metrics, conversion tracking"}
  ]'::jsonb,
  '12-stage workflow for article/blog content from ideation to promotion'
) ON CONFLICT (product_type) DO NOTHING;

-- 6. SOCIAL MEDIA
INSERT INTO workflow_templates (product_type, stages, description) VALUES (
  'social-media',
  '[
    {"name": "Content Ideation & Planning", "description": "Content pillars, theme development, campaign planning"},
    {"name": "Audience Research", "description": "Demographic analysis, engagement patterns, platform preferences"},
    {"name": "Competitor Analysis", "description": "Competitor accounts, content strategies, engagement benchmarks"},
    {"name": "Customer Avatar Creation", "description": "Follower persona, interests & behaviors, content preferences"},
    {"name": "Content Calendar Creation", "description": "Posting schedule, content batching, campaign timing"},
    {"name": "Graphic Design & Images", "description": "Visual design, brand consistency, template creation"},
    {"name": "AI Image Generation", "description": "AI-generated visuals, prompt engineering, image refinement"},
    {"name": "Video Production & Editing", "description": "Video filming, editing, platform optimization"},
    {"name": "AI Video Generation", "description": "AI video tools, script to video, automated editing"},
    {"name": "Copywriting & Captions", "description": "Caption writing, hook creation, CTA optimization"},
    {"name": "Hashtag Research", "description": "Hashtag analysis, strategy development, performance tracking"},
    {"name": "Scheduling & Publishing", "description": "Automation tools, optimal timing, cross-posting"},
    {"name": "Engagement & Community Management", "description": "Response strategy, community building, DM management"},
    {"name": "Data Tracking & Analytics", "description": "Engagement metrics, growth tracking, content performance"}
  ]'::jsonb,
  '14-stage workflow for social media content from planning to analytics'
) ON CONFLICT (product_type) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_workflows_project_id ON product_workflows(project_id);
CREATE INDEX IF NOT EXISTS idx_product_workflows_product_type ON product_workflows(product_type);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_product_type ON workflow_templates(product_type);
