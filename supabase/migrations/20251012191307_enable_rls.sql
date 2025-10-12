-- =====================================================
-- ENABLE ROW LEVEL SECURITY (RLS) FOR ALL TABLES
-- =====================================================
-- This migration MUST be run immediately after the initial schema
-- to prevent public data access via the API
-- =====================================================

-- Enable RLS for all tables
ALTER TABLE IF EXISTS studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS membership_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS members ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS class_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS payments ENABLE ROW LEVEL SECURITY;

-- Policies for 'studios' table
CREATE POLICY "Studio owners can see their own studio" ON studios
FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Studio owners can update their own studio" ON studios
FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Studio owners can insert their own studio" ON studios
FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Policies for 'profiles' table
CREATE POLICY "Users can view their own profile" ON profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Studio owners can view profiles in their studio" ON profiles
FOR SELECT USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

CREATE POLICY "Studio owners can manage profiles in their studio" ON profiles
FOR ALL USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

-- Policies for 'members' table
CREATE POLICY "Members can view their own member data" ON members
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Studio owners can view all members in their studio" ON members
FOR SELECT USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

CREATE POLICY "Studio owners can manage members in their studio" ON members
FOR ALL USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

-- Policies for 'membership_types' table
CREATE POLICY "Anyone can view membership types" ON membership_types
FOR SELECT USING (true);

CREATE POLICY "Studio owners can manage membership types in their studio" ON membership_types
FOR ALL USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

-- Policies for 'class_types' table
CREATE POLICY "Anyone can view class types" ON class_types
FOR SELECT USING (true);

CREATE POLICY "Studio owners can manage class types in their studio" ON class_types
FOR ALL USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

-- Policies for 'class_schedules' table
CREATE POLICY "Anyone can view class schedules" ON class_schedules
FOR SELECT USING (true);

CREATE POLICY "Studio owners can manage class schedules in their studio" ON class_schedules
FOR ALL USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

-- Policies for 'payments' table
CREATE POLICY "Members can view their own payments" ON payments
FOR SELECT USING (member_id IN (SELECT id FROM members WHERE user_id = auth.uid()));

CREATE POLICY "Studio owners can view all payments in their studio" ON payments
FOR SELECT USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

CREATE POLICY "Studio owners can manage payments in their studio" ON payments
FOR ALL USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

-- =====================================================
-- SUMMARY
-- =====================================================
SELECT
  'RLS enabled successfully!' as message,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') as policies_created;
