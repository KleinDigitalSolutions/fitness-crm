-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Studios Table: Main tenant entity
CREATE TABLE studios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    subscription_plan TEXT,
    subscription_status TEXT,
    settings JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE studios IS 'Main tenant entity for each fitness studio.';

-- Profiles Table: User extension for both studio staff and members
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
    emergency_contact TEXT,
    health_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE profiles IS 'User profile information, extending the auth.users table.';

-- Membership Types Table: Defines different membership plans
CREATE TABLE membership_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price_monthly DECIMAL(10, 2),
    price_yearly DECIMAL(10, 2),
    billing_interval TEXT,
    features JSONB,
    color TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE membership_types IS 'Defines the various membership plans a studio can offer.';

-- Members Table: Represents the customers of a studio
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
    user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE SET NULL,
    member_number TEXT,
    membership_type_id UUID REFERENCES membership_types(id) ON DELETE SET NULL,
    status TEXT,
    contract_start_date DATE,
    contract_end_date DATE,
    sepa_mandate_id TEXT,
    payment_method TEXT,
    credits_balance INTEGER,
    loyalty_points INTEGER,
    loyalty_tier TEXT,
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE members IS 'Represents the members/customers of a fitness studio.';

-- Class Types Table: Defines the types of classes offered
CREATE TABLE class_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER,
    category TEXT,
    difficulty TEXT,
    color TEXT,
    default_capacity INTEGER,
    price DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE class_types IS 'Defines the types of classes a studio offers (e.g., Yoga, HIIT).';

-- Class Schedules Table: Schedules for specific classes
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
    class_type_id UUID NOT NULL REFERENCES class_types(id) ON DELETE CASCADE,
    trainer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    room TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_rule TEXT,
    capacity INTEGER,
    waitlist_capacity INTEGER,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE class_schedules IS 'The schedule for actual class instances.';

-- Create indexes for performance
CREATE INDEX ON profiles (studio_id);
CREATE INDEX ON membership_types (studio_id);
CREATE INDEX ON members (studio_id, status);
CREATE UNIQUE INDEX ON members (studio_id, member_number);
CREATE INDEX ON class_types (studio_id);
CREATE INDEX ON class_schedules (studio_id, start_time);
CREATE INDEX ON class_schedules (trainer_id);
