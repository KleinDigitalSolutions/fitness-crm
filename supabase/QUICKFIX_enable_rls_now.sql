-- =====================================================
-- 🚨 QUICK FIX: RLS SOFORT AKTIVIEREN 🚨
-- =====================================================
-- Führe dieses Script SOFORT aus, wenn du die Warnung siehst:
-- "Data is publicly accessible via API as RLS is disabled"
-- =====================================================

-- 1. RLS für alle Tabellen aktivieren
ALTER TABLE IF EXISTS studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS membership_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS members ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS class_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS payments ENABLE ROW LEVEL SECURITY;

-- 2. Bestätigung
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ✅ Alle Tabellen sollten jetzt "rls_enabled: true" haben
-- ⚠️ ABER: Du musst trotzdem noch die Policies erstellen! (siehe SUPABASE_SETUP.md Schritt 3.5)
