-- =====================================================
-- DEMO USER LOGIN DATA FOR FITNESS CRM
-- =====================================================
--
-- Demo User Credentials:
-- Email: demo@fitnessstudio.de
-- Password: Demo123!
--
-- Admin User Credentials:
-- Email: admin@fitnessstudio.de
-- Password: Admin123!
--
-- =====================================================

-- First, we need to create the demo users in Supabase Auth
-- NOTE: This part needs to be done via Supabase Dashboard or API
-- as SQL cannot directly insert into auth.users
--
-- Manual Steps:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User"
-- 3. Create user with email: demo@fitnessstudio.de, password: Demo123!
-- 4. Note the user_id generated
-- 5. Create user with email: admin@fitnessstudio.de, password: Admin123!
-- 6. Note the user_id generated
--
-- Then replace the UUIDs below with the actual user_ids from Supabase

-- =====================================================
-- STUDIOS
-- =====================================================

-- Insert a demo studio
INSERT INTO studios (id, name, address, phone, email, website, logo_url, settings)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Demo Fitness Studio',
    jsonb_build_object(
      'street', 'Musterstraße 123',
      'city', 'Berlin',
      'zip', '10115',
      'country', 'Germany'
    ),
    '+49 30 12345678',
    'info@demo-fitnessstudio.de',
    'https://demo-fitnessstudio.de',
    null,
    jsonb_build_object(
      'currency', 'EUR',
      'timezone', 'Europe/Berlin',
      'locale', 'de-DE'
    )
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email;

-- =====================================================
-- PROFILES
-- =====================================================

-- Demo User Profile
INSERT INTO profiles (id, user_id, studio_id, first_name, last_name, avatar_url, phone, date_of_birth, address, emergency_contact, health_notes, role)
VALUES
  (
    'd14fccd5-8139-437e-9b48-947b3cccffc4', -- Demo User ID
    'd14fccd5-8139-437e-9b48-947b3cccffc4', -- Demo User auth.users ID
    '11111111-1111-1111-1111-111111111111', -- Demo Studio ID
    'Max',
    'Mustermann',
    null,
    '+49 170 1234567',
    '1990-05-15',
    jsonb_build_object(
      'street', 'Beispielweg 42',
      'city', 'Berlin',
      'zip', '10115',
      'country', 'Germany'
    ),
    jsonb_build_object(
      'name', 'Anna Mustermann',
      'phone', '+49 170 7654321',
      'relationship', 'Spouse'
    ),
    'Keine besonderen Gesundheitshinweise',
    'studio_admin'
  ),
  -- Admin User Profile
  (
    'be27152a-f60b-4bff-a158-408492fcc51a', -- Admin User ID
    'be27152a-f60b-4bff-a158-408492fcc51a', -- Admin User auth.users ID
    '11111111-1111-1111-1111-111111111111', -- Demo Studio ID
    'Sarah',
    'Schmidt',
    null,
    '+49 170 9876543',
    '1985-08-22',
    jsonb_build_object(
      'street', 'Hauptstraße 1',
      'city', 'Berlin',
      'zip', '10115',
      'country', 'Germany'
    ),
    jsonb_build_object(
      'name', 'Peter Schmidt',
      'phone', '+49 170 1111111',
      'relationship', 'Partner'
    ),
    null,
    'studio_admin'
  )
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role;

-- =====================================================
-- MEMBERSHIP TYPES
-- =====================================================

INSERT INTO membership_types (id, studio_id, name, price_monthly, price_yearly, billing_interval, features, color, is_active)
VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    '11111111-1111-1111-1111-111111111111',
    'Basic',
    29.99,
    299.90,
    'monthly',
    jsonb_build_array(
      'Zugang zum Fitnessstudio',
      'Nutzung aller Geräte',
      'Umkleide & Duschen',
      'Getränke-Flatrate'
    ),
    '#3B82F6',
    true
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    '11111111-1111-1111-1111-111111111111',
    'Premium',
    49.99,
    499.90,
    'monthly',
    jsonb_build_array(
      'Alle Basic Leistungen',
      '5 Gruppenkurse pro Monat',
      'Sauna & Wellness',
      'Trainingsplan inklusive',
      'Handtuch-Service'
    ),
    '#10B981',
    true
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    '11111111-1111-1111-1111-111111111111',
    'Elite',
    79.99,
    799.90,
    'monthly',
    jsonb_build_array(
      'Alle Premium Leistungen',
      'Unbegrenzte Gruppenkurse',
      '4 Personal Training Sessions',
      'Ernährungsberatung',
      'Massage (1x monatlich)',
      'Gast-Pässe (2x monatlich)'
    ),
    '#EF4444',
    true
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price_monthly = EXCLUDED.price_monthly;

-- =====================================================
-- DEMO MEMBERS
-- =====================================================

INSERT INTO members (id, studio_id, user_id, member_number, membership_type_id, status, contract_start_date, contract_end_date, payment_method, credits_balance, loyalty_points, loyalty_tier, notes, tags)
VALUES
  -- Demo User as Member
  (
    '77777777-7777-7777-7777-777777777777',
    '11111111-1111-1111-1111-111111111111',
    'd14fccd5-8139-437e-9b48-947b3cccffc4',
    'M-2024-001',
    '55555555-5555-5555-5555-555555555555', -- Premium
    'active',
    '2024-01-01',
    '2025-01-01',
    'sepa',
    10,
    450,
    'gold',
    'Sehr aktives Mitglied, interessiert an Ernährungsberatung',
    ARRAY['VIP', 'Stammkunde']
  ),
  -- Additional Demo Members
  (
    '88888888-8888-8888-8888-888888888888',
    '11111111-1111-1111-1111-111111111111',
    null,
    'M-2024-002',
    '44444444-4444-4444-4444-444444444444', -- Basic
    'active',
    '2024-03-15',
    null,
    'card',
    5,
    120,
    'bronze',
    'Anfänger, benötigt Einweisung',
    ARRAY['Neuling', 'Student']
  ),
  (
    '99999999-9999-9999-9999-999999999999',
    '11111111-1111-1111-1111-111111111111',
    null,
    'M-2024-003',
    '66666666-6666-6666-6666-666666666666', -- Elite
    'active',
    '2023-11-01',
    null,
    'sepa',
    25,
    1200,
    'platinum',
    'Langjähriges Mitglied, sehr zufrieden',
    ARRAY['VIP', 'Elite', 'Stammkunde']
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    null,
    'M-2024-004',
    '55555555-5555-5555-5555-555555555555', -- Premium
    'pending',
    '2024-12-01',
    '2025-12-01',
    'bank_transfer',
    0,
    0,
    null,
    'Wartet auf Zahlungsbestätigung',
    ARRAY['Neukunde']
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    null,
    'M-2023-099',
    '44444444-4444-4444-4444-444444444444', -- Basic
    'inactive',
    '2023-06-01',
    '2024-06-01',
    'sepa',
    0,
    250,
    'silver',
    'Vertrag ausgelaufen, Reaktivierung möglich',
    ARRAY['Ehemaliges Mitglied']
  )
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  notes = EXCLUDED.notes;

-- Add profiles for the additional demo members (no auth users)
INSERT INTO profiles (id, user_id, studio_id, first_name, last_name, phone, date_of_birth, address, health_notes)
VALUES
  (
    '88888888-8888-8888-8888-888888888888',
    null,
    '11111111-1111-1111-1111-111111111111',
    'Julia',
    'Weber',
    '+49 170 2223334',
    '2001-03-10',
    jsonb_build_object('street', 'Studentenweg 5', 'city', 'Berlin', 'zip', '10115'),
    'Keine'
  ),
  (
    '99999999-9999-9999-9999-999999999999',
    null,
    '11111111-1111-1111-1111-111111111111',
    'Thomas',
    'Schneider',
    '+49 170 5556667',
    '1978-12-05',
    jsonb_build_object('street', 'Parkstraße 88', 'city', 'Berlin', 'zip', '10115'),
    'Rückenprobleme - angepasstes Training'
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    null,
    '11111111-1111-1111-1111-111111111111',
    'Lisa',
    'Meyer',
    '+49 170 8889990',
    '1995-07-18',
    jsonb_build_object('street', 'Neustraße 23', 'city', 'Berlin', 'zip', '10115'),
    'Keine'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    null,
    '11111111-1111-1111-1111-111111111111',
    'Michael',
    'Fischer',
    '+49 170 3334445',
    '1988-04-30',
    jsonb_build_object('street', 'Altstadt 77', 'city', 'Berlin', 'zip', '10115'),
    'Asthma - Inhalator dabei'
  )
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name;

-- =====================================================
-- CLASS TYPES
-- =====================================================

INSERT INTO class_types (id, studio_id, name, description, duration_minutes, category, difficulty, color, max_participants)
VALUES
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '11111111-1111-1111-1111-111111111111',
    'Yoga Flow',
    'Dynamischer Yoga-Kurs für Körper und Geist',
    60,
    'Yoga',
    'Anfänger',
    '#8B5CF6',
    15
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '11111111-1111-1111-1111-111111111111',
    'HIIT Training',
    'Hochintensives Intervalltraining für maximale Fettverbrennung',
    45,
    'Cardio',
    'Fortgeschritten',
    '#EF4444',
    20
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    '11111111-1111-1111-1111-111111111111',
    'Pilates',
    'Krafttraining für die Tiefenmuskulatur',
    60,
    'Kraft',
    'Anfänger',
    '#10B981',
    12
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- =====================================================
-- CLASS SCHEDULES (Next 7 days)
-- =====================================================

INSERT INTO class_schedules (studio_id, class_type_id, instructor_name, start_time, end_time, max_participants, booked_count, room)
VALUES
  -- Monday Classes
  (
    '11111111-1111-1111-1111-111111111111',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Anna Becker',
    CURRENT_DATE + INTERVAL '1 day' + TIME '09:00:00',
    CURRENT_DATE + INTERVAL '1 day' + TIME '10:00:00',
    15,
    8,
    'Studio 1'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'Tom Wagner',
    CURRENT_DATE + INTERVAL '1 day' + TIME '18:00:00',
    CURRENT_DATE + INTERVAL '1 day' + TIME '18:45:00',
    20,
    15,
    'Studio 2'
  ),
  -- Wednesday Classes
  (
    '11111111-1111-1111-1111-111111111111',
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'Sarah Klein',
    CURRENT_DATE + INTERVAL '3 days' + TIME '10:00:00',
    CURRENT_DATE + INTERVAL '3 days' + TIME '11:00:00',
    12,
    10,
    'Studio 1'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Anna Becker',
    CURRENT_DATE + INTERVAL '3 days' + TIME '19:00:00',
    CURRENT_DATE + INTERVAL '3 days' + TIME '20:00:00',
    15,
    6,
    'Studio 1'
  ),
  -- Friday Classes
  (
    '11111111-1111-1111-1111-111111111111',
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'Tom Wagner',
    CURRENT_DATE + INTERVAL '5 days' + TIME '17:30:00',
    CURRENT_DATE + INTERVAL '5 days' + TIME '18:15:00',
    20,
    18,
    'Studio 2'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'Sarah Klein',
    CURRENT_DATE + INTERVAL '5 days' + TIME '11:00:00',
    CURRENT_DATE + INTERVAL '5 days' + TIME '12:00:00',
    12,
    7,
    'Studio 1'
  );

-- =====================================================
-- PAYMENTS
-- =====================================================

INSERT INTO payments (studio_id, member_id, amount, payment_date, payment_method, status, description)
VALUES
  -- Payments for Max Mustermann (Demo User)
  (
    '11111111-1111-1111-1111-111111111111',
    '77777777-7777-7777-7777-777777777777',
    49.99,
    '2024-01-01',
    'sepa',
    'completed',
    'Premium Mitgliedschaft - Januar 2024'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '77777777-7777-7777-7777-777777777777',
    49.99,
    '2024-02-01',
    'sepa',
    'completed',
    'Premium Mitgliedschaft - Februar 2024'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '77777777-7777-7777-7777-777777777777',
    49.99,
    '2024-03-01',
    'sepa',
    'completed',
    'Premium Mitgliedschaft - März 2024'
  ),
  -- Payments for other members
  (
    '11111111-1111-1111-1111-111111111111',
    '99999999-9999-9999-9999-999999999999',
    79.99,
    '2024-01-01',
    'sepa',
    'completed',
    'Elite Mitgliedschaft - Januar 2024'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '88888888-8888-8888-8888-888888888888',
    29.99,
    '2024-03-15',
    'card',
    'completed',
    'Basic Mitgliedschaft - März 2024'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    49.99,
    '2024-12-01',
    'bank_transfer',
    'pending',
    'Premium Mitgliedschaft - Dezember 2024'
  );

-- =====================================================
-- SUMMARY
-- =====================================================

-- Display summary of created demo data
SELECT
  'Demo data created successfully!' as message,
  (SELECT COUNT(*) FROM studios WHERE id = '11111111-1111-1111-1111-111111111111') as studios_count,
  (SELECT COUNT(*) FROM membership_types WHERE studio_id = '11111111-1111-1111-1111-111111111111') as membership_types_count,
  (SELECT COUNT(*) FROM members WHERE studio_id = '11111111-1111-1111-1111-111111111111') as members_count,
  (SELECT COUNT(*) FROM class_types WHERE studio_id = '11111111-1111-1111-1111-111111111111') as class_types_count,
  (SELECT COUNT(*) FROM class_schedules WHERE studio_id = '11111111-1111-1111-1111-111111111111') as class_schedules_count,
  (SELECT COUNT(*) FROM payments WHERE studio_id = '11111111-1111-1111-1111-111111111111') as payments_count;
