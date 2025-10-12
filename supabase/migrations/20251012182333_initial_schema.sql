-- Create studios table
CREATE TABLE studios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    owner_id UUID REFERENCES auth.users(id),
    subscription_plan TEXT,
    subscription_status TEXT,
    settings JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    date_of_birth DATE,
    address JSONB,
    emergency_contact JSONB,
    health_notes TEXT
);

-- Create membership_types table
CREATE TABLE membership_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price_monthly DECIMAL,
    price_yearly DECIMAL,
    billing_interval TEXT,
    features JSONB,
    color TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Create members table
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    member_number TEXT,
    membership_type_id UUID REFERENCES membership_types(id),
    status TEXT,
    contract_start_date DATE,
    contract_end_date DATE,
    sepa_mandate_id TEXT,
    payment_method TEXT,
    credits_balance INTEGER,
    loyalty_points INTEGER,
    loyalty_tier TEXT,
    notes TEXT,
    tags TEXT[]
);

-- Create class_types table
CREATE TABLE class_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER,
    category TEXT,
    difficulty TEXT,
    color TEXT,
    default_capacity INTEGER,
    price DECIMAL
);

-- Create class_schedules table
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    class_type_id UUID REFERENCES class_types(id) ON DELETE CASCADE,
    trainer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    room TEXT,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    is_recurring BOOLEAN,
    recurrence_rule TEXT,
    capacity INTEGER,
    waitlist_capacity INTEGER,
    status TEXT
);
