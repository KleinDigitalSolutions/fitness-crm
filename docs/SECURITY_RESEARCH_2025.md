# 🔒 Security Research 2025 - Next.js 15 & Supabase

**Projekt:** Fitness CRM
**Recherche-Datum:** 13. Oktober 2025
**Next.js Version:** 15.3.3
**Supabase Version:** Latest

---

## 🚨 KRITISCHE ÄNDERUNG 2025

### ⚠️ Middleware nicht mehr sicher für Authentication!

**CVE-2025-29927:** Next.js Middleware Authorization Bypass Vulnerability

- Betrifft: Next.js < 15.2.3
- **Problem:** Middleware kann umgangen werden
- **Lösung:** Data Access Layer (DAL) Pattern verwenden

**❌ NICHT MEHR EMPFOHLEN:**
```typescript
// middleware.ts - VERALTET & UNSICHER!
export function middleware(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.redirect('/login');
  }
}
```

**✅ NEUE BEST PRACTICE:**
```typescript
// lib/dal.ts - Data Access Layer
export async function verifySession() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

// In jeder geschützten Komponente/Action
const session = await verifySession();
```

---

## 📋 NEUE SICHERHEITS-ARCHITEKTUR 2025

### 1. **Data Access Layer (DAL)** - PFLICHT!

**Zweck:** Zentralisiert alle Datenabfragen und Auth-Checks

**Struktur:**
```
/lib
  /dal
    ├── index.ts           # Main DAL exports
    ├── auth.ts            # Auth verification
    ├── members.ts         # Member data access
    ├── payments.ts        # Payment data access
    └── studios.ts         # Studio data access
```

**Vorteile:**
- ✅ Sicherheit: Auth-Checks an einer Stelle
- ✅ Testbar: Einfach zu mocken
- ✅ Wartbar: DRY Prinzip
- ✅ DTOs: Kontrollierte Datenrückgabe

**Implementierung:**
```typescript
// lib/dal/auth.ts
import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';
import { redirect } from 'next/navigation';

export const verifySession = cache(async () => {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (!session || error) {
    redirect('/login');
  }

  return { userId: session.user.id, email: session.user.email };
});

// lib/dal/members.ts
import { verifySession } from './auth';

export async function getMembers() {
  const session = await verifySession(); // Auth check!
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('members')
    .select('id, first_name, last_name, status')
    .eq('studio_id', session.studioId);

  if (error) throw error;

  // Return DTO (not full object!)
  return data.map(m => ({
    id: m.id,
    name: `${m.first_name} ${m.last_name}`,
    status: m.status
  }));
}
```

---

### 2. **Multi-Layer Security** - Defense in Depth

**Schutz auf 4 Ebenen:**

```typescript
// EBENE 1: Data Access Layer
export async function getPayments() {
  await verifySession(); // ✓ Auth check
  // ... fetch data
}

// EBENE 2: Server Actions
export async function createMember(formData: FormData) {
  await verifySession(); // ✓ Auth check

  // ✓ Input validation
  const validated = memberSchema.parse({
    name: formData.get('name'),
    email: formData.get('email')
  });

  // ✓ Authorization (role check)
  if (!user.isAdmin) {
    throw new Error('Unauthorized');
  }

  // ... save data
}

// EBENE 3: Page Component
export default async function MembersPage() {
  await verifySession(); // ✓ Auth check
  const members = await getMembers();
  return <MembersList members={members} />;
}

// EBENE 4: UI Component
export function DeleteButton({ canDelete }: { canDelete: boolean }) {
  if (!canDelete) return null; // ✓ Hide if not authorized
  return <button>Delete</button>;
}
```

---

### 3. **CSRF Protection**

**✅ Next.js Server Actions:** Built-in CSRF Protection!

**Wie es funktioniert:**
- Server Actions verwenden nur POST
- Next.js vergleicht `Origin` Header mit `Host` Header
- Bei Mismatch → Request abgelehnt
- Server Actions können nur vom selben Host aufgerufen werden

**Zusätzlicher Schutz (optional):**
```bash
npm install @edge-csrf/nextjs
```

```typescript
// middleware.ts
import { createCsrfProtect } from '@edge-csrf/nextjs';

const csrfProtect = createCsrfProtect({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  await csrfProtect(request, response);
  return response;
}
```

**⚠️ Wichtig:** Nur für Custom Route Handlers nötig, nicht für Server Actions!

---

### 4. **Rate Limiting**

**Supabase Auth:** Built-in Rate Limiting ✅
- Signup: 30 requests / hour
- Login: 30 requests / hour
- Password Reset: 30 requests / hour

**Custom Rate Limiting (für API Routes):**

```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

const ratelimit = new LRUCache({
  max: 500,
  ttl: 60000, // 1 minute
});

export function rateLimitCheck(identifier: string, limit: number) {
  const tokenCount = (ratelimit.get(identifier) as number) || 0;

  if (tokenCount >= limit) {
    return { success: false };
  }

  ratelimit.set(identifier, tokenCount + 1);
  return { success: true };
}

// In API Route oder Server Action
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = rateLimitCheck(ip, 10); // 10 requests/minute

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }

  // ... handle request
}
```

**Production:** Redis verwenden statt LRU Cache!

```bash
npm install @upstash/redis @upstash/ratelimit
```

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

---

### 5. **Security Headers**

**Next.js Config:**

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

**Content Security Policy (CSP):**

```typescript
// middleware.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
  return response;
}
```

---

### 6. **Input Validation & Sanitization**

**Zod für Validation:**

```typescript
import { z } from 'zod';

const memberSchema = z.object({
  firstName: z.string().min(2).max(50).trim(),
  lastName: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  dateOfBirth: z.coerce.date().max(new Date()),
});

export async function createMember(formData: FormData) {
  // ✓ Validation
  const validated = memberSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    dateOfBirth: formData.get('dateOfBirth'),
  });

  if (!validated.success) {
    return { error: validated.error.flatten() };
  }

  // ✓ Sanitized data
  const data = validated.data;

  // ... save to database
}
```

**HTML Sanitization:**

```bash
npm install dompurify isomorphic-dompurify
```

```typescript
import DOMPurify from 'isomorphic-dompurify';

const sanitized = DOMPurify.sanitize(userInput);
```

---

### 7. **Session Management**

**Supabase Best Practices:**

```typescript
// lib/supabase/server.ts - Already implemented ✅
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
      },
    }
  );
}
```

**Cookie Settings:**
- ✅ `httpOnly: true` - Verhindert XSS
- ✅ `secure: true` - Nur über HTTPS
- ✅ `sameSite: 'lax'` - CSRF Schutz
- ✅ Encrypted Session ID

---

### 8. **Row Level Security (RLS)**

**Already Implemented! ✅**

**Best Practices:**
- ✅ RLS für ALLE Tabellen aktiviert
- ✅ Policies basierend auf `auth.uid()`
- ✅ Studio-Isolation durch `studio_id`
- ✅ Member sieht nur eigene Daten

**Verbesserung - Studio Owner Check:**

```sql
-- Add owner_id to studios table for RLS
ALTER TABLE studios ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);

-- Update existing studio with demo user as owner
UPDATE studios
SET owner_id = 'd14fccd5-8139-437e-9b48-947b3cccffc4'
WHERE id = '11111111-1111-1111-1111-111111111111';
```

---

### 9. **Environment Variables**

**Already Secure! ✅**

**Best Practices:**
```bash
# .env.local (not in git)
NEXT_PUBLIC_SUPABASE_URL=xxx     # Public
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx # Public (has RLS)
SUPABASE_SERVICE_ROLE_KEY=xxx    # SECRET! Never expose!

# Additional
DATABASE_URL=xxx                  # SECRET
RESEND_API_KEY=xxx               # SECRET
STRIPE_SECRET_KEY=xxx            # SECRET
```

**Vercel:** Environment Variables über Dashboard setzen

---

### 10. **Error Handling & Logging**

**Sentry Integration:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,

  // Don't log sensitive data
  beforeSend(event, hint) {
    // Remove sensitive information
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
```

**Custom Error Logging:**

```typescript
// lib/logger.ts
export function logError(error: Error, context?: any) {
  // Never log sensitive data!
  const sanitized = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    // NO: passwords, tokens, personal data
  };

  if (process.env.NODE_ENV === 'production') {
    // Send to monitoring service
    Sentry.captureException(error, { extra: sanitized });
  } else {
    console.error('Error:', sanitized);
  }
}
```

---

## 🎯 IMPLEMENTIERUNGS-PRIORITÄTEN

### 🔴 KRITISCH (Sofort implementieren)

1. **Data Access Layer (DAL)**
   - Zentralisiert Auth-Checks
   - Verhindert direkten DB-Zugriff
   - Ersetzt unsichere Middleware

2. **Studio Owner Assignment**
   - `owner_id` zu Studios Tabelle
   - RLS Policies updaten

3. **Input Validation**
   - Zod Schemas für alle Forms
   - Server-side Validation in allen Actions

### 🟡 WICHTIG (Nächste Woche)

4. **Security Headers**
   - CSP implementieren
   - next.config.js updaten

5. **Rate Limiting**
   - Login/Register schützen
   - API Routes limitieren

6. **Error Tracking**
   - Sentry einrichten
   - Error Boundaries

### 🟢 NICE-TO-HAVE (Später)

7. **CSRF Token** (optional, Server Actions haben built-in)
8. **2FA** (für Admin Accounts)
9. **Audit Logging** (wer hat was wann geändert)

---

## ✅ BEREITS IMPLEMENTIERT

- ✅ **Row Level Security (RLS)** - Alle Tabellen geschützt
- ✅ **Supabase Auth** - Cookie-based, secure
- ✅ **Environment Variables** - Nicht in Git
- ✅ **HTTPS** - Erzwungen über Vercel
- ✅ **TypeScript** - Type Safety
- ✅ **Next.js Server Actions** - CSRF protected

---

## 📊 KANN ICH DAS PROGRAMMIEREN?

### ✅ JA - Kann ich sofort implementieren:

1. **Data Access Layer (DAL)** ✅
   - Pure TypeScript
   - Pattern ist klar dokumentiert
   - Keine externen Dependencies

2. **Security Headers** ✅
   - next.config.js Konfiguration
   - Standard HTTP Headers

3. **Input Validation** ✅
   - Zod ist schon installiert
   - Einfache Schema-Definition

4. **Rate Limiting (Basic)** ✅
   - LRU Cache für Development
   - Einfache Implementierung

5. **Studio Owner Assignment** ✅
   - Simple SQL Migration
   - RLS Policy Update

### ⚠️ TEILWEISE - Brauche externe Services:

6. **Rate Limiting (Production)** ⚠️
   - Benötigt: Upstash Redis Account
   - Alternative: Vercel Rate Limiting

7. **Sentry Error Tracking** ⚠️
   - Benötigt: Sentry Account (Free tier OK)
   - Setup in 5 Minuten

### ❌ BRAUCHT REVIEW:

8. **DSGVO Compliance** ❌
   - Rechtsanwalt konsultieren
   - Data Export/Delete Funktionen

9. **Security Audit** ❌
   - Externe Security Firma
   - Vor Production-Launch

---

## 🚀 EMPFOHLENE REIHENFOLGE

### Phase 1: Basis Security (JETZT - 2-3 Stunden)
```bash
1. Data Access Layer erstellen
2. Studio owner_id hinzufügen
3. Security Headers konfigurieren
4. Input Validation für bestehende Forms
```

### Phase 2: Advanced (Diese Woche - 3-4 Stunden)
```bash
5. Rate Limiting (LRU Cache)
6. Error Boundaries
7. Sentry Setup
8. Audit Logging (basis)
```

### Phase 3: Production Ready (Vor Launch - 1 Tag)
```bash
9. Rate Limiting auf Redis umstellen
10. DSGVO Compliance Features
11. Security Audit
12. Penetration Testing
```

---

## 📚 QUELLEN

- Next.js Security Guide: https://nextjs.org/docs/app/guides/data-security
- CVE-2025-29927: https://securitylabs.datadoghq.com/articles/nextjs-middleware-auth-bypass/
- Modern Auth Best Practices: https://www.franciscomoretti.com/blog/modern-nextjs-authentication-best-practices
- Supabase Rate Limits: https://supabase.com/docs/guides/auth/rate-limits

---

**Fazit:**
✅ Die meisten kritischen Sicherheitsmaßnahmen kann ich sofort implementieren!
⚠️ Einige benötigen externe Services (aber alles machbar)
❌ DSGVO & Security Audit müssen extern gemacht werden

**Nächster Schritt:** Data Access Layer implementieren? 🚀
