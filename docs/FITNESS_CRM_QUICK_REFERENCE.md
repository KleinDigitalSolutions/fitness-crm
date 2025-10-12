# Fitness CRM - Quick Reference Card

**Last Updated:** 12. Oktober 2025

---

## Project Overview

| Item | Status |
|------|--------|
| **Current State** | Demo (Mock-Data, Frontend-only) |
| **Target State** | Production-ready SaaS |
| **Timeline** | 6-10 Months |
| **Budget** | 86.000€ - 144.000€ |
| **Team Size** | 2-3 Developers |

---

## Technology Stack

### Core
```
Frontend:    Next.js 15 + React 19 + Tailwind CSS
Backend:     Supabase (PostgreSQL + Auth + Storage)
Deployment:  Vercel
Language:    TypeScript
```

### Key Integrations
```
Payments:    GoCardless (SEPA) + Stripe (Backup)
Email:       Resend
SMS:         Twilio
WhatsApp:    Twilio WhatsApp API
Jobs:        Inngest
Monitoring:  Sentry + Vercel Analytics
```

---

## Database Tables (Core)

```
studios                 → Main tenant entity
├── profiles           → User profiles (extends auth.users)
├── members            → Studio members
│   ├── membership_types
│   ├── check_ins
│   ├── invoices
│   ├── payments
│   ├── purchases
│   └── churn_predictions
├── classes
│   ├── class_types
│   ├── class_schedules
│   └── class_bookings
├── products           → Shop items
├── notifications      → Email/SMS logs
└── audit_logs         → Security audit trail
```

**Total:** 20+ tables with Row Level Security

---

## MVP Features (Phase 1: 10-12 Weeks)

### Must-Have
- [x] Multi-tenant architecture
- [x] Authentication & Authorization
- [x] Member management (CRUD)
- [x] Membership types
- [x] Check-in system
- [x] Class management
- [x] Class booking
- [x] SEPA payments
- [x] Invoice generation
- [x] Basic dashboard

### Phase 2 (6-8 Weeks)
- [ ] Email marketing
- [ ] SMS notifications
- [ ] Retention management
- [ ] Product shop
- [ ] Advanced analytics

### Phase 3 (4-6 Weeks)
- [ ] AI churn prediction
- [ ] Smart recommendations
- [ ] Automated interventions

---

## API Routes Structure

```
/api/
├── auth/           → Login, register, reset
├── members/        → Member CRUD
├── classes/        → Class management
├── payments/       → SEPA, invoices
├── analytics/      → Dashboards, reports
└── webhooks/       → Payment/SMS webhooks
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Payments
GOCARDLESS_ACCESS_TOKEN=xxx
STRIPE_SECRET_KEY=sk_xxx

# Communications
RESEND_API_KEY=re_xxx
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## Quick Commands

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Lint code
npm run test             # Run tests
```

### Supabase
```bash
supabase start           # Start local Supabase
supabase db reset        # Reset local DB
supabase db push         # Push migrations
supabase gen types       # Generate TypeScript types
```

### Database
```bash
# Create migration
supabase migration new my_migration

# Apply migrations
supabase db push --linked

# Rollback
supabase db reset
```

---

## Pricing (SaaS)

| Plan | Price/Mo | Members | Target |
|------|----------|---------|--------|
| Starter | 99€ | ≤ 100 | Small studios |
| Pro | 199€ | ≤ 500 | Medium studios |
| Business | 399€ | ≤ 2,000 | Large studios |
| Enterprise | Custom | Unlimited | Chains |

**Setup Fee:** 299€

---

## Cost Breakdown

### Development
- Phase 1 (MVP): 28k-48k€
- Phase 2 (Advanced): 20k-36k€
- Phase 3 (AI): 15k-24k€
- Legal (DSGVO): 2k-5k€
- **Total:** 86k-144k€

### Monthly Operations
- Infrastructure: 100€-500€
- Payment fees: Variable (€0.20-1.00 per txn)
- Support: As needed

---

## DSGVO Compliance

### Critical Requirements
- [x] Hosting in EU (Supabase Frankfurt)
- [x] SSL/TLS encryption
- [x] Row Level Security
- [ ] Data deletion workflow
- [ ] Consent management
- [ ] Privacy policy
- [ ] Data processing agreement (AVV)
- [ ] Audit logging

### Legal Documents Needed
1. Datenschutzerklärung
2. Nutzungsbedingungen/AGB
3. Cookie-Richtlinie
4. AVV-Vorlagen für Kunden

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Page Load | < 2 seconds |
| API Response | < 500ms (p95) |
| Database Query | < 100ms (p95) |
| Uptime | 99.9% |
| TTFB | < 600ms |

---

## Security Checklist

- [x] HTTPS only
- [x] Environment variables (not in code)
- [x] Row Level Security (RLS)
- [x] SQL injection protection (parameterized queries)
- [x] XSS protection (React escapes by default)
- [x] CSRF protection (SameSite cookies)
- [ ] Rate limiting
- [ ] 2FA for admins
- [ ] Security headers
- [ ] Regular dependency updates
- [ ] Penetration testing

---

## Key Files & Documentation

### Research Documents
```
/FITNESS_CRM_RESEARCH.md              → Full 103-page research
/FITNESS_CRM_EXECUTIVE_SUMMARY.md     → Business overview
/FITNESS_CRM_DATABASE_DIAGRAM.md      → DB schema visual
/FITNESS_CRM_GETTING_STARTED.md       → Implementation checklist
/FITNESS_CRM_QUICK_REFERENCE.md       → This file
```

### Demo Files
```
/app/leistungen/fitness-crm/demo/page.tsx
→ 1,759 lines of Mock UI (Frontend-only)
→ Good for UI inspiration, NOT production code
```

---

## External Services Setup

### 1. Supabase (Database)
- URL: https://supabase.com
- Region: EU (Frankfurt)
- Plan: Pro ($25/mo)
- Setup time: 10 minutes

### 2. GoCardless (SEPA Payments)
- URL: https://gocardless.com
- Cost: €0.20-1.00 per transaction
- Setup time: 1-2 days (verification)

### 3. Resend (Email)
- URL: https://resend.com
- Free: 3,000 emails/month
- Setup time: 30 minutes (domain verification)

### 4. Twilio (SMS/WhatsApp)
- URL: https://twilio.com
- Cost: ~€0.07/SMS
- Setup time: 1 hour

### 5. Vercel (Hosting)
- URL: https://vercel.com
- Plan: Pro ($20/mo)
- Setup time: 5 minutes (connect GitHub)

---

## Support & Resources

### Internal Contacts
- Project Manager: [TBD]
- Lead Developer: [TBD]
- Legal Advisor: [TBD]

### External Support
- Supabase: https://discord.supabase.com
- Next.js: https://discord.gg/nextjs
- GoCardless: support@gocardless.com
- Resend: support@resend.com
- Twilio: support@twilio.com

### Documentation
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- GoCardless API: https://developer.gocardless.com
- Stripe Docs: https://stripe.com/docs

---

## Common Issues & Solutions

### Issue: Supabase RLS not working
```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Verify policies exist
SELECT * FROM pg_policies;
```

### Issue: CORS errors with Supabase
```typescript
// Add to next.config.js
headers: async () => [
  {
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: '*' }
    ]
  }
]
```

### Issue: Payment webhooks not working
```bash
# Test webhooks locally with ngrok
ngrok http 3000
# Then register ngrok URL in GoCardless dashboard
```

### Issue: Slow queries
```sql
-- Check query performance
EXPLAIN ANALYZE SELECT * FROM members WHERE studio_id = 'xxx';

-- Add missing index
CREATE INDEX idx_members_studio_id ON members(studio_id);
```

---

## Testing Strategy

### Unit Tests
- Utilities & helpers
- Validation schemas
- Business logic functions

### Integration Tests
- API routes
- Database operations
- External API calls

### E2E Tests (Playwright)
- Authentication flow
- Member CRUD operations
- Class booking flow
- Payment processing

### Manual Tests
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility (WCAG AA)
- Performance (Lighthouse)

---

## Deployment Workflow

### Development → Staging → Production

```mermaid
dev → PR → staging → manual QA → production
```

### Steps
1. Create feature branch
2. Develop & test locally
3. Create Pull Request
4. Automated CI runs
5. Code review
6. Merge to develop → auto-deploy to staging
7. Manual QA on staging
8. Merge to main → auto-deploy to production

---

## Monitoring & Alerts

### Key Metrics to Monitor
- Error rate (Sentry)
- Response time (Vercel Analytics)
- Database connections (Supabase)
- Payment failures (GoCardless webhooks)
- User signups & churn

### Alert Thresholds
- Error rate > 1%
- Response time > 2s
- DB connections > 80%
- Payment failure rate > 5%

---

## Business KPIs

### User Metrics
- Monthly Active Users (MAU)
- Daily Active Users (DAU)
- Churn Rate
- Activation Rate
- Feature Adoption

### Revenue Metrics
- Monthly Recurring Revenue (MRR)
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)
- Customer Acquisition Cost (CAC)
- LTV:CAC Ratio (target: 3:1)

### Product Metrics
- Time to Value (TTV)
- Feature Usage
- Net Promoter Score (NPS)
- Customer Satisfaction (CSAT)

---

## Milestones & Timeline

| Milestone | Week | Status |
|-----------|------|--------|
| GO/NO-GO Decision | 0 | Pending |
| Setup & Planning | 1-2 | Not Started |
| Auth & Core UI | 3-4 | Not Started |
| Member Management | 5-6 | Not Started |
| Classes & Booking | 7-8 | Not Started |
| Payments & Invoices | 9-10 | Not Started |
| Dashboard & Reports | 11-12 | Not Started |
| **MVP Complete** | **12** | **Target** |
| Beta Testing | 13-14 | Future |
| Phase 2 Features | 15-22 | Future |
| Phase 3 (AI) | 23-26 | Future |
| Production Launch | 27+ | Future |

---

## Emergency Contacts

### System Down
1. Check Vercel Status: https://vercel-status.com
2. Check Supabase Status: https://status.supabase.com
3. Check incident logs: Sentry

### Data Breach
1. Notify Data Protection Officer immediately
2. Document incident (what, when, how)
3. Notify affected users within 72h (GDPR)
4. Report to authorities if required

### Payment Issues
1. Check GoCardless dashboard
2. Review webhook logs
3. Contact GoCardless support
4. Fallback to Stripe if critical

---

## Success Criteria (MVP)

### Technical
- [ ] All core features working
- [ ] 95%+ test coverage
- [ ] No critical bugs
- [ ] Performance targets met
- [ ] Security audit passed

### Business
- [ ] 2-3 beta partners onboarded
- [ ] Positive feedback (4/5 stars)
- [ ] 1 paying customer
- [ ] Clear product-market fit

### Legal
- [ ] DSGVO-compliant
- [ ] All legal docs ready
- [ ] AVV templates prepared

---

## Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| DSGVO Violation | Low | Critical | Legal review, audits |
| Payment Integration Issues | Medium | High | Extensive testing, backup |
| Slow Adoption | Medium | High | Beta testing, marketing |
| Security Breach | Low | Critical | Pen testing, monitoring |
| Budget Overrun | Medium | Medium | Regular tracking, scope control |

---

## Next Actions (Week 0)

1. [ ] **GO/NO-GO meeting** (Stakeholders)
2. [ ] **Budget approval** (Finance)
3. [ ] **Team assignment** (HR/Management)
4. [ ] **Legal consultation** (DSGVO lawyer)
5. [ ] **Beta partners** (Identify 5 potential studios)

**After approval, proceed to:** `/FITNESS_CRM_GETTING_STARTED.md`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-12 | Initial research complete |

---

**Need more details?**
→ See `/FITNESS_CRM_RESEARCH.md` (full documentation)

**Ready to start?**
→ See `/FITNESS_CRM_GETTING_STARTED.md` (step-by-step)

**Questions?**
→ Contact: info@kleindigitalsolutions.de
