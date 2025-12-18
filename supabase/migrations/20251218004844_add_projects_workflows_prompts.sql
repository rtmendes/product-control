/*
  # Add Projects, Workflows, and AI Prompts Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `brand_id` (text, foreign key)
      - `name` (text)
      - `description` (text)
      - `type` (text) - 'business-operations' or 'print-on-demand'
      - `icon` (text)
      - `color` (text)
      - `folder_id` (uuid, nullable, self-reference for hierarchy)
      - `sort_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `workflows`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `status` (text)
      - `stages` (jsonb)
      - `assignments` (jsonb)
      - `due_date` (date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `ai_prompts`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `product_id` (text, foreign key, nullable)
      - `prompt_text` (text)
      - `category` (text)
      - `style` (text)
      - `parameters` (jsonb)
      - `generated_image_url` (text)
      - `status` (text)
      - `ai_model` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `folders`
      - `id` (uuid, primary key)
      - `name` (text)
      - `parent_id` (uuid, nullable, self-reference)
      - `type` (text)
      - `icon` (text)
      - `is_expanded` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all new tables
    - Add public access policies
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id text REFERENCES brands(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  type text DEFAULT 'business-operations',
  icon text DEFAULT '📁',
  color text DEFAULT '#3B82F6',
  folder_id uuid,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to projects"
  ON projects FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to projects"
  ON projects FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to projects"
  ON projects FOR DELETE
  TO public
  USING (true);

-- Workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text DEFAULT 'not-started',
  stages jsonb DEFAULT '[]'::jsonb,
  assignments jsonb DEFAULT '[]'::jsonb,
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to workflows"
  ON workflows FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to workflows"
  ON workflows FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to workflows"
  ON workflows FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to workflows"
  ON workflows FOR DELETE
  TO public
  USING (true);

-- AI Prompts table
CREATE TABLE IF NOT EXISTS ai_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  product_id text REFERENCES products(id) ON DELETE SET NULL,
  prompt_text text NOT NULL,
  category text,
  style text,
  parameters jsonb DEFAULT '{}'::jsonb,
  generated_image_url text,
  status text DEFAULT 'pending',
  ai_model text DEFAULT 'midjourney',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to ai_prompts"
  ON ai_prompts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to ai_prompts"
  ON ai_prompts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to ai_prompts"
  ON ai_prompts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to ai_prompts"
  ON ai_prompts FOR DELETE
  TO public
  USING (true);

-- Folders table
CREATE TABLE IF NOT EXISTS folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES folders(id) ON DELETE CASCADE,
  type text DEFAULT 'folder',
  icon text DEFAULT '📁',
  is_expanded boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to folders"
  ON folders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to folders"
  ON folders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to folders"
  ON folders FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to folders"
  ON folders FOR DELETE
  TO public
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_brand_id ON projects(brand_id);
CREATE INDEX IF NOT EXISTS idx_projects_folder_id ON projects(folder_id);
CREATE INDEX IF NOT EXISTS idx_workflows_project_id ON workflows(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_prompts_project_id ON ai_prompts(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_prompts_product_id ON ai_prompts(product_id);
CREATE INDEX IF NOT EXISTS idx_folders_parent_id ON folders(parent_id);

-- Add foreign key constraint for project folder_id (self-reference)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'projects_folder_id_fkey'
  ) THEN
    ALTER TABLE projects ADD CONSTRAINT projects_folder_id_fkey 
      FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE SET NULL;
  END IF;
END $$;
