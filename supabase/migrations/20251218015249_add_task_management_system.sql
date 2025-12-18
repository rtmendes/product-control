/*
  # Task Management System for Workflows

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `workflow_id` (uuid, foreign key)
      - `stage_name` (text) - which workflow stage this task belongs to
      - `title` (text)
      - `description` (text)
      - `status` (text) - not-started, in-progress, completed
      - `priority` (text) - low, medium, high
      - `due_date` (date)
      - `assignee` (text)
      - `tags` (jsonb)
      - `dependencies` (jsonb) - array of task IDs
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `completed_at` (timestamptz)

    - `brand_assets`
      - `id` (uuid, primary key)
      - `brand_id` (text, foreign key)
      - `category` (text) - logos, colors, fonts, brand-voice, photos, graphics, icons, charts
      - `name` (text)
      - `url` (text)
      - `file_type` (text)
      - `file_size` (integer)
      - `metadata` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Updates
    - Add brand_colors (jsonb) and canva_url (text) to brands table

  3. Security
    - Enable RLS on new tables
    - Add public access policies
*/

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  workflow_id uuid REFERENCES product_workflows(id) ON DELETE CASCADE,
  stage_name text NOT NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'not-started',
  priority text DEFAULT 'medium',
  due_date date,
  assignee text,
  tags jsonb DEFAULT '[]'::jsonb,
  dependencies jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to tasks"
  ON tasks FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to tasks"
  ON tasks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to tasks"
  ON tasks FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to tasks"
  ON tasks FOR DELETE
  TO public
  USING (true);

-- Brand Assets table
CREATE TABLE IF NOT EXISTS brand_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id text REFERENCES brands(id) ON DELETE CASCADE,
  category text NOT NULL,
  name text NOT NULL,
  url text,
  file_type text,
  file_size integer,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to brand_assets"
  ON brand_assets FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to brand_assets"
  ON brand_assets FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to brand_assets"
  ON brand_assets FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to brand_assets"
  ON brand_assets FOR DELETE
  TO public
  USING (true);

-- Add brand_colors and canva_url to brands table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'brands' AND column_name = 'brand_colors'
  ) THEN
    ALTER TABLE brands ADD COLUMN brand_colors jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'brands' AND column_name = 'canva_url'
  ) THEN
    ALTER TABLE brands ADD COLUMN canva_url text;
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_workflow_id ON tasks(workflow_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_brand_assets_brand_id ON brand_assets(brand_id);
CREATE INDEX IF NOT EXISTS idx_brand_assets_category ON brand_assets(category);
