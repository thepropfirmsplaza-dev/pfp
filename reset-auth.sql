-- Capital Match Auth Reset Script
-- Run this in your Supabase SQL Editor

-- 1. Completely delete ALL users in Supabase Auth
DELETE FROM auth.users;

-- 2. Create the admin user from scratch with confirmed email and hashed password
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@thecapitalmatch.com',
    extensions.crypt('Moiz@tcm786$$$2026', extensions.gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name":"Admin"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
);
