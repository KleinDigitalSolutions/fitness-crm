-- Enable RLS for all tables
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;

-- Policies for 'studios' table
CREATE POLICY "Studio owners can see their own studio" ON studios
FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Studio owners can update their own studio" ON studios
FOR UPDATE USING (auth.uid() = owner_id);

-- Policies for 'profiles' table
CREATE POLICY "Users can view their own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Studio owners can view profiles in their studio" ON profiles
FOR SELECT USING (studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid()));

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
