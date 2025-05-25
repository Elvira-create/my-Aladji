/*
  # Initial Schema Setup for My Aladji

  1. New Tables
    - roles (system roles)
    - users (all system users)
    - territories (geographical areas)
    - accounts (customer savings accounts)
    - transactions (money movements)
    - notifications (system notifications)
    - clerk_territories (mapping between clerks and territories)
    - cashier_desks (desk assignments)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table with role-based authentication
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone_number text,
  role_id uuid REFERENCES roles(id),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create territories table
CREATE TABLE IF NOT EXISTS territories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  account_number text UNIQUE NOT NULL,
  balance decimal(12,2) DEFAULT 0.00,
  account_type text NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES accounts(id),
  clerk_id uuid REFERENCES users(id),
  cashier_id uuid REFERENCES users(id),
  type text NOT NULL,
  amount decimal(12,2) NOT NULL,
  status text DEFAULT 'pending',
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create clerk_territories mapping table
CREATE TABLE IF NOT EXISTS clerk_territories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id uuid REFERENCES users(id),
  territory_id uuid REFERENCES territories(id),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(clerk_id, territory_id)
);

-- Create cashier_desks table
CREATE TABLE IF NOT EXISTS cashier_desks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cashier_id uuid REFERENCES users(id),
  desk_number text NOT NULL UNIQUE,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE clerk_territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cashier_desks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Admins can manage roles" ON roles;
  DROP POLICY IF EXISTS "Users can read their own data" ON users;
  DROP POLICY IF EXISTS "Admins and managers can manage users" ON users;
  DROP POLICY IF EXISTS "Clerks can view assigned territories" ON territories;
  DROP POLICY IF EXISTS "Customers can view own accounts" ON accounts;
  DROP POLICY IF EXISTS "Staff can view customer accounts" ON accounts;
  DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
  DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create policies
CREATE POLICY "Admins can manage roles" ON roles
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins and managers can manage users" ON users
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'manager'));

CREATE POLICY "Clerks can view assigned territories" ON territories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clerk_territories
      WHERE clerk_id = auth.uid()
      AND territory_id = territories.id
    )
  );

CREATE POLICY "Customers can view own accounts" ON accounts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Staff can view customer accounts" ON accounts
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('clerk', 'cashier', 'manager', 'admin'));

CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM accounts
      WHERE accounts.id = transactions.account_id
      AND accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- Insert default roles
INSERT INTO roles (name) VALUES
  ('admin'),
  ('manager'),
  ('cashier'),
  ('clerk'),
  ('customer')
ON CONFLICT (name) DO NOTHING;