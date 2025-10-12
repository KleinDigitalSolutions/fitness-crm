# Fitness CRM - Database Schema Diagram

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            MULTI-TENANT ARCHITECTURE                             │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│      STUDIOS         │  (Main Tenant Entity)
├──────────────────────┤
│ id (PK)              │
│ name                 │
│ slug (unique)        │◄─────────────────┐
│ owner_id (FK)        │                  │
│ subscription_plan    │                  │
│ subscription_status  │                  │
│ settings (JSONB)     │                  │
│ created_at           │                  │
└──────────────────────┘                  │
         │                                │
         │                                │
         ▼                                │
┌──────────────────────┐                  │
│     PROFILES         │  (User Extension) │
├──────────────────────┤                  │
│ id (PK, FK to auth)  │                  │
│ studio_id (FK) ──────┼──────────────────┘
│ role                 │  (owner, admin, trainer, member)
│ first_name           │
│ last_name            │
│ avatar_url           │
│ phone                │
│ date_of_birth        │
│ address (JSONB)      │
│ emergency_contact    │
│ health_notes         │
└──────────────────────┘
         │
         │
         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                              MEMBERS ECOSYSTEM                                    │
└──────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│ MEMBERSHIP_TYPES     │         │      MEMBERS         │
├──────────────────────┤         ├──────────────────────┤
│ id (PK)              │◄────────┤ id (PK)              │
│ studio_id (FK)       │         │ studio_id (FK)       │
│ name                 │         │ user_id (FK)         │
│ price_monthly        │         │ member_number        │
│ price_yearly         │         │ membership_type_id   │
│ billing_interval     │         │ status               │
│ features (JSONB)     │         │ contract_start_date  │
│ color                │         │ contract_end_date    │
│ is_active            │         │ sepa_mandate_id      │
└──────────────────────┘         │ payment_method       │
                                 │ credits_balance      │
                                 │ loyalty_points       │
                                 │ loyalty_tier         │
                                 │ notes                │
                                 │ tags (Array)         │
                                 └──────────────────────┘
                                          │
                                          │
                    ┌────────────┬────────┼────────┬─────────────┐
                    │            │        │        │             │
                    ▼            ▼        ▼        ▼             ▼
          ┌──────────────┐ ┌──────────┐ ┌──────────────┐ ┌──────────────┐
          │  CHECK_INS   │ │ INVOICES │ │  PURCHASES   │ │    CHURN     │
          ├──────────────┤ ├──────────┤ ├──────────────┤ │ PREDICTIONS  │
          │ id (PK)      │ │ id (PK)  │ │ id (PK)      │ ├──────────────┤
          │ studio_id    │ │ studio_id│ │ studio_id    │ │ id (PK)      │
          │ member_id    │ │ member_id│ │ member_id    │ │ studio_id    │
          │ check_in_time│ │ invoice# │ │ product_id   │ │ member_id    │
          │ check_out_   │ │ amount   │ │ quantity     │ │ churn_prob   │
          │   time       │ │ status   │ │ unit_price   │ │ risk_level   │
          │ method       │ │ due_date │ │ total_price  │ │ factors      │
          │ (qr/rfid/app)│ │ pdf_url  │ │ payment_     │ │ intervention │
          └──────────────┘ │ items    │ │   method     │ │ churned      │
                           │ (JSONB)  │ │ purchased_at │ │ churn_date   │
                           └──────────┘ └──────────────┘ └──────────────┘
                                 │              │
                                 ▼              │
                           ┌──────────┐         │
                           │ PAYMENTS │         │
                           ├──────────┤         │
                           │ id (PK)  │         │
                           │ studio_id│         │
                           │ member_id│         │
                           │ invoice_id│        │
                           │ amount   │         │
                           │ method   │         │
                           │ (sepa/   │         │
                           │  stripe) │         │
                           │ status   │         │
                           │ provider │         │
                           │ external_│         │
                           │   id     │         │
                           └──────────┘         │
                                                │
                                                ▼
                                          ┌──────────────┐
                                          │   PRODUCTS   │
                                          ├──────────────┤
                                          │ id (PK)      │
                                          │ studio_id    │
                                          │ name         │
                                          │ sku          │
                                          │ category     │
                                          │ price        │
                                          │ cost         │
                                          │ stock_qty    │
                                          │ image_url    │
                                          └──────────────┘


┌──────────────────────────────────────────────────────────────────────────────────┐
│                            CLASSES ECOSYSTEM                                      │
└──────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   CLASS_TYPES        │         │  CLASS_SCHEDULES     │
├──────────────────────┤         ├──────────────────────┤
│ id (PK)              │◄────────┤ id (PK)              │
│ studio_id (FK)       │         │ studio_id (FK)       │
│ name                 │         │ class_type_id (FK)   │
│ (Yoga, HIIT, etc)    │         │ trainer_id (FK)      │
│ description          │         │ room                 │
│ duration_minutes     │         │ start_time           │
│ category             │         │ end_time             │
│ difficulty           │         │ is_recurring         │
│ color                │         │ recurrence_rule      │
│ default_capacity     │         │ (RRULE)              │
│ price                │         │ capacity             │
└──────────────────────┘         │ waitlist_capacity    │
                                 │ status               │
                                 │ (scheduled/          │
                                 │  cancelled/          │
                                 │  completed)          │
                                 └──────────────────────┘
                                          │
                                          │
                                          ▼
                                 ┌──────────────────────┐
                                 │  CLASS_BOOKINGS      │
                                 ├──────────────────────┤
                                 │ id (PK)              │
                                 │ studio_id (FK)       │
                                 │ class_schedule_id    │
                                 │ member_id (FK)       │
                                 │ status               │
                                 │ (confirmed/waitlist/ │
                                 │  cancelled/no_show/  │
                                 │  attended)           │
                                 │ waitlist_position    │
                                 │ booked_at            │
                                 │ cancelled_at         │
                                 │ attended             │
                                 │ attended_at          │
                                 └──────────────────────┘


┌──────────────────────────────────────────────────────────────────────────────────┐
│                         COMMUNICATIONS ECOSYSTEM                                  │
└──────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│  EMAIL_CAMPAIGNS     │         │   NOTIFICATIONS      │
├──────────────────────┤         ├──────────────────────┤
│ id (PK)              │         │ id (PK)              │
│ studio_id (FK)       │         │ studio_id (FK)       │
│ name                 │         │ member_id (FK)       │
│ subject              │         │ type                 │
│ content (HTML)       │         │ (email/sms/push/     │
│ segment_filters      │         │  in_app)             │
│ (JSONB)              │         │ channel              │
│ status               │         │ subject              │
│ (draft/scheduled/    │         │ content              │
│  sending/sent)       │         │ status               │
│ scheduled_at         │         │ (pending/sent/       │
│ sent_at              │         │  delivered/failed)   │
│ recipients_count     │         │ external_message_id  │
│ opened_count         │         │ sent_at              │
│ clicked_count        │         │ delivered_at         │
│ created_by (FK)      │         │ opened_at            │
└──────────────────────┘         │ failed_at            │
                                 │ failure_reason       │
                                 └──────────────────────┘


┌──────────────────────────────────────────────────────────────────────────────────┐
│                            AUDIT & SECURITY                                       │
└──────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│    AUDIT_LOGS        │
├──────────────────────┤
│ id (PK)              │
│ studio_id (FK)       │
│ user_id (FK)         │
│ action               │
│ (create/update/      │
│  delete)             │
│ entity_type          │
│ entity_id            │
│ changes (JSONB)      │
│ (old vs new values)  │
│ ip_address           │
│ user_agent           │
│ created_at           │
└──────────────────────┘


┌──────────────────────────────────────────────────────────────────────────────────┐
│                           ROW LEVEL SECURITY (RLS)                                │
└──────────────────────────────────────────────────────────────────────────────────┘

ALL tables have RLS enabled with policies:
- Studio owners can access ALL data in their studio
- Studio admins can access most data (restricted: payments, settings)
- Trainers can access classes & bookings only
- Members can only access their own data

Example Policy:
  "Studio owners can view all members in their studio"
    ON members FOR SELECT
    USING (studio_id IN (
      SELECT id FROM studios WHERE owner_id = auth.uid()
    ))


┌──────────────────────────────────────────────────────────────────────────────────┐
│                              KEY RELATIONSHIPS                                    │
└──────────────────────────────────────────────────────────────────────────────────┘

1. STUDIOS (1) ────► (N) MEMBERS
2. STUDIOS (1) ────► (N) CLASS_SCHEDULES
3. STUDIOS (1) ────► (N) PRODUCTS
4. STUDIOS (1) ────► (N) EMAIL_CAMPAIGNS

5. MEMBERS (1) ────► (N) CHECK_INS
6. MEMBERS (1) ────► (N) INVOICES
7. MEMBERS (1) ────► (N) PURCHASES
8. MEMBERS (1) ────► (N) CLASS_BOOKINGS
9. MEMBERS (1) ────► (1) CHURN_PREDICTION

10. CLASS_TYPES (1) ────► (N) CLASS_SCHEDULES
11. CLASS_SCHEDULES (1) ────► (N) CLASS_BOOKINGS

12. INVOICES (1) ────► (N) PAYMENTS
13. PRODUCTS (1) ────► (N) PURCHASES


┌──────────────────────────────────────────────────────────────────────────────────┐
│                              INDEXING STRATEGY                                    │
└──────────────────────────────────────────────────────────────────────────────────┘

Critical Indexes:
✓ studios.slug (UNIQUE)
✓ members.studio_id + members.status (Composite)
✓ members.member_number (UNIQUE)
✓ class_schedules.studio_id + class_schedules.start_time
✓ class_bookings.class_schedule_id + class_bookings.member_id (UNIQUE)
✓ invoices.studio_id + invoices.status
✓ payments.external_payment_id
✓ check_ins.member_id + check_ins.check_in_time
✓ audit_logs.created_at (for cleanup jobs)


┌──────────────────────────────────────────────────────────────────────────────────┐
│                           DATA RETENTION POLICY                                   │
└──────────────────────────────────────────────────────────────────────────────────┘

Active Data:
- Members: While active + 3 years after cancellation
- Check-ins: 3 years
- Invoices: 10 years (German tax law)
- Payments: 10 years (German tax law)
- Classes: 2 years
- Notifications: 6 months
- Audit Logs: 2 years

Anonymization:
- Member personal data anonymized after retention period
- Keeping statistical data (aggregated) indefinitely
- GDPR "Right to be forgotten" = immediate hard delete (except legal requirements)


┌──────────────────────────────────────────────────────────────────────────────────┐
│                           BACKUP STRATEGY                                         │
└──────────────────────────────────────────────────────────────────────────────────┘

Supabase Automatic Backups:
- Daily backups (retained 7 days)
- Weekly backups (retained 4 weeks)
- Monthly backups (retained 12 months)

Additional Backups:
- Critical tables exported to S3 daily
- Point-in-time recovery enabled
- RTO: 1 hour
- RPO: 15 minutes


┌──────────────────────────────────────────────────────────────────────────────────┐
│                              PERFORMANCE NOTES                                    │
└──────────────────────────────────────────────────────────────────────────────────┘

Query Optimization:
1. Use Supabase connection pooling (max 15 connections)
2. Implement caching for frequently accessed data (Redis)
3. Use materialized views for complex analytics queries
4. Partition large tables (check_ins, audit_logs) by date
5. Regular VACUUM and ANALYZE

Estimated DB Size:
- Small Studio (100 members): ~500 MB/year
- Medium Studio (500 members): ~2 GB/year
- Large Studio (2000 members): ~8 GB/year


┌──────────────────────────────────────────────────────────────────────────────────┐
│                              MIGRATION STRATEGY                                   │
└──────────────────────────────────────────────────────────────────────────────────┘

Migration Files in: /supabase/migrations/

Naming Convention:
  YYYYMMDD_HHMMSS_description.sql

Example:
  20241012_120000_initial_schema.sql
  20241012_130000_add_rls_policies.sql
  20241013_140000_add_products_table.sql

Each migration should:
- Be idempotent (can run multiple times safely)
- Include rollback instructions (comments)
- Update documentation
- Run tests after applying


Legend:
PK = Primary Key
FK = Foreign Key
(1) ────► (N) = One-to-Many Relationship
(JSONB) = JSON Binary column type
(Array) = PostgreSQL Array column
```

## Summary Statistics

**Total Tables:** 20+
**Total Relationships:** 30+
**Estimated Columns:** 200+
**Data Types Used:**
- UUID (Primary Keys)
- TIMESTAMPTZ (all timestamps)
- TEXT (strings)
- DECIMAL (money)
- INTEGER (counts)
- BOOLEAN (flags)
- JSONB (flexible data)
- TEXT[] (arrays)

**Security Features:**
- Row Level Security (RLS) on all tables
- Multi-Tenant isolation
- Audit logging
- Encrypted at rest
- SSL/TLS in transit

**Scalability:**
- Horizontal scaling via Supabase
- Connection pooling
- Read replicas (Pro plan)
- CDN for static assets
- Caching layer (Redis)

---

**Note:** This schema supports the entire Fitness CRM system from MVP to Enterprise features.
