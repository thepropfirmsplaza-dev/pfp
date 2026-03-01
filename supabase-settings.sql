-- Run this in your Supabase SQL Editor to enable dynamic platform settings

CREATE TABLE IF NOT EXISTS platform_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  platform_name text NOT NULL DEFAULT 'PropFirms Plaza',
  support_email text NOT NULL DEFAULT 'support@thecapitalmatch.com',
  maintenance_mode boolean NOT NULL DEFAULT false,
  public_registrations boolean NOT NULL DEFAULT true,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert the default PropFirms Plaza settings
INSERT INTO platform_settings (id, platform_name, support_email, maintenance_mode, public_registrations)
VALUES (1, 'PropFirms Plaza', 'support@thecapitalmatch.com', false, true)
ON CONFLICT (id) DO UPDATE SET
  platform_name = EXCLUDED.platform_name,
  support_email = EXCLUDED.support_email;

-- Enable RLS (Row Level Security)
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings (needed so landing page knows if maintenance mode is on)
CREATE POLICY "Allow public read access to platform settings"
  ON platform_settings FOR SELECT
  USING (true);

-- Allow authenticated users (Admins) to update settings
CREATE POLICY "Allow authenticated updates to platform settings"
  ON platform_settings FOR UPDATE
  USING (auth.role() = 'authenticated');
