# Fitness-Studio CRM System - Produktionsreifes Research & Implementierungs-Roadmap

**Erstellt:** 12. Oktober 2025
**Projekt:** Klein Digital Solutions - Fitness CRM
**Status:** Produktionsplanung

---

## Executive Summary

Das aktuelle Demo-System unter `/app/leistungen/fitness-crm/demo/page.tsx` ist eine **Mock-Version** mit statischen Daten und simulierten Funktionen. Dieses Dokument beschreibt die vollständige Transformation in ein **produktionsreifes SaaS-System** für Fitness-Studios in Deutschland.

### Aktuelle Demo-Features (Mock)
- Statische Mitgliederdaten (3 Demo-Mitglieder)
- Simulierte Kursplanung (6 Kurse)
- Fake Analytics mit Live-Updates via useEffect
- Frontend-only Implementierung
- Keine echte Datenbank-Anbindung
- Keine Authentifizierung
- Keine Payment-Integration

### Produktions-Ziel
Ein vollständiges, DSGVO-konformes Fitness-Studio CRM mit:
- Multi-Tenant Architektur
- Echtzeit-Daten via Supabase
- SEPA-Lastschrift Integration
- E-Mail/SMS Automation
- Mitglieder-App (Progressive Web App)
- KI-gestützte Analytics & Retention
- Comprehensive DSGVO-Compliance

---

## 1. Analyse des bestehenden Demo-Systems

### 1.1 Identifizierte Mock-Daten & Fake-Features

#### Datei: `/app/leistungen/fitness-crm/demo/page.tsx` (1759 Zeilen)

**Mock-Daten:**
```typescript
// Zeilen 117-209: Statische Mitglieder (nur 3!)
const members = [
  { id: 1, name: 'Sarah Mueller', ... purchaseHistory: [...] },
  { id: 2, name: 'Michael Schmidt', ... purchaseHistory: [...] },
  { id: 3, name: 'Anna Weber', status: 'expired', ... }
]

// Zeilen 211-296: Statische Kurse (6 Kurse)
const classes = [...]

// Zeilen 298-312: Statische Analytics
const [analytics, setAnalytics] = useState({
  totalMembers: 247,
  activeMembers: 227,
  monthlyRevenue: 18420,
  // Alle Werte sind hardcoded!
})

// Zeilen 362-438: KI Analytics (komplett fake)
const aiAnalytics = {
  customerSegments: [...],  // Statisch definiert
  productRecommendations: [...],  // Keine echte KI
  salesOptimization: {...},  // Fake-Daten
  churnPrediction: {...}  // Simuliert
}
```

**Fake-Funktionen:**
```typescript
// Zeile 323-350: Demo-Benachrichtigungen (keine echten Actions)
const showDemoNotification = (message: string) => {
  setShowNotification(message);
  setTimeout(() => setShowNotification(''), 3000);
}

// Zeile 337-341: Fake Class Booking
const handleBookClass = (classItem: any) => {
  setBookingClass(classItem);
  showDemoNotification(`Buchung für ${classItem.name}...`);
  // Keine echte DB-Operation!
}

// Zeile 57-67: Fake "Live-Updates"
useEffect(() => {
  const interval = setInterval(() => {
    setAnalytics(prevAnalytics => ({
      ...prevAnalytics,
      activeMembers: prevAnalytics.activeMembers + Math.floor(Math.random() * 3) - 1
    }));
  }, 3000);
  return () => clearInterval(interval);
}, []);
```

**Komponenten mit nur Demo-Funktionalität:**
1. **Dashboard (Zeilen 456-788):**
   - Chart mit statischen Daten (Zeile 441-454)
   - Fake Live-Analytics-Updates
   - Keine echten Warnungen/Alerts
   - Churn-Risiko Management (Zeile 670-702) - nur UI, keine Logik

2. **Mitgliederverwaltung (Zeilen 791-1242):**
   - Keine Create/Update/Delete Operationen
   - Filter funktionieren nur auf 3 statischen Mitgliedern
   - Kaufhistorie (Zeilen 1146-1188) ist statisch
   - Kein Export (Zeile 808: nur Notification)

3. **Kursverwaltung (Zeilen 1244-1319):**
   - Keine Kurs-Erstellung
   - Keine echte Buchungslogik
   - Keine Wartelisten-Verwaltung
   - Keine Trainer-Zuweisung

4. **Zahlungsverwaltung (Zeilen 1321-1393):**
   - Keine SEPA-Integration
   - Statische Transaktionsliste
   - Keine Rechnungsstellung
   - Kein Mahnwesen

5. **KI-Analytics (Zeilen 1395-1589):**
   - Alle Segmentierungen sind hardcoded
   - Keine echte KI/ML-Integration
   - Produktempfehlungen sind fake
   - Churn-Prediction ist simuliert

### 1.2 Positive Aspekte der Demo
- Sehr gutes UI/UX Design mit Framer Motion
- Responsive Layout
- Gute Struktur für spätere Implementierung
- Tooltips erklären Automatisierungsmöglichkeiten
- Realistische Mock-Daten als Vorlage

---

## 2. Produktionsreife Requirements

### 2.1 Kernfunktionen eines echten Fitness-CRM

Basierend auf Industry-Research (2025) und dem Demo-Konzept:

#### **A. Mitgliederverwaltung**
- **Lead Management:**
  - Interessenten-Erfassung via Web-Formular
  - Automatisches Lead-Scoring (Engagement-Tracking)
  - Follow-up Automation (E-Mail-Sequenzen)
  - Probetraining-Buchung
  - Konversions-Tracking

- **Mitglieder-Profile:**
  - Vollständige Kontaktdaten (Name, Adresse, Tel, E-Mail)
  - Notfallkontakt
  - Gesundheitsdaten (Verletzungen, Einschränkungen)
  - Foto-Upload
  - Vertragsinformationen
  - Zahlungsmethode (SEPA-Mandat)
  - Besuchshistorie (Check-ins)
  - Trainingshistorie
  - Kaufhistorie (Supplements, PT-Sessions, etc.)
  - Notizen & Tags
  - Custom Fields

- **Vertrags-Management:**
  - Vertragsvorlagen (Premium, VIP, Basic, etc.)
  - Digitale Vertragsunterzeichnung
  - Automatische Verlängerung
  - Kündigungsverwaltung (Fristen)
  - Pausierungen
  - Upgrades/Downgrades

- **Check-In System:**
  - QR-Code/RFID-Karten
  - Mobile App Check-in
  - Zugangskontrolle-Integration
  - Besuchs-Statistiken

#### **B. Kursbuchung & Planung**
- **Kursplanung:**
  - Kursvorlagen erstellen
  - Wöchentlicher/Monatlicher Kalender
  - Trainer-Zuweisung
  - Raum-Verwaltung
  - Kapazitäten-Management
  - Recurring Events

- **Buchungssystem:**
  - Online-Buchung via Website/App
  - Wartelisten-Management
  - Automatische Nachrückung
  - Stornierungsregeln
  - No-Show Tracking
  - Buchungshistorie

- **Notifications:**
  - Buchungsbestätigungen (E-Mail/SMS)
  - Erinnerungen 2h vor Kurs (WhatsApp/SMS)
  - Stornierungsbenachrichtigungen
  - Wartelisten-Updates
  - Kursänderungen

- **Trainer-Features:**
  - Trainer-Portal
  - Teilnehmerlisten
  - Anwesenheits-Check
  - Feedback-System

#### **C. Zahlungsabwicklung**
- **SEPA-Lastschrift:**
  - SEPA-Mandat-Verwaltung
  - Automatische monatliche Abbuchungen
  - Fehlgeschlagene Zahlungen tracken
  - Re-Try Logik
  - Zahlungshistorie

- **Rechnungsstellung:**
  - Automatische Rechnungserstellung
  - PDF-Generierung
  - E-Mail-Versand
  - Stornierungs-Rechnungen
  - Mahnwesen (3 Mahnungen)
  - GoBD-konforme Archivierung

- **Payment Methods:**
  - SEPA (Hauptmethode)
  - Kreditkarte (Stripe)
  - PayPal (Optional)
  - Bar/EC vor Ort (POS-Integration)

- **Produkt-Verkauf:**
  - POS-System Integration
  - Supplement-Shop
  - Personal Training Sessions
  - Getränke/Snacks
  - Merchandise
  - Online-Shop Integration

#### **D. Analytics & Reporting**
- **Dashboards:**
  - Echtzeit-KPIs
  - Mitgliederentwicklung
  - Umsatz-Tracking
  - Kursauslastung
  - Churn-Rate
  - LTV (Lifetime Value)

- **Reports:**
  - Finanzbericht (Monat/Jahr)
  - Mitglieder-Report
  - Kurs-Performance
  - Trainer-Performance
  - Export als PDF/Excel
  - Automatischer E-Mail-Versand

- **KI-Features:**
  - Churn-Prediction (ML-Modell)
  - Upsell-Empfehlungen
  - Optimale Kurszeitslots
  - Preisoptimierung
  - Segmentierung
  - Next-Best-Action

#### **E. Marketing & Retention**
- **E-Mail Marketing:**
  - Newsletter-System
  - Automatisierte Kampagnen
  - Segment-basiertes Targeting
  - A/B Testing
  - Analytics & Tracking

- **SMS/WhatsApp:**
  - Transaktionale Nachrichten
  - Marketing-Kampagnen
  - Two-Way Communication
  - Broadcast-Funktionen

- **Retention Management:**
  - Automatische Inaktivitäts-Erkennung
  - Interventions-Workflows
  - Win-Back Kampagnen
  - Loyalitätsprogramm
  - Referral-System

#### **F. Mitglieder-App (PWA)**
- **Features:**
  - Kursbuchung
  - Check-in via QR
  - Zahlungshistorie
  - Vertragsdetails
  - Trainingsplan
  - Social Feed
  - Push-Notifications
  - Freunde einladen

#### **G. Multi-Location Support**
- Standort-Verwaltung
- Übergreifende Mitgliedschaften
- Zentrale Buchhaltung
- Standort-spezifische Reports
- Franchising-Support

### 2.2 DSGVO-Anforderungen (Deutschland)

#### **Pflicht-Features:**
1. **Datenschutz-Dokumentation:**
   - Verarbeitungsverzeichnis
   - Datenschutzerklärung
   - Einwilligungstexte
   - AVV-Verträge

2. **Technische Maßnahmen:**
   - Ende-zu-Ende Verschlüsselung
   - Verschlüsselte Datenbank
   - SSL/TLS für alle Verbindungen
   - Zugriffskontrolle (RBAC)
   - Audit-Logging

3. **Betroffenen-Rechte:**
   - Auskunftsrecht (Download)
   - Recht auf Löschung
   - Recht auf Berichtigung
   - Datenportabilität
   - Widerspruchsrecht

4. **Consent Management:**
   - Cookie-Banner
   - Opt-in für Marketing
   - Einwilligungsverwaltung
   - Widerrufsmöglichkeit

5. **Data Residency:**
   - Hosting in Deutschland
   - EU-Server für Backups
   - Keine Drittland-Übermittlung

6. **Löschkonzept:**
   - Automatische Löschung nach 3 Jahren Inaktivität
   - Aufbewahrungsfristen beachten (10 Jahre für Buchhaltung)
   - Rechte auf Vergessenwerden

---

## 3. Tech Stack & Architektur

### 3.1 Technologie-Empfehlungen

#### **Frontend**
- **Framework:** Next.js 15.x (bereits im Projekt)
- **Styling:** Tailwind CSS (bereits vorhanden)
- **Animations:** Framer Motion (bereits vorhanden)
- **State Management:**
  - Zustand (lightweight) oder
  - TanStack Query für Server State
- **Forms:** React Hook Form + Zod Validation
- **Charts:** Recharts (bereits vorhanden)
- **Tables:** TanStack Table
- **Date/Time:** date-fns oder Day.js

#### **Backend**
- **Database:** Supabase PostgreSQL (bereits vorhanden!)
  - Realtime Subscriptions
  - Row Level Security
  - Built-in Auth
  - Storage für Dokumente/Bilder

- **API:** Next.js API Routes (Server Actions für Mutations)
- **Authentication:** Supabase Auth
  - Email/Password
  - Magic Links
  - OAuth (Google, Apple)
  - Multi-Factor Auth (2FA)

- **Authorization:** Row Level Security (RLS) Policies

#### **Payment & Billing**
- **SEPA-Lastschrift:**
  - **GoCardless** (EU-fokussiert, SEPA-spezialisiert)
  - **Stripe SEPA Direct Debit** (Alternative)
  - Empfehlung: **GoCardless** für Deutschland

- **Rechnungsstellung:**
  - **Lexoffice API** (deutscher Marktführer)
  - **sevDesk API** (Alternative)
  - Eigene PDF-Generierung mit **jsPDF** oder **PDFKit**

#### **Communication**
- **E-Mail:**
  - **Resend** (moderne Developer-Experience)
  - **SendGrid** (Alternative, etabliert)
  - **Postmark** (Transactional E-Mails)

- **SMS:**
  - **Twilio** (global, zuverlässig)
  - **MessageBird** (EU-fokussiert)

- **WhatsApp Business:**
  - **Twilio WhatsApp API**
  - **360dialog** (WhatsApp Business Solution Provider)

#### **File Storage**
- **Supabase Storage** (bereits vorhanden)
  - Bilder (Profilfotos, Dokumente)
  - PDFs (Verträge, Rechnungen)
  - DSGVO-konform in EU

#### **Background Jobs**
- **Inngest** (moderne Alternative)
- **QStash** (Upstash)
- **Supabase Edge Functions** (für einfache Jobs)

#### **Analytics & Monitoring**
- **Application Monitoring:**
  - **Vercel Analytics** (Performance)
  - **Sentry** (Error Tracking)

- **Business Analytics:**
  - Eigene Implementierung in Supabase
  - **Metabase** als Self-Hosted BI-Tool (optional)

#### **AI/ML für Churn Prediction**
- **OpenAI API** (für Text-basierte Features)
- **Vercel AI SDK** (bereits im Projekt!)
- **Supabase pgvector** für Embeddings
- **Hugging Face Inference API** (optional)
- Eigene ML-Modelle via Python FastAPI (später)

#### **Search**
- **Supabase Full-Text Search** (integriert)
- **Typesense** (Self-Hosted Alternative)
- **Algolia** (Managed, teurer)

### 3.2 Datenbank-Schema

#### **Core Tables**

```sql
-- =============================================
-- USERS & AUTHENTICATION
-- =============================================

-- Erweitert Supabase auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('studio_owner', 'studio_admin', 'trainer', 'member')),
  studio_id UUID REFERENCES studios(id),
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  date_of_birth DATE,
  address JSONB, -- {street, city, zip, country}
  emergency_contact JSONB, -- {name, phone, relation}
  health_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- STUDIOS (Multi-Tenant)
-- =============================================

CREATE TABLE public.studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES auth.users(id),
  address JSONB NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  logo_url TEXT,
  settings JSONB DEFAULT '{}', -- Feature flags, customization
  subscription_plan TEXT DEFAULT 'trial', -- trial, basic, pro, enterprise
  subscription_status TEXT DEFAULT 'active',
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_studios_slug ON studios(slug);
CREATE INDEX idx_studios_owner_id ON studios(owner_id);

-- =============================================
-- MEMBERSHIPS
-- =============================================

CREATE TABLE public.membership_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- "Premium", "VIP", "Basic"
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2),
  billing_interval TEXT DEFAULT 'monthly', -- monthly, yearly
  features JSONB DEFAULT '[]', -- ["unlimited_classes", "sauna", "pt_discount"]
  color TEXT, -- Hex color for UI
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_membership_types_studio_id ON membership_types(studio_id);

-- =============================================
-- MEMBERS
-- =============================================

CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  member_number TEXT UNIQUE, -- Auto-generated
  membership_type_id UUID REFERENCES membership_types(id),

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'expired', 'cancelled')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_visit_at TIMESTAMPTZ,

  -- Contract
  contract_start_date DATE NOT NULL,
  contract_end_date DATE,
  contract_auto_renew BOOLEAN DEFAULT true,
  contract_minimum_term INTEGER DEFAULT 12, -- months

  -- Payment
  payment_method TEXT, -- 'sepa', 'stripe', 'invoice'
  sepa_mandate_id TEXT,
  sepa_mandate_signed_at TIMESTAMPTZ,
  next_billing_date DATE,
  last_payment_date DATE,

  -- Credits (for prepaid models)
  credits_balance INTEGER DEFAULT 0,

  -- Loyalty
  loyalty_points INTEGER DEFAULT 0,
  loyalty_tier TEXT, -- 'bronze', 'silver', 'gold', 'platinum'

  -- Metadata
  source TEXT, -- 'website', 'walk-in', 'referral', 'instagram'
  referral_code TEXT,
  referred_by_member_id UUID REFERENCES members(id),
  notes TEXT,
  tags TEXT[],
  custom_fields JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_members_studio_id ON members(studio_id);
CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_members_member_number ON members(member_number);

-- =============================================
-- CHECK-INS (Visits)
-- =============================================

CREATE TABLE public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  check_in_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  check_out_time TIMESTAMPTZ,
  method TEXT, -- 'qr_code', 'rfid', 'app', 'manual'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_check_ins_studio_id ON check_ins(studio_id);
CREATE INDEX idx_check_ins_member_id ON check_ins(member_id);
CREATE INDEX idx_check_ins_check_in_time ON check_ins(check_in_time);

-- =============================================
-- CLASSES
-- =============================================

CREATE TABLE public.class_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- "Yoga", "HIIT", "Pilates"
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  category TEXT, -- 'cardio', 'strength', 'flexibility', 'dance'
  difficulty TEXT, -- 'beginner', 'intermediate', 'advanced', 'expert'
  color TEXT, -- Hex color
  icon TEXT, -- Icon name
  default_capacity INTEGER DEFAULT 20,
  price DECIMAL(10,2), -- If classes cost extra credits
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_class_types_studio_id ON class_types(studio_id);

CREATE TABLE public.class_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  class_type_id UUID REFERENCES class_types(id) ON DELETE CASCADE,
  trainer_id UUID REFERENCES profiles(id),
  room TEXT,

  -- Timing
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT, -- RRULE format (iCalendar)

  -- Capacity
  capacity INTEGER NOT NULL DEFAULT 20,
  waitlist_capacity INTEGER DEFAULT 10,

  -- Status
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled', 'completed')),
  cancellation_reason TEXT,

  -- Metadata
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_class_schedules_studio_id ON class_schedules(studio_id);
CREATE INDEX idx_class_schedules_start_time ON class_schedules(start_time);
CREATE INDEX idx_class_schedules_trainer_id ON class_schedules(trainer_id);

-- =============================================
-- CLASS BOOKINGS
-- =============================================

CREATE TABLE public.class_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  class_schedule_id UUID REFERENCES class_schedules(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,

  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'waitlist', 'cancelled', 'no_show', 'attended')),
  waitlist_position INTEGER,

  booked_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  attended BOOLEAN DEFAULT false,
  attended_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(class_schedule_id, member_id) -- Member kann Kurs nur einmal buchen
);

CREATE INDEX idx_class_bookings_studio_id ON class_bookings(studio_id);
CREATE INDEX idx_class_bookings_class_schedule_id ON class_bookings(class_schedule_id);
CREATE INDEX idx_class_bookings_member_id ON class_bookings(member_id);
CREATE INDEX idx_class_bookings_status ON class_bookings(status);

-- =============================================
-- PAYMENTS & INVOICES
-- =============================================

CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE NOT NULL, -- Auto-generated

  -- Amounts
  amount_subtotal DECIMAL(10,2) NOT NULL,
  amount_tax DECIMAL(10,2) DEFAULT 0,
  amount_total DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  due_date DATE,
  paid_at TIMESTAMPTZ,

  -- Items
  items JSONB NOT NULL, -- [{description, quantity, unit_price, total}]

  -- Files
  pdf_url TEXT,

  -- Reminders
  reminder_sent_at TIMESTAMPTZ,
  reminder_count INTEGER DEFAULT 0,

  -- Notes
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_studio_id ON invoices(studio_id);
CREATE INDEX idx_invoices_member_id ON invoices(member_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES invoices(id),

  -- Amount
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',

  -- Method
  payment_method TEXT NOT NULL, -- 'sepa', 'stripe', 'cash', 'ec_card'
  payment_provider TEXT, -- 'gocardless', 'stripe'

  -- External References
  external_payment_id TEXT, -- Provider's payment ID
  sepa_mandate_id TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'refunded')),
  failure_reason TEXT,

  -- Timing
  payment_date TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_studio_id ON payments(studio_id);
CREATE INDEX idx_payments_member_id ON payments(member_id);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_payments_status ON payments(status);

-- =============================================
-- PRODUCTS & PURCHASES (Shop)
-- =============================================

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sku TEXT,
  category TEXT, -- 'supplements', 'drinks', 'merchandise', 'equipment'
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2), -- For profit calculation
  tax_rate DECIMAL(5,2) DEFAULT 19.00, -- German VAT
  stock_quantity INTEGER DEFAULT 0,
  stock_tracking BOOLEAN DEFAULT true,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_studio_id ON products(studio_id);
CREATE INDEX idx_products_category ON products(category);

CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id),
  product_id UUID REFERENCES products(id),

  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,

  payment_method TEXT, -- 'cash', 'card', 'account' (auf Rechnung)
  payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('paid', 'pending', 'refunded')),

  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_purchases_studio_id ON purchases(studio_id);
CREATE INDEX idx_purchases_member_id ON purchases(member_id);
CREATE INDEX idx_purchases_purchased_at ON purchases(purchased_at);

-- =============================================
-- COMMUNICATIONS
-- =============================================

CREATE TABLE public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL, -- HTML content
  segment_filters JSONB, -- Targeting criteria

  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,

  -- Stats
  recipients_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,

  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_campaigns_studio_id ON email_campaigns(studio_id);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,

  type TEXT NOT NULL, -- 'email', 'sms', 'push', 'in_app'
  channel TEXT NOT NULL, -- Specific channel used

  subject TEXT,
  content TEXT NOT NULL,

  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'opened')),

  -- External IDs
  external_message_id TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_studio_id ON notifications(studio_id);
CREATE INDEX idx_notifications_member_id ON notifications(member_id);
CREATE INDEX idx_notifications_status ON notifications(status);

-- =============================================
-- AI & ANALYTICS
-- =============================================

CREATE TABLE public.churn_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,

  prediction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  churn_probability DECIMAL(5,4), -- 0.0000 to 1.0000
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),

  -- Contributing factors
  factors JSONB, -- {visit_frequency, payment_issues, engagement_score, etc.}

  -- Actions taken
  intervention_triggered BOOLEAN DEFAULT false,
  intervention_type TEXT,
  intervention_date DATE,

  -- Outcome
  churned BOOLEAN,
  churn_date DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_churn_predictions_studio_id ON churn_predictions(studio_id);
CREATE INDEX idx_churn_predictions_member_id ON churn_predictions(member_id);
CREATE INDEX idx_churn_predictions_risk_level ON churn_predictions(risk_level);

-- =============================================
-- AUDIT LOG
-- =============================================

CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),

  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  entity_type TEXT NOT NULL, -- 'member', 'class', 'payment', etc.
  entity_id UUID,

  changes JSONB, -- Old vs new values
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_studio_id ON audit_logs(studio_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE churn_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Example RLS Policies (für members table)
CREATE POLICY "Studio owners can view all members in their studio"
  ON members FOR SELECT
  USING (
    studio_id IN (
      SELECT id FROM studios WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Studio admins can view members in their studio"
  ON members FOR SELECT
  USING (
    studio_id IN (
      SELECT studio_id FROM profiles
      WHERE id = auth.uid() AND role IN ('studio_admin', 'studio_owner')
    )
  );

CREATE POLICY "Members can view their own profile"
  ON members FOR SELECT
  USING (user_id = auth.uid());

-- Weitere Policies für INSERT, UPDATE, DELETE analog...
```

### 3.3 API-Endpunkte (Next.js API Routes)

```
/api/
├── auth/
│   ├── login
│   ├── logout
│   ├── register
│   ├── verify-email
│   ├── reset-password
│   └── refresh-token
│
├── studios/
│   ├── [id]
│   ├── create
│   ├── update
│   ├── settings
│   └── stats
│
├── members/
│   ├── list
│   ├── [id]
│   ├── create
│   ├── update
│   ├── delete
│   ├── search
│   ├── export
│   ├── import
│   └── check-in
│
├── classes/
│   ├── types/
│   │   ├── list
│   │   ├── create
│   │   └── [id]
│   ├── schedules/
│   │   ├── list
│   │   ├── create
│   │   ├── [id]
│   │   └── cancel
│   └── bookings/
│       ├── create
│       ├── cancel
│       └── [id]
│
├── payments/
│   ├── sepa/
│   │   ├── create-mandate
│   │   ├── charge
│   │   └── webhooks
│   ├── stripe/
│   │   ├── create-payment-intent
│   │   ├── webhooks
│   │   └── refund
│   ├── invoices/
│   │   ├── list
│   │   ├── create
│   │   ├── [id]
│   │   ├── send
│   │   └── download-pdf
│   └── transactions/
│       └── list
│
├── products/
│   ├── list
│   ├── create
│   ├── [id]
│   ├── update-stock
│   └── purchase
│
├── communications/
│   ├── email/
│   │   ├── send
│   │   ├── campaigns/
│   │   └── templates/
│   ├── sms/
│   │   └── send
│   └── whatsapp/
│       └── send
│
├── analytics/
│   ├── dashboard
│   ├── members/
│   │   ├── growth
│   │   ├── churn
│   │   └── retention
│   ├── revenue/
│   │   ├── overview
│   │   └── forecast
│   └── classes/
│       ├── attendance
│       └── popular
│
├── ai/
│   ├── churn-prediction
│   ├── recommendations
│   ├── segmentation
│   └── insights
│
└── webhooks/
    ├── gocardless
    ├── stripe
    ├── twilio
    └── supabase
```

---

## 4. Implementierungs-Roadmap

### Phase 1: MVP Foundation (8-10 Wochen)

**Ziel:** Funktionierendes Single-Studio System mit Basis-Features

#### Woche 1-2: Setup & Authentifizierung
- [x] Supabase Projekt konfigurieren
- [ ] Database Schema implementieren (Core Tables)
- [ ] RLS Policies einrichten
- [ ] Supabase Auth Setup
  - Email/Password Login
  - Magic Links
  - Password Reset
- [ ] Multi-Role System (Owner, Admin, Trainer, Member)
- [ ] Studio-Onboarding Flow

**Deliverables:**
- Funktionierende Authentifizierung
- Basis-Schema deployed
- Admin kann sich anmelden

#### Woche 3-4: Mitgliederverwaltung Core
- [ ] Mitglieder CRUD Operations
- [ ] Mitgliedertypen-Verwaltung
- [ ] Profil-Seiten (erweitert)
- [ ] Suchfunktion
- [ ] Filter & Sortierung
- [ ] Member-Details Modal (wie Demo)
- [ ] Notizen & Tags
- [ ] Foto-Upload (Supabase Storage)

**Deliverables:**
- Vollständige Mitgliederverwaltung
- Export-Funktion (CSV)
- Responsive UI

#### Woche 5-6: Kursverwaltung
- [ ] Kurstypen erstellen/bearbeiten
- [ ] Kursplan (Kalenderansicht)
- [ ] Trainer-Zuweisung
- [ ] Buchungssystem
- [ ] Wartelisten-Logik
- [ ] Automatische Nachrückung
- [ ] Buchungsbestätigungen (E-Mail)

**Deliverables:**
- Funktionierendes Buchungssystem
- Trainer-Portal (Basic)
- Member kann Kurse buchen

#### Woche 7-8: Zahlungen & Rechnungen (Basic)
- [ ] GoCardless Integration
- [ ] SEPA-Mandat erstellen
- [ ] Automatische monatliche Abbuchungen
- [ ] Rechnungserstellung (PDF)
- [ ] Zahlungshistorie
- [ ] Basic Mahnwesen (1 Stufe)
- [ ] E-Mail-Versand

**Deliverables:**
- SEPA-Zahlungen funktionieren
- Rechnungen werden generiert
- Members sehen Zahlungshistorie

#### Woche 9-10: Dashboard & Reporting
- [ ] Studio-Dashboard
- [ ] KPIs implementieren:
  - Mitgliederzahl
  - Monatsumsatz
  - Neue Mitglieder
  - Kursauslastung
- [ ] Charts mit echten Daten
- [ ] Export-Funktionen
- [ ] Basic Reports

**Deliverables:**
- Funktionierendes Dashboard
- Real-Time Updates
- Erste Reports

#### Testing & Polish (Woche 9-10)
- [ ] E2E Tests (Playwright)
- [ ] Performance-Optimierung
- [ ] Mobile-Responsive
- [ ] Bug-Fixes
- [ ] Documentation

### Phase 2: Advanced Features (6-8 Wochen)

**Ziel:** Vollständiges CRM mit Marketing & Retention

#### Woche 11-12: E-Mail Marketing
- [ ] Resend/SendGrid Integration
- [ ] Newsletter-System
- [ ] Template-Builder
- [ ] Segmentierung
- [ ] Automated Campaigns:
  - Welcome Series
  - Birthday-Mails
  - Renewal Reminders
- [ ] Analytics (Open Rate, Click Rate)

#### Woche 13-14: SMS & WhatsApp
- [ ] Twilio Integration
- [ ] SMS-Notifications
- [ ] WhatsApp Business API
- [ ] Automated Reminders:
  - Kurs 2h vorher
  - Zahlungserinnerung
  - Check-in Reminder
- [ ] Two-Way Communication

#### Woche 15-16: Retention & Churn Management
- [ ] Activity-Tracking
- [ ] Inaktivitäts-Erkennung
- [ ] Automatische Interventions-Workflows
- [ ] Win-Back Kampagnen
- [ ] Loyalitätsprogramm
- [ ] Referral-System

#### Woche 17-18: Shop & POS
- [ ] Produkt-Verwaltung
- [ ] Inventory-Tracking
- [ ] POS-Interface
- [ ] Member-Kaufhistorie
- [ ] Upsell-Empfehlungen
- [ ] Analytics

### Phase 3: AI & Automation (4-6 Wochen)

**Ziel:** Intelligentes System mit KI-Features

#### Woche 19-20: Churn-Prediction
- [ ] Datensammlung & Feature-Engineering
- [ ] ML-Modell Training (Python FastAPI Service)
- [ ] Prediction-Pipeline
- [ ] Risk-Scoring
- [ ] Dashboard-Integration
- [ ] Automated Actions

#### Woche 21-22: Smart Recommendations
- [ ] Member-Segmentierung (ML)
- [ ] Produkt-Empfehlungen
- [ ] Kurs-Empfehlungen
- [ ] Optimal Pricing
- [ ] Next-Best-Action

#### Woche 23-24: Analytics & Insights
- [ ] Advanced BI-Dashboard
- [ ] Predictive Analytics
- [ ] Revenue Forecasting
- [ ] Automated Reports
- [ ] Custom Dashboards

### Phase 4: Enterprise Features (4-6 Wochen)

**Ziel:** Multi-Location & Skalierung

#### Woche 25-26: Multi-Location
- [ ] Standort-Verwaltung
- [ ] Cross-Location Memberships
- [ ] Zentrales Reporting
- [ ] Location-spezifische Settings
- [ ] Franchise-Features

#### Woche 27-28: Mitglieder-App (PWA)
- [ ] Progressive Web App
- [ ] Push-Notifications
- [ ] Offline-Support
- [ ] QR-Code Check-in
- [ ] Booking-Interface
- [ ] Social Features

#### Woche 29-30: Compliance & Security
- [ ] DSGVO-Audit
- [ ] Consent-Management
- [ ] Data-Portability
- [ ] Deletion-Workflows
- [ ] Security-Audit
- [ ] Penetration-Testing

### Phase 5: Polish & Launch (2-3 Wochen)

#### Woche 31-32: Final Testing
- [ ] Load-Testing
- [ ] Security-Review
- [ ] DSGVO-Compliance Check
- [ ] User-Acceptance Testing
- [ ] Bug-Fixing

#### Woche 33: Launch
- [ ] Production Deployment
- [ ] Monitoring Setup
- [ ] Documentation
- [ ] Training Materials
- [ ] Support-System

---

## 5. Priorisierung: MVP vs. Nice-to-have

### Must-Have (MVP - Phase 1)
1. Authentifizierung & Authorization
2. Studio-Setup
3. Mitgliederverwaltung (CRUD)
4. Membership-Types
5. Check-in System (Basic)
6. Kursverwaltung (CRUD)
7. Kursbuchung (Basic)
8. SEPA-Integration
9. Rechnungserstellung
10. Dashboard (Basic KPIs)

### Should-Have (Phase 2)
1. E-Mail Marketing
2. SMS-Notifications
3. Wartelisten-Management
4. Mahnwesen (3 Stufen)
5. Produkt-Verkauf
6. Loyalitätsprogramm
7. Export-Funktionen
8. Advanced Filters
9. Trainer-Portal
10. Member-Self-Service

### Nice-to-Have (Phase 3+)
1. Churn-Prediction (AI)
2. Smart Recommendations
3. WhatsApp Business API
4. Multi-Location Support
5. Mitglieder-App (PWA)
6. Social Features
7. Advanced Analytics
8. Custom Reports
9. API für Drittanbieter
10. Marketplace-Integrationen

### Future Enhancements
1. Ernährungspläne
2. Trainingsplan-Builder
3. Video-Kurse (On-Demand)
4. Biometric-Integration
5. Wearable-Sync (Apple Health, Fitbit)
6. Community-Forum
7. Gamification
8. Challenges & Leaderboards

---

## 6. Geschätzte Entwicklungszeit

### Team-Konstellation (Empfehlung)
- 1x Senior Full-Stack Developer
- 1x Frontend Developer (React/Next.js)
- 0.5x Backend/DevOps
- 0.5x UI/UX Designer
- 0.25x QA/Testing

### Zeit-Schätzungen (Person-Wochen)

| Phase | Features | Person-Wochen | Kalender-Wochen |
|-------|----------|---------------|-----------------|
| Phase 1: MVP | Auth, Members, Classes, Payments, Dashboard | 35-40 | 10-12 |
| Phase 2: Advanced | Marketing, Retention, Shop | 25-30 | 6-8 |
| Phase 3: AI | Churn Prediction, Recommendations | 15-20 | 4-6 |
| Phase 4: Enterprise | Multi-Location, PWA, Compliance | 15-20 | 4-6 |
| Phase 5: Polish | Testing, Launch | 8-10 | 2-3 |
| **TOTAL** | | **98-120** | **26-35** |

**Realistische Timeline mit 2-Person-Team:**
- **Minimum:** 6-7 Monate (nur MVP + wichtigste Features)
- **Empfohlen:** 9-12 Monate (MVP + Phase 2 + wichtige AI-Features)
- **Vollständig:** 12-15 Monate (alle Phasen)

### Kosten-Schätzung (Freelancer/Agentur)

**Stundensätze (Deutschland):**
- Senior Developer: 80-120€/h
- Mid-Level Developer: 60-90€/h
- Designer: 60-100€/h

**Gesamtkosten (konservativ):**
- **MVP (Phase 1):** 28.000€ - 48.000€
- **Phase 2:** 20.000€ - 36.000€
- **Phase 3:** 15.000€ - 24.000€
- **Phase 4:** 15.000€ - 24.000€
- **Phase 5:** 8.000€ - 12.000€

**TOTAL:** 86.000€ - 144.000€

**Monatliche Betriebskosten (SaaS):**
- Supabase: 25€-200€/Monat (je nach Nutzung)
- GoCardless: 0.20€ - 1€ pro Transaktion + 1-2% Gebühr
- Resend/SendGrid: 10€-50€/Monat
- Twilio: Pay-per-use (ca. 0.07€/SMS)
- Vercel: 20€-200€/Monat
- Sentry: 0€-26€/Monat
- **Total:** ~100€-500€/Monat (Start), skaliert mit Nutzern

---

## 7. Code-Struktur-Vorschlag

```
kleindigitalsolutionsneu/
├── app/
│   ├── (auth)/                    # Auth Routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── verify-email/
│   │
│   ├── (dashboard)/               # Authenticated Routes
│   │   ├── layout.tsx             # Dashboard Layout
│   │   ├── page.tsx               # Dashboard Home
│   │   │
│   │   ├── members/
│   │   │   ├── page.tsx           # Members List
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx       # Member Detail
│   │   │   │   ├── edit/
│   │   │   │   └── history/
│   │   │   ├── new/
│   │   │   └── import/
│   │   │
│   │   ├── classes/
│   │   │   ├── page.tsx           # Classes Overview
│   │   │   ├── types/
│   │   │   ├── schedule/
│   │   │   └── bookings/
│   │   │
│   │   ├── payments/
│   │   │   ├── page.tsx
│   │   │   ├── invoices/
│   │   │   ├── transactions/
│   │   │   └── sepa/
│   │   │
│   │   ├── analytics/
│   │   │   ├── page.tsx
│   │   │   ├── revenue/
│   │   │   ├── retention/
│   │   │   └── churn/
│   │   │
│   │   ├── marketing/
│   │   │   ├── campaigns/
│   │   │   ├── emails/
│   │   │   └── sms/
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── pos/
│   │   │
│   │   └── settings/
│   │       ├── studio/
│   │       ├── users/
│   │       ├── membership-types/
│   │       └── integrations/
│   │
│   ├── (member-portal)/           # Member-facing routes
│   │   ├── portal/
│   │   │   ├── dashboard/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   └── profile/
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── members/
│   │   ├── classes/
│   │   ├── payments/
│   │   ├── analytics/
│   │   ├── ai/
│   │   └── webhooks/
│   │
│   └── leistungen/fitness-crm/
│       ├── page.tsx               # Landing Page (existing)
│       └── demo/
│           └── page.tsx           # Demo (existing)
│
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── stats-card.tsx
│   │   └── charts/
│   │
│   ├── members/
│   │   ├── member-list.tsx
│   │   ├── member-card.tsx
│   │   ├── member-form.tsx
│   │   ├── member-modal.tsx
│   │   └── filters/
│   │
│   ├── classes/
│   │   ├── class-calendar.tsx
│   │   ├── class-card.tsx
│   │   ├── booking-modal.tsx
│   │   └── waitlist-manager.tsx
│   │
│   ├── payments/
│   │   ├── invoice-list.tsx
│   │   ├── payment-form.tsx
│   │   ├── sepa-mandate-form.tsx
│   │   └── transaction-history.tsx
│   │
│   ├── marketing/
│   │   ├── campaign-builder.tsx
│   │   ├── email-editor.tsx
│   │   └── segment-selector.tsx
│   │
│   └── ui/                        # Shadcn components
│       ├── button.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       ├── table.tsx
│       └── ...
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── middleware.ts
│   │   └── types.ts
│   │
│   ├── api/
│   │   ├── members.ts
│   │   ├── classes.ts
│   │   ├── payments.ts
│   │   └── analytics.ts
│   │
│   ├── payments/
│   │   ├── gocardless.ts
│   │   ├── stripe.ts
│   │   └── invoice-generator.ts
│   │
│   ├── communications/
│   │   ├── email.ts              # Resend
│   │   ├── sms.ts                # Twilio
│   │   └── whatsapp.ts
│   │
│   ├── ai/
│   │   ├── churn-prediction.ts
│   │   ├── recommendations.ts
│   │   └── segmentation.ts
│   │
│   ├── hooks/
│   │   ├── use-members.ts
│   │   ├── use-classes.ts
│   │   ├── use-payments.ts
│   │   └── use-analytics.ts
│   │
│   ├── utils/
│   │   ├── date.ts
│   │   ├── currency.ts
│   │   ├── validation.ts
│   │   └── formatting.ts
│   │
│   └── constants/
│       ├── membership-types.ts
│       ├── payment-methods.ts
│       └── notification-templates.ts
│
├── types/
│   ├── database.ts               # Supabase generated
│   ├── members.ts
│   ├── classes.ts
│   ├── payments.ts
│   └── analytics.ts
│
├── services/                     # Background jobs
│   ├── billing/
│   │   ├── monthly-charges.ts
│   │   └── reminders.ts
│   │
│   ├── notifications/
│   │   ├── class-reminders.ts
│   │   └── booking-confirmations.ts
│   │
│   └── analytics/
│       ├── calculate-churn.ts
│       └── generate-reports.ts
│
├── supabase/
│   ├── migrations/
│   │   ├── 20241012_initial_schema.sql
│   │   ├── 20241013_add_rls_policies.sql
│   │   └── ...
│   │
│   ├── functions/                # Edge Functions
│   │   ├── send-email/
│   │   ├── process-payment/
│   │   └── calculate-churn/
│   │
│   └── seed.sql                  # Demo data
│
├── tests/
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   ├── members.spec.ts
│   │   └── classes.spec.ts
│   │
│   └── unit/
│       ├── utils.test.ts
│       └── hooks.test.ts
│
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   └── INTEGRATIONS.md
│
└── scripts/
    ├── migrate.ts
    ├── seed.ts
    └── generate-types.ts
```

---

## 8. Kritische Integrationen & Vendors

### 8.1 Payment Processing

**SEPA-Lastschrift (Empfehlung: GoCardless)**

**Setup:**
```bash
npm install gocardless-nodejs
```

**Integration:**
```typescript
// lib/payments/gocardless.ts
import { Client } from 'gocardless-nodejs'

const client = new Client({
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  accessToken: process.env.GOCARDLESS_ACCESS_TOKEN!
})

export async function createSepaMandate(customerId: string, accountDetails: {
  iban: string
  accountHolderName: string
}) {
  // 1. Create Customer
  const customer = await client.customers.create({
    email: accountDetails.email,
    given_name: accountDetails.firstName,
    family_name: accountDetails.lastName,
    country_code: 'DE'
  })

  // 2. Create Customer Bank Account
  const bankAccount = await client.customerBankAccounts.create({
    account_holder_name: accountDetails.accountHolderName,
    iban: accountDetails.iban,
    links: {
      customer: customer.id
    }
  })

  // 3. Create Mandate
  const mandate = await client.mandates.create({
    scheme: 'sepa_core',
    links: {
      customer_bank_account: bankAccount.id
    }
  })

  return {
    customerId: customer.id,
    mandateId: mandate.id,
    status: mandate.status
  }
}

export async function createPayment(mandateId: string, amount: number) {
  const payment = await client.payments.create({
    amount: Math.round(amount * 100), // In cents
    currency: 'EUR',
    description: 'Monatliche Mitgliedschaft',
    links: {
      mandate: mandateId
    }
  })

  return payment
}
```

**Webhooks:**
```typescript
// app/api/webhooks/gocardless/route.ts
import { NextRequest } from 'next/server'
import { verifyWebhookSignature } from '@/lib/payments/gocardless'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('webhook-signature')

  if (!verifyWebhookSignature(body, signature)) {
    return new Response('Invalid signature', { status: 401 })
  }

  const event = JSON.parse(body)

  switch (event.resource_type) {
    case 'payments':
      await handlePaymentEvent(event)
      break
    case 'mandates':
      await handleMandateEvent(event)
      break
    // ...
  }

  return new Response('OK', { status: 200 })
}
```

**Kosten:**
- Setup: Kostenlos
- Pro Transaktion: 0.20€ - 1€ + 1-2%
- SEPA-Fehlgeschlagen: 3€

### 8.2 E-Mail Service (Resend)

**Setup:**
```bash
npm install resend
```

**Integration:**
```typescript
// lib/communications/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
  template
}: {
  to: string
  subject: string
  html: string
  template?: string
}) {
  const { data, error } = await resend.emails.send({
    from: 'FitnessPro <noreply@yourdomain.com>',
    to,
    subject,
    html
  })

  if (error) {
    console.error('Email error:', error)
    throw error
  }

  return data
}

// Template Examples
export const templates = {
  bookingConfirmation: (memberName: string, className: string, time: string) => `
    <h1>Buchung bestätigt!</h1>
    <p>Hallo ${memberName},</p>
    <p>Deine Buchung für <strong>${className}</strong> am ${time} wurde bestätigt.</p>
    <p>Wir freuen uns auf dich!</p>
  `,

  paymentReminder: (memberName: string, amount: number, dueDate: string) => `
    <h1>Zahlungserinnerung</h1>
    <p>Hallo ${memberName},</p>
    <p>Deine Zahlung von ${amount}€ ist am ${dueDate} fällig.</p>
    <p>Bitte stelle sicher, dass dein Konto gedeckt ist.</p>
  `
}
```

**Automated Campaigns:**
```typescript
// services/notifications/class-reminders.ts
import { sendEmail, templates } from '@/lib/communications/email'
import { supabase } from '@/lib/supabase/server'

export async function sendClassReminders() {
  // Get all classes starting in 2 hours
  const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000)

  const { data: upcomingClasses } = await supabase
    .from('class_schedules')
    .select(`
      *,
      class_bookings (
        *,
        members (
          *,
          profiles (*)
        )
      )
    `)
    .gte('start_time', new Date().toISOString())
    .lte('start_time', twoHoursFromNow.toISOString())

  for (const classSchedule of upcomingClasses) {
    for (const booking of classSchedule.class_bookings) {
      await sendEmail({
        to: booking.members.profiles.email,
        subject: `Erinnerung: ${classSchedule.class_types.name} in 2 Stunden`,
        html: templates.classReminder(...)
      })
    }
  }
}
```

**Kosten:**
- 3.000 E-Mails/Monat: Kostenlos
- 50.000 E-Mails/Monat: 20€
- 100.000 E-Mails/Monat: 40€

### 8.3 SMS/WhatsApp (Twilio)

**Setup:**
```bash
npm install twilio
```

**Integration:**
```typescript
// lib/communications/sms.ts
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendSMS(to: string, message: string) {
  const result = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  })

  return result
}

export async function sendWhatsApp(to: string, message: string) {
  const result = await client.messages.create({
    body: message,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${to}`
  })

  return result
}
```

**Kosten:**
- SMS (Deutschland): ~0.07€/SMS
- WhatsApp: ~0.005€/Nachricht (günstiger!)

### 8.4 Background Jobs (Inngest)

**Setup:**
```bash
npm install inngest
```

**Integration:**
```typescript
// lib/inngest/client.ts
import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'fitness-crm',
  eventKey: process.env.INNGEST_EVENT_KEY
})

// Define functions
export const monthlyBilling = inngest.createFunction(
  { id: 'monthly-billing' },
  { cron: '0 3 1 * *' }, // 1st of month at 3am
  async ({ event, step }) => {
    // Get all active members
    const members = await step.run('get-members', async () => {
      return await getActiveMembersForBilling()
    })

    // Process payments
    for (const member of members) {
      await step.run(`charge-${member.id}`, async () => {
        return await processMonthlyPayment(member)
      })
    }
  }
)

export const classReminders = inngest.createFunction(
  { id: 'class-reminders' },
  { cron: '0 * * * *' }, // Every hour
  async ({ event, step }) => {
    await step.run('send-reminders', async () => {
      return await sendClassReminders()
    })
  }
)
```

**Kosten:**
- 25.000 Schritte/Monat: Kostenlos
- 500.000 Schritte/Monat: 20€

---

## 9. DSGVO-Compliance Checklist

### Technische Maßnahmen
- [ ] SSL/TLS Verschlüsselung (Let's Encrypt)
- [ ] Database Encryption at Rest (Supabase)
- [ ] Verschlüsselte Backups
- [ ] Row Level Security (RLS)
- [ ] Strong Password Policy (min. 12 Zeichen)
- [ ] 2FA für Admin-Accounts
- [ ] Session-Management (Auto-Logout)
- [ ] Audit-Logging (alle Zugriffe)
- [ ] IP-Whitelisting für Admin-Panel (optional)

### Rechtliche Dokumente
- [ ] Datenschutzerklärung (mit Rechtsanwalt)
- [ ] Nutzungsbedingungen/AGB
- [ ] AVV-Vorlage für Kunden
- [ ] Cookie-Richtlinie
- [ ] Einwilligungstexte
- [ ] Verarbeitungsverzeichnis (Art. 30 DSGVO)

### Betroffenenrechte
- [ ] Auskunftsrecht implementieren
  - Download aller Daten als JSON
  - Lesbare PDF-Version
- [ ] Löschfunktion ("Recht auf Vergessenwerden")
  - Soft-Delete vs. Hard-Delete
  - Aufbewahrungsfristen beachten
- [ ] Berichtigungsfunktion
- [ ] Datenportabilität (Export)
- [ ] Widerspruchsrecht gegen Verarbeitung

### Consent Management
- [ ] Cookie-Banner (mit Opt-in)
- [ ] Marketing Opt-in (Double Opt-in für E-Mail)
- [ ] Einwilligung dokumentieren
- [ ] Widerrufsmöglichkeit
- [ ] Granulare Einstellungen

### Datenschutz by Design
- [ ] Data Minimization (nur nötige Daten)
- [ ] Purpose Limitation (klare Zwecke)
- [ ] Storage Limitation (Löschfristen)
- [ ] Pseudonymisierung wo möglich
- [ ] Access Controls (Least Privilege)

### Subprocessors
- [ ] Supabase (USA/EU) - AVV vorhanden
- [ ] Vercel (USA/EU) - AVV vorhanden
- [ ] GoCardless (UK/EU) - AVV vorhanden
- [ ] Resend (USA/EU) - AVV prüfen
- [ ] Twilio (USA) - AVV + Standard Contractual Clauses

### Data Residency
- [ ] Supabase: EU-Region wählen (Frankfurt)
- [ ] Vercel: EU-Deployment
- [ ] Storage: EU-only
- [ ] Keine Datenübermittlung in Drittländer ohne SCCs

### Incident Response
- [ ] Data Breach Procedure dokumentieren
- [ ] Meldepflicht (72h an Aufsichtsbehörde)
- [ ] Benachrichtigung betroffener Personen
- [ ] Incident-Log führen

### Datenschutzbeauftragter
- [ ] DSB bestellen (ab 20 Personen mit Datenverarbeitung)
- [ ] Kontaktdaten publizieren
- [ ] Dokumentation bereitstellen

---

## 10. Launch-Strategie

### Beta-Phase (2-3 Monate)
1. **Private Beta (4-6 Studios)**
   - Handverlesene Partner
   - Intensive Betreuung
   - Feedback-Schleifen
   - Kostenlos

2. **Public Beta (20-30 Studios)**
   - Bewerbungsprozess
   - 50% Rabatt für 6 Monate
   - Community-Forum
   - Feature-Voting

3. **Soft Launch**
   - Erste zahlende Kunden
   - Content Marketing
   - SEO-Optimierung
   - Case Studies

### Pricing-Modelle

**Empfehlung: Tiered Subscription**

| Plan | Preis/Monat | Features | Zielgruppe |
|------|-------------|----------|------------|
| **Starter** | 99€ | - Bis 100 Mitglieder<br>- Basis CRM<br>- SEPA-Zahlungen<br>- E-Mail Support | Kleine Studios |
| **Professional** | 199€ | - Bis 500 Mitglieder<br>- + Marketing-Tools<br>- + SMS-Notifications<br>- + Analytics<br>- Priority Support | Mittlere Studios |
| **Business** | 399€ | - Bis 2.000 Mitglieder<br>- + AI-Features<br>- + Multi-Location<br>- + WhatsApp<br>- + Dedicated Account Manager | Große Studios/Ketten |
| **Enterprise** | Custom | - Unlimited<br>- + Custom Features<br>- + SLA<br>- + Onboarding | Fitness-Ketten |

**Add-Ons:**
- Mitglieder-App (PWA): +49€/Monat
- SMS-Paket (1000 SMS): +50€
- WhatsApp Business: +99€/Monat
- POS-System Integration: +79€/Monat
- Custom Branding: +149€/Monat

**Setup-Fee:** 299€ (inkl. Onboarding & Training)

### Marketing-Strategie
1. **Content Marketing:**
   - Blog (SEO)
   - Case Studies
   - Webinare
   - YouTube-Tutorials

2. **Partnerships:**
   - Fitness-Verbände
   - Equipment-Hersteller
   - Trainer-Akademien

3. **Events:**
   - Fitness-Messen (FIBO)
   - Workshops
   - Online-Demos

4. **Affiliate-Programm:**
   - 20% Commission für 12 Monate
   - Partner-Dashboard

---

## 11. Nächste Schritte (Action Items)

### Sofort (Diese Woche)
1. [ ] Supabase-Projekt erstellen
2. [ ] Database-Schema implementieren (Core Tables)
3. [ ] RLS-Policies aufsetzen
4. [ ] Authentifizierung testen
5. [ ] Erste Admin-Route bauen

### Kurzfristig (Nächste 2 Wochen)
1. [ ] GoCardless-Account erstellen (Sandbox)
2. [ ] Resend-Account erstellen
3. [ ] Design-System finalisieren (Shadcn UI)
4. [ ] API-Struktur definieren
5. [ ] Erste Mitglieder-CRUD implementieren

### Mittelfristig (Nächster Monat)
1. [ ] MVP fertigstellen
2. [ ] Beta-Testing vorbereiten
3. [ ] Dokumentation schreiben
4. [ ] Pricing finalisieren
5. [ ] Landing-Page optimieren

### Langfristig (Q1 2026)
1. [ ] Beta-Launch
2. [ ] Erste zahlende Kunden
3. [ ] Marketing-Kampagne
4. [ ] Community aufbauen
5. [ ] Phase 2 Features planen

---

## 12. Risiken & Mitigation

### Technische Risiken
| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| Supabase Performance-Issues | Mittel | Hoch | Load-Testing, Caching, CDN |
| SEPA-Integration komplex | Hoch | Kritisch | Sandbox-Testing, Fallback zu Stripe |
| Database-Skalierung | Niedrig | Hoch | Connection Pooling, Indexes |
| Security-Vulnerabilities | Mittel | Kritisch | Regelmäßige Audits, Penetration-Tests |

### Business-Risiken
| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| Langsame Adoption | Mittel | Hoch | Beta-Phase, Content-Marketing |
| Konkurrenz | Hoch | Mittel | Unique Features (AI), Service-Qualität |
| DSGVO-Verstöße | Niedrig | Kritisch | Rechtsberatung, Compliance-Check |
| Churn bei Kunden | Mittel | Hoch | Onboarding, Support, Feature-Requests |

### Mitigation-Strategien
1. **Technisch:**
   - Comprehensive Testing
   - Monitoring & Alerting
   - Disaster Recovery Plan
   - Regular Backups

2. **Business:**
   - Customer Success Team
   - Quarterly Business Reviews
   - Feature-Roadmap transparent
   - Community-Building

---

## 13. Ressourcen & Links

### Dokumentation
- [Supabase Docs](https://supabase.com/docs)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [GoCardless API](https://developer.gocardless.com/api-reference)
- [Resend Docs](https://resend.com/docs)
- [Twilio Docs](https://www.twilio.com/docs)

### DSGVO
- [DSGVO-Gesetz](https://dsgvo-gesetz.de/)
- [Datenschutz.org](https://www.datenschutz.org/)
- [EU GDPR Portal](https://gdpr.eu/)
- [IT-Recht Kanzlei](https://www.it-recht-kanzlei.de/)

### Tools
- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack Table](https://tanstack.com/table)
- [TanStack Query](https://tanstack.com/query)
- [Zod Validation](https://zod.dev/)
- [Inngest](https://www.inngest.com/)

### Inspiration (Competitors)
- [FitogramPro](https://www.fitogrampro.com/)
- [Eversports Manager](https://manager.eversports.com/)
- [Virtuagym](https://virtuagym.com/)
- [Glofox](https://www.glofox.com/)
- [Mindbody](https://www.mindbodyonline.com/)

### Community
- [r/SaaS](https://www.reddit.com/r/SaaS/)
- [Indie Hackers](https://www.indiehackers.com/)
- [Product Hunt](https://www.producthunt.com/)

---

## 14. Fazit & Empfehlungen

### Zusammenfassung
Das aktuelle Demo-System ist eine **hervorragende Grundlage** für das UI/UX-Design, aber es ist **100% Frontend-only** mit Mock-Daten. Die Transformation in ein produktionsreifes System erfordert:

1. **Vollständige Backend-Implementierung** (Supabase)
2. **Zahlreiche Integrationen** (SEPA, E-Mail, SMS)
3. **DSGVO-Compliance von Grund auf**
4. **KI-Features für echten Mehrwert**
5. **6-12 Monate Entwicklungszeit** (realistisch)

### Meine Empfehlungen

**1. Start mit Phase 1 (MVP):**
- Fokus auf Mitgliederverwaltung + SEPA + Kursbuchung
- Keine AI-Features am Anfang
- Einfaches, aber funktionales System
- Target: 3-4 Monate

**2. Beta-Testing ist kritisch:**
- 2-3 echte Studios als Beta-Partner
- Intensive Betreuung
- Iteratives Feedback
- Keine Bezahlung während Beta

**3. DSGVO nicht unterschätzen:**
- Rechtsanwalt konsultieren (Budget: 2.000€-5.000€)
- Datenschutzbeauftragter ab 20 Mitarbeiter
- Dokumentation von Anfang an
- Regelmäßige Audits

**4. Pricing-Strategie:**
- Start mit höheren Preisen (Wert kommunizieren)
- Lieber weniger Kunden gut betreuen
- Jährliche Abrechnung mit Rabatt (2 Monate gratis)
- Setup-Fee ist wichtig (seriöse Kunden)

**5. Technologie-Stack beibehalten:**
- Next.js + Supabase ist solide
- Keine zusätzlichen Frameworks
- Standard-Tools verwenden (bewährt)
- Skalierung später angehen

### Go/No-Go Entscheidung

**GO, wenn:**
- [ ] Budget von 80.000€+ vorhanden
- [ ] 6-12 Monate Zeit eingeplant
- [ ] Team von 2-3 Developern verfügbar
- [ ] Beta-Partner bereits identifiziert
- [ ] DSGVO-Expertise verfügbar
- [ ] Klares Business-Modell

**NO-GO, wenn:**
- [ ] Budget unter 50.000€
- [ ] Erwartung "fertig in 2 Monaten"
- [ ] Ein-Mann-Show (zu komplex)
- [ ] Keine rechtliche Beratung möglich
- [ ] Keine klare Zielgruppe

### Abschließende Worte

Ein **produktionsreifes Fitness-CRM** zu bauen ist ein **substantielles SaaS-Projekt**. Das aktuelle Demo zeigt, dass das Konzept stark ist und der Markt existiert. Mit der richtigen Priorisierung, einem erfahrenen Team und realistischen Erwartungen ist dies **definitiv machbar**.

Der deutsche Fitness-Markt ist groß (ca. 11 Millionen Mitglieder in 9.000 Studios) und viele Studios kämpfen noch mit Excel und Papier-Chaos. Ein modernes, DSGVO-konformes CRM mit AI-Features hat **echtes Potenzial**.

**Start small, iterate fast, deliver value.**

---

**Erstellt von:** Claude (Anthropic)
**Für:** Klein Digital Solutions
**Kontakt:** info@kleindigitalsolutions.de
**Version:** 1.0
**Datum:** 12. Oktober 2025
