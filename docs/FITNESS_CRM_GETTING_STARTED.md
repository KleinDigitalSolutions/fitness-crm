# Fitness CRM - Getting Started Checklist

**Projekt:** Klein Digital Solutions - Fitness CRM
**Status:** Research Phase abgeschlossen
**Nächster Schritt:** GO/NO-GO Entscheidung

---

## Phase 0: Entscheidung & Vorbereitung (Woche 0)

### Business-Entscheidung
- [ ] **GO/NO-GO Decision Meeting** durchführen
- [ ] Budget freigeben (86.000€ - 144.000€)
- [ ] Timeline commitment (6-10 Monate)
- [ ] Stakeholder-Alignment

### Team-Aufbau
- [ ] **Senior Full-Stack Developer** rekrutieren/zuweisen
- [ ] **Frontend Developer** rekrutieren (React/Next.js Expertise)
- [ ] **Backend/DevOps** Resource sichern (0.5 FTE)
- [ ] **UI/UX Designer** beauftragen (0.5 FTE)
- [ ] **Project Manager** zuweisen
- [ ] Weekly Stand-ups planen (jeden Montag 10:00)

### Legal & Compliance
- [ ] **Rechtsanwalt** kontaktieren (DSGVO-Spezialist)
  - Budget: 2.000€ - 5.000€
  - Aufgaben: Datenschutzerklärung, AGB, AVV-Vorlagen
- [ ] **Datenschutzbeauftragter** identifizieren (intern oder extern)
- [ ] DSGVO-Kick-off Meeting planen

### Partner-Identifikation
- [ ] **2-3 Beta-Partner Studios** identifizieren
  - Kriterien: < 200 Mitglieder, technikaffin, gutes Feedback
- [ ] Erste Gespräche führen
- [ ] Beta-Agreement vorbereiten (kostenlos für 3 Monate)

---

## Phase 1A: Technical Setup (Woche 1)

### Supabase Setup
- [ ] **Supabase-Projekt erstellen**
  ```bash
  # Via Supabase Dashboard
  - Region: EU (Frankfurt)
  - Plan: Pro ($25/month)
  ```
- [ ] Supabase CLI installieren
  ```bash
  npm install -g supabase
  supabase login
  ```
- [ ] Local Supabase initialisieren
  ```bash
  cd kleindigitalsolutionsneu
  supabase init
  ```
- [ ] .env.local erstellen:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
  SUPABASE_SERVICE_ROLE_KEY=xxx
  ```

### Database Schema
- [ ] Initial Migration erstellen
  ```bash
  supabase migration new initial_schema
  ```
- [ ] Core Tables implementieren (siehe FITNESS_CRM_DATABASE_DIAGRAM.md):
  - [ ] studios
  - [ ] profiles
  - [ ] membership_types
  - [ ] members
  - [ ] class_types
  - [ ] class_schedules
- [ ] Migration testen (local)
  ```bash
  supabase db reset
  supabase db push
  ```
- [ ] Migration auf Production deployen
  ```bash
  supabase db push --linked
  ```

### Row Level Security (RLS)
- [ ] RLS für alle Tables aktivieren
  ```sql
  ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
  ALTER TABLE members ENABLE ROW LEVEL SECURITY;
  -- etc.
  ```
- [ ] Basic Policies erstellen:
  - [ ] Studio-Owner Policies
  - [ ] Member self-access Policies
  - [ ] Trainer Policies
- [ ] RLS testen mit verschiedenen Rollen

### Authentication Setup
- [ ] Supabase Auth konfigurieren:
  - [ ] Email/Password aktivieren
  - [ ] Magic Links aktivieren
  - [ ] Redirect URLs setzen
  - [ ] Email Templates anpassen
- [ ] Auth Middleware erstellen
  ```typescript
  // middleware.ts
  export { default } from '@/lib/supabase/middleware'
  ```
- [ ] Protected Routes definieren:
  ```typescript
  export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*']
  }
  ```

---

## Phase 1B: Core Development Setup (Woche 1)

### Project Structure
- [ ] Neue Ordnerstruktur anlegen:
  ```bash
  mkdir -p app/\(dashboard\)/{members,classes,payments,analytics,settings}
  mkdir -p components/{dashboard,members,classes,payments,ui}
  mkdir -p lib/{supabase,api,hooks,utils}
  mkdir -p types
  mkdir -p services
  ```

### UI Components (Shadcn)
- [ ] Shadcn UI installieren
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Core Components installieren:
  ```bash
  npx shadcn-ui@latest add button
  npx shadcn-ui@latest add input
  npx shadcn-ui@latest add dialog
  npx shadcn-ui@latest add table
  npx shadcn-ui@latest add form
  npx shadcn-ui@latest add select
  npx shadcn-ui@latest add calendar
  npx shadcn-ui@latest add toast
  ```

### State Management
- [ ] TanStack Query installieren
  ```bash
  npm install @tanstack/react-query
  ```
- [ ] Query Client Provider einrichten
  ```typescript
  // app/providers.tsx
  'use client'
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
  ```

### Form Handling
- [ ] React Hook Form + Zod installieren
  ```bash
  npm install react-hook-form @hookform/resolvers zod
  ```
- [ ] Form-Template erstellen:
  ```typescript
  // components/forms/member-form.tsx
  const formSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    // ...
  })
  ```

### Dashboard Layout
- [ ] Basis Dashboard-Layout erstellen
  - [ ] Sidebar Component
  - [ ] Header Component
  - [ ] Navigation Component
  - [ ] Breadcrumbs
- [ ] Responsive Design testen (Mobile, Tablet, Desktop)

---

## Phase 1C: Payment Integration Setup (Woche 1-2)

### GoCardless Setup
- [ ] **GoCardless-Account erstellen**
  - URL: https://gocardless.com
  - Plan: Pay-as-you-go
- [ ] Sandbox-Access aktivieren
- [ ] API-Keys generieren (Sandbox)
  ```env
  GOCARDLESS_ACCESS_TOKEN=sandbox_xxx
  GOCARDLESS_WEBHOOK_SECRET=xxx
  ```
- [ ] GoCardless SDK installieren
  ```bash
  npm install gocardless-nodejs
  ```
- [ ] Test-Mandat erstellen (in Sandbox)
- [ ] Test-Payment durchführen

### Stripe Setup (Backup)
- [ ] **Stripe-Account erstellen**
  - URL: https://stripe.com
- [ ] Test-Mode aktivieren
- [ ] API-Keys generieren
  ```env
  STRIPE_PUBLISHABLE_KEY=pk_test_xxx
  STRIPE_SECRET_KEY=sk_test_xxx
  STRIPE_WEBHOOK_SECRET=whsec_xxx
  ```
- [ ] Stripe SDK installieren
  ```bash
  npm install stripe @stripe/stripe-js
  ```

### Webhooks Setup
- [ ] Webhook-Endpunkt erstellen
  ```typescript
  // app/api/webhooks/gocardless/route.ts
  export async function POST(req: Request) {
    // Verify signature
    // Process webhook
  }
  ```
- [ ] Webhook in GoCardless registrieren
- [ ] Webhook-Testing mit ngrok:
  ```bash
  ngrok http 3000
  ```

---

## Phase 1D: Communication Services Setup (Woche 2)

### Resend (E-Mail)
- [ ] **Resend-Account erstellen**
  - URL: https://resend.com
  - Plan: Free (3.000 emails/month)
- [ ] Domain verifizieren
  - DNS Records (SPF, DKIM) eintragen
- [ ] API-Key generieren
  ```env
  RESEND_API_KEY=re_xxx
  ```
- [ ] Resend SDK installieren
  ```bash
  npm install resend
  ```
- [ ] Test-Email senden
  ```typescript
  await resend.emails.send({
    from: 'test@yourdomain.com',
    to: 'your-email@example.com',
    subject: 'Test',
    html: '<p>Test</p>'
  })
  ```
- [ ] Email-Templates erstellen:
  - [ ] Welcome Email
  - [ ] Booking Confirmation
  - [ ] Payment Reminder
  - [ ] Password Reset

### Twilio (SMS/WhatsApp)
- [ ] **Twilio-Account erstellen**
  - URL: https://twilio.com
  - Trial-Account für Testing
- [ ] Phone Number kaufen (Deutschland: +49)
- [ ] API-Credentials generieren
  ```env
  TWILIO_ACCOUNT_SID=ACxxx
  TWILIO_AUTH_TOKEN=xxx
  TWILIO_PHONE_NUMBER=+49xxx
  ```
- [ ] Twilio SDK installieren
  ```bash
  npm install twilio
  ```
- [ ] Test-SMS senden
- [ ] WhatsApp Business API beantragen (später)

---

## Phase 1E: Development Environment (Woche 2)

### Version Control
- [ ] Git-Branch-Strategie festlegen
  ```
  main (production)
  └── develop (staging)
      ├── feature/auth
      ├── feature/members
      └── feature/classes
  ```
- [ ] Protected Branches einrichten (main, develop)
- [ ] Pull Request Template erstellen

### CI/CD Pipeline
- [ ] GitHub Actions einrichten
  ```yaml
  # .github/workflows/ci.yml
  name: CI
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - run: npm install
        - run: npm run build
        - run: npm run lint
  ```
- [ ] Automated Tests einrichten (später)

### Environments
- [ ] **Development:** Localhost
  - Supabase Local
  - Mock Payments
- [ ] **Staging:** Vercel Preview
  - Supabase Dev Instance
  - Sandbox Payments
- [ ] **Production:** Vercel Production
  - Supabase Production
  - Live Payments

### Monitoring Setup
- [ ] **Sentry** für Error Tracking
  ```bash
  npm install @sentry/nextjs
  npx @sentry/wizard@latest -i nextjs
  ```
  ```env
  SENTRY_DSN=https://xxx@sentry.io/xxx
  ```
- [ ] **Vercel Analytics** aktivieren
  ```bash
  npm install @vercel/analytics
  ```

---

## Phase 1F: First Features (Woche 3-4)

### Authentication UI
- [ ] Login Page
  - [ ] Email/Password Form
  - [ ] Magic Link Option
  - [ ] Error Handling
  - [ ] Loading States
- [ ] Register Page
  - [ ] Studio-Onboarding Flow
  - [ ] User Registration
  - [ ] Email Verification
- [ ] Password Reset Flow
- [ ] Auth Middleware Testing

### Studio Setup
- [ ] Studio-Onboarding Wizard:
  1. [ ] Basis-Infos (Name, Adresse)
  2. [ ] Kontakt-Daten
  3. [ ] Membership-Types erstellen
  4. [ ] First Admin-User
- [ ] Studio-Settings Page
- [ ] Logo-Upload (Supabase Storage)

### Members Management (Basic)
- [ ] Members List Page
  - [ ] Table mit Pagination
  - [ ] Search-Funktion
  - [ ] Filter (Status, Type)
  - [ ] Sort-Funktionen
- [ ] Member Detail Page
  - [ ] Profile-Informationen
  - [ ] Contract Details
  - [ ] Payment History (stub)
- [ ] New Member Form
  - [ ] Multi-Step Form
  - [ ] Validation
  - [ ] Image Upload
- [ ] Edit Member Form
- [ ] Member CRUD API Routes

### Dashboard (Basic)
- [ ] Dashboard Layout
- [ ] KPI Cards:
  - [ ] Total Members (live data!)
  - [ ] Active Members
  - [ ] Monthly Revenue (stub)
  - [ ] Classes This Week (stub)
- [ ] Member Growth Chart (Recharts)
- [ ] Recent Activity Feed

---

## Phase 1G: Testing & Documentation (Woche 3-4)

### Testing Setup
- [ ] Playwright installieren
  ```bash
  npm init playwright@latest
  ```
- [ ] First E2E Tests:
  - [ ] Auth Flow Test
  - [ ] Member CRUD Test
  - [ ] Dashboard Loading Test
- [ ] Test-Datenbank (separate Supabase project)

### Documentation
- [ ] API-Dokumentation starten:
  - [ ] `/api/members` Endpoints
  - [ ] `/api/auth` Endpoints
- [ ] Component-Dokumentation (Storybook - optional)
- [ ] README.md für Developers
  - Setup Instructions
  - Environment Variables
  - Development Workflow

### Code Quality
- [ ] ESLint konfigurieren
  ```bash
  npm run lint
  ```
- [ ] Prettier konfigurieren
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "es5"
  }
  ```
- [ ] Pre-commit Hooks (Husky)
  ```bash
  npm install -D husky lint-staged
  npx husky init
  ```

---

## Phase 1H: Beta Preparation (Woche 5-6)

### Beta-Environment
- [ ] Staging-Environment deployen (Vercel)
- [ ] Beta-Domain einrichten (beta.yourdomain.com)
- [ ] Beta-Datenbank (separate Supabase project)
- [ ] Beta-User-Accounts erstellen

### Demo-Daten
- [ ] Seed-Script schreiben:
  ```typescript
  // scripts/seed.ts
  // Generate realistic demo data
  ```
- [ ] Demo-Studio erstellen
- [ ] 20-30 Demo-Members generieren
- [ ] Demo-Classes generieren

### User-Onboarding
- [ ] Onboarding-Tutorial erstellen
  - Welcome Screen
  - Key Features Tour
  - Setup Checklist
- [ ] Help-Center (FAQ) - basic
- [ ] Video-Tutorials aufnehmen (Loom)

### Feedback-System
- [ ] Feedback-Button in UI
- [ ] Feedback-Form
- [ ] Feedback-Dashboard (Admin)
- [ ] Weekly Beta-Sync Meeting planen

---

## Critical Path & Dependencies

### Week 1 Dependencies
```
Supabase Setup
    ↓
Database Schema
    ↓
Authentication
    ↓
Protected Routes
```

### Week 2 Dependencies
```
Payment Setup (parallel)
Communication Setup (parallel)
    ↓
Webhook Integration
```

### Week 3-4 Dependencies
```
Auth UI
    ↓
Studio Setup
    ↓
Members CRUD
    ↓
Dashboard
```

---

## Risk Mitigation

### High-Risk Items (Address Immediately)
1. **DSGVO Compliance**
   - Risk: Legal issues, fines
   - Mitigation: Lawyer consultation in Week 1
   - Owner: Project Manager

2. **SEPA Integration Complexity**
   - Risk: Payment failures, lost revenue
   - Mitigation: Extensive sandbox testing, Stripe backup
   - Owner: Backend Developer

3. **Beta-Partner Dropout**
   - Risk: No real-world feedback
   - Mitigation: Identify 5 partners, expect 2-3 to stay
   - Owner: Project Manager

### Medium-Risk Items (Monitor)
1. **Performance Issues**
   - Mitigation: Load testing from Day 1
2. **Scope Creep**
   - Mitigation: Strict MVP definition, feature backlog
3. **Team Availability**
   - Mitigation: Clear commitments, backup resources

---

## Success Metrics (MVP)

### Technical Metrics
- [ ] All tests passing (95%+ coverage)
- [ ] Page load < 2 seconds
- [ ] API response < 500ms (p95)
- [ ] Zero critical security vulnerabilities
- [ ] DSGVO-compliant (audit passed)

### Business Metrics
- [ ] 2-3 Beta-partners onboarded
- [ ] 80%+ feature completion (MVP scope)
- [ ] < 5 critical bugs in production
- [ ] Positive feedback score (4/5 stars)
- [ ] 1 paying customer (proof-of-concept)

### User Experience Metrics
- [ ] < 10 minutes onboarding time
- [ ] < 5 clicks to create member
- [ ] Mobile-responsive (100% features)
- [ ] Accessibility score > 90 (Lighthouse)

---

## Weekly Cadence

### Monday
- Stand-up Meeting (10:00 - 10:30)
- Sprint Planning (wenn applicable)

### Wednesday
- Mid-week Check-in (15:00 - 15:30)
- Blocker-Resolution

### Friday
- Demo-Session (internal) (14:00 - 15:00)
- Retro & Planning (15:00 - 16:00)

### Daily
- Async Updates (Slack/Discord)
- Code Reviews (within 4 hours)

---

## Budget Tracking

### Initial Costs (Month 1)
| Item | Cost |
|------|------|
| Supabase Pro | 25€ |
| Vercel Pro | 20€ |
| Legal Consultation | 2.000€ |
| Domain | 15€ |
| Tools (Figma, etc.) | 50€ |
| **Total** | **2.110€** |

### Ongoing Monthly Costs
| Item | Cost |
|------|------|
| Supabase | 25€-100€ |
| Vercel | 20€-50€ |
| Resend | 0€-20€ |
| Twilio | 10€-50€ |
| Sentry | 0€-26€ |
| **Total** | **55€-246€** |

---

## Go-Live Checklist (End of Phase 1)

### Technical
- [ ] All MVP features implemented
- [ ] Tests passing
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] Monitoring & alerting active

### Legal
- [ ] DSGVO audit passed
- [ ] Datenschutzerklärung published
- [ ] AGB finalized
- [ ] AVV-templates ready

### Business
- [ ] Beta-partners happy
- [ ] Pricing finalized
- [ ] Marketing materials ready
- [ ] Support-process defined

### Operations
- [ ] Backup & recovery tested
- [ ] Incident response plan
- [ ] Escalation paths defined
- [ ] Documentation complete

---

## Next Steps After This Checklist

1. **Phase 2: Advanced Features** (6-8 weeks)
   - Marketing automation
   - Advanced analytics
   - Shop integration

2. **Phase 3: AI & ML** (4-6 weeks)
   - Churn prediction
   - Smart recommendations

3. **Phase 4: Scale** (4-6 weeks)
   - Multi-location
   - Member app (PWA)
   - Enterprise features

---

## Support & Resources

### Internal
- Project Manager: [name]
- Lead Developer: [name]
- Legal Advisor: [name]

### External
- Supabase Discord: https://discord.supabase.com
- Next.js Discord: https://discord.gg/nextjs
- GoCardless Support: support@gocardless.com

### Documentation
- Main Research: `/FITNESS_CRM_RESEARCH.md`
- Database Schema: `/FITNESS_CRM_DATABASE_DIAGRAM.md`
- Executive Summary: `/FITNESS_CRM_EXECUTIVE_SUMMARY.md`

---

**Last Updated:** 12. Oktober 2025
**Version:** 1.0
**Next Review:** Start of Phase 1

**Good luck! Let's build something amazing! 🚀**
