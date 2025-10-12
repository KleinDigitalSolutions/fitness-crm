# 🚀 Supabase Setup Anleitung

## Schritt 1: Supabase Dashboard öffnen

1. Gehe zu: **https://supabase.com/dashboard**
2. Melde dich an
3. Wähle dein Projekt aus: `nswqadgfilbrznqflawq`

---

## Schritt 2: SQL Editor öffnen

1. Klicke in der linken Sidebar auf **"SQL Editor"**
2. Klicke oben rechts auf **"New Query"**

---

## Schritt 3: Migration 1 ausführen (Initial Schema)

1. Kopiere den gesamten Inhalt aus der Datei:
   ```
   supabase/migrations/20251012191306_initial_schema.sql
   ```

2. Füge ihn in den SQL Editor ein

3. Klicke auf **"Run"** (oder drücke Cmd/Ctrl + Enter)

4. ✅ Warte auf die Erfolgsmeldung

**Was wird erstellt:**
- `studios` - Dein Fitness Studio
- `profiles` - User Profile
- `membership_types` - Mitgliedschaftstypen (Basic, Premium, Elite)
- `members` - Mitglieder
- `class_types` - Kurstypen (Yoga, HIIT, etc.)
- `class_schedules` - Kursplan
- `payments` - Zahlungen

---

## Schritt 3.5: 🔒 RLS aktivieren (WICHTIG!)

**⚠️ SICHERHEIT:** Ohne diesen Schritt sind deine Daten öffentlich zugänglich!

1. Klicke wieder auf **"New Query"**

2. Kopiere den gesamten Inhalt aus der Datei:
   ```
   supabase/migrations/20251012191307_enable_rls.sql
   ```

3. Füge ihn in den SQL Editor ein

4. Klicke auf **"Run"**

5. ✅ Du solltest sehen: "RLS enabled successfully! policies_created: 19"

**Was passiert:**
- 🔒 Row Level Security (RLS) wird für alle Tabellen aktiviert
- 🛡️ Nur authentifizierte User können auf ihre Daten zugreifen
- 👔 Studio-Besitzer können nur ihre eigenen Studio-Daten sehen
- 🚫 Öffentlicher API-Zugriff wird blockiert

---

## Schritt 4: Demo Users erstellen

### User 1: Demo User

1. Gehe zu **"Authentication"** → **"Users"**
2. Klicke auf **"Add User"** (oben rechts)
3. Fülle das Formular aus:
   - **Email:** `demo@fitnessstudio.de`
   - **Password:** `Demo123!`
   - ✅ **Auto Confirm User** aktivieren
4. Klicke auf **"Create User"**
5. **WICHTIG:** Kopiere die generierte **User ID** (UUID)
   - Beispiel: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
6. Speichere diese ID irgendwo (Notizen, Texteditor)

### User 2: Admin User

1. Klicke wieder auf **"Add User"**
2. Fülle das Formular aus:
   - **Email:** `admin@fitnessstudio.de`
   - **Password:** `Admin123!`
   - ✅ **Auto Confirm User** aktivieren
3. Klicke auf **"Create User"**
4. **WICHTIG:** Kopiere die generierte **User ID** (UUID)
5. Speichere diese ID auch

---

## Schritt 5: Seed Script anpassen

1. Öffne die Datei: `supabase/seed.sql`

2. Suche nach Zeile **~57** und ersetze die UUID:
   ```sql
   -- VORHER:
   '22222222-2222-2222-2222-222222222222', -- Replace with actual demo user UUID

   -- NACHHER (mit deiner kopierten Demo User ID):
   'a1b2c3d4-e5f6-7890-abcd-ef1234567890', -- Demo User ID
   ```

3. Suche nach Zeile **~74** und ersetze die UUID:
   ```sql
   -- VORHER:
   '33333333-3333-3333-3333-333333333333', -- Replace with actual admin user UUID

   -- NACHHER (mit deiner kopierten Admin User ID):
   'b2c3d4e5-f6a7-8901-bcde-fa2345678901', -- Admin User ID
   ```

4. Speichere die Datei

---

## Schritt 6: Seed Script ausführen

1. Gehe zurück zum **SQL Editor** in Supabase
2. Klicke auf **"New Query"**
3. Kopiere den **gesamten Inhalt** aus `supabase/seed.sql` (NACH dem Anpassen!)
4. Füge ihn in den SQL Editor ein
5. Klicke auf **"Run"**
6. ✅ Warte auf die Erfolgsmeldung

**Du solltest sehen:**
```
Demo data created successfully!
studios_count: 1
membership_types_count: 3
members_count: 5
class_types_count: 3
class_schedules_count: 6
payments_count: 6
```

---

## Schritt 7: Testen

1. Starte deinen Development Server:
   ```bash
   npm run dev
   ```

2. Öffne: `http://localhost:3000/login`

3. Melde dich an mit:
   - **Email:** `demo@fitnessstudio.de`
   - **Password:** `Demo123!`

4. Du solltest nun das Dashboard sehen mit:
   - ✅ 5 Mitglieder
   - ✅ Stats und Charts
   - ✅ Kursplan

---

## 🎉 Fertig!

Dein Fitness CRM ist jetzt vollständig eingerichtet!

### Was du jetzt testen kannst:

- ✅ Dashboard mit echten Daten
- ✅ Mitgliederliste
- ✅ Mitglieder-Detailseite
- ✅ Neues Mitglied hinzufügen (UI)
- ✅ Kursplan (noch zu implementieren)
- ✅ Zahlungen (noch zu implementieren)

---

## 🔧 Troubleshooting

### Problem: "relation does not exist"
**Lösung:** Migration 1 wurde nicht korrekt ausgeführt. Wiederhole Schritt 3.

### Problem: "No rows returned"
**Lösung:** Seed Script wurde nicht ausgeführt oder UUIDs stimmen nicht. Prüfe Schritt 6 und 7.

### Problem: Login funktioniert nicht
**Lösung:**
- Prüfe ob "Auto Confirm User" aktiviert war
- Gehe zu Authentication → Users und prüfe ob die User existieren
- Prüfe ob die Email-Bestätigung erforderlich ist (sollte nicht sein)

### Problem: Daten werden nicht angezeigt
**Lösung:**
- Öffne Browser DevTools (F12)
- Gehe zum Console Tab
- Suche nach Fehlern (rot)
- Prüfe ob die Supabase URL und Keys in `.env.local` korrekt sind

---

## 📝 Wichtige Dateien

```
fitness-crm/
├── .env.local                          # Supabase Credentials ✅
├── supabase/
│   ├── migrations/
│   │   ├── 20251012191306_initial_schema.sql  # Migration 1 ✅
│   │   └── 20251012191920_rls_policies.sql    # Migration 2
│   └── seed.sql                        # Demo Daten ✅
├── DEMO_CREDENTIALS.md                 # Login Daten
└── SUPABASE_SETUP.md                   # Diese Datei
```

---

## 🔐 Login Credentials (zur Erinnerung)

### Demo User
```
Email: demo@fitnessstudio.de
Password: Demo123!
```

### Admin User
```
Email: admin@fitnessstudio.de
Password: Admin123!
```

---

## 📞 Nächste Schritte

Nach erfolgreicher Einrichtung kannst du:

1. ✅ Mit dem Dashboard arbeiten
2. ✅ Mitglieder verwalten
3. 🔄 Authentication Server Actions implementieren
4. 🔄 Kursplan-Seite erstellen
5. 🔄 Zahlungs-Seite erstellen
6. 🔄 Analytics implementieren

Viel Erfolg! 🚀
