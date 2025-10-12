# Demo User Login Credentials

## Quick Access

### Demo User (Member & Studio Admin)
- **Email:** `demo@fitnessstudio.de`
- **Password:** `Demo123!`
- **Role:** Studio Admin
- **Access:** Full dashboard access with demo member data

### Admin User (Studio Manager)
- **Email:** `admin@fitnessstudio.de`
- **Password:** `Admin123!`
- **Role:** Studio Admin
- **Access:** Full administrative access

---

## Setup Instructions

### 1. Create Auth Users in Supabase Dashboard

Before running the seed script, you need to manually create the users in Supabase:

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Add User"**
4. Create the first user:
   - Email: `demo@fitnessstudio.de`
   - Password: `Demo123!`
   - Auto Confirm User: ✅ (checked)
5. Copy the generated `user_id` (UUID)
6. Repeat for the second user:
   - Email: `admin@fitnessstudio.de`
   - Password: `Admin123!`
   - Auto Confirm User: ✅ (checked)
7. Copy the generated `user_id` (UUID)

### 2. Update the Seed Script

Open `supabase/seed.sql` and replace the placeholder UUIDs:

```sql
-- Line ~57: Replace with demo user UUID
'22222222-2222-2222-2222-222222222222', -- Replace with actual demo user UUID

-- Line ~74: Replace with admin user UUID
'33333333-3333-3333-3333-333333333333', -- Replace with actual admin user UUID
```

### 3. Run the Seed Script

#### Option A: Via Supabase Dashboard (SQL Editor)
1. Go to **SQL Editor** in Supabase Dashboard
2. Click **"New Query"**
3. Copy the entire contents of `supabase/seed.sql`
4. Paste into the editor
5. Click **"Run"**

#### Option B: Via Supabase CLI
```bash
# Make sure you're in the project directory
cd /Users/bucci369/Desktop/fitness-crm

# Run the seed script
supabase db reset --db-url "your-supabase-db-url"
# or
psql "your-database-connection-string" -f supabase/seed.sql
```

### 4. Verify Data Creation

After running the script, you should see:
- 1 Studio: "Demo Fitness Studio"
- 3 Membership Types: Basic, Premium, Elite
- 5 Members (including demo user)
- 3 Class Types: Yoga Flow, HIIT Training, Pilates
- 6 Class Schedules (for the next 7 days)
- 6 Payment records

---

## Demo Data Overview

### Studio
- **Name:** Demo Fitness Studio
- **Location:** Berlin, Germany
- **Contact:** info@demo-fitnessstudio.de

### Membership Types

| Type | Price/Month | Features |
|------|-------------|----------|
| **Basic** | €29.99 | Gym access, equipment, changing rooms, drinks |
| **Premium** | €49.99 | Basic + 5 group classes, sauna, training plan, towel service |
| **Elite** | €79.99 | Premium + unlimited classes, 4 PT sessions, nutrition, massage |

### Demo Members

1. **Max Mustermann** (Demo User)
   - Membership: Premium
   - Status: Active
   - Member #: M-2024-001
   - Loyalty: Gold (450 points)

2. **Julia Weber**
   - Membership: Basic
   - Status: Active
   - Member #: M-2024-002
   - Tags: Student, Newbie

3. **Thomas Schneider**
   - Membership: Elite
   - Status: Active
   - Member #: M-2024-003
   - Loyalty: Platinum (1200 points)

4. **Lisa Meyer**
   - Membership: Premium
   - Status: Pending
   - Member #: M-2024-004

5. **Michael Fischer**
   - Membership: Basic
   - Status: Inactive
   - Member #: M-2023-099

### Class Schedule (Next 7 Days)

- **Monday:** Yoga Flow (9:00), HIIT Training (18:00)
- **Wednesday:** Pilates (10:00), Yoga Flow (19:00)
- **Friday:** HIIT Training (17:30), Pilates (11:00)

---

## Testing Features

### What You Can Test

✅ **Authentication**
- Login with demo credentials
- Session management
- Protected routes

✅ **Dashboard**
- View KPI cards (members, revenue, classes)
- Member growth chart
- Quick stats

✅ **Members Management**
- View members list with filtering
- See member details
- View membership information
- Check payment history

✅ **Member Profiles**
- Personal information
- Contact details
- Membership status
- Health notes
- Tags and notes

✅ **UI/UX**
- Dark theme consistency
- Responsive design
- Professional styling
- Navigation

### Test User Flows

1. **Login Flow**
   - Go to `/login`
   - Enter: `demo@fitnessstudio.de` / `Demo123!`
   - Should redirect to `/dashboard`

2. **View Members**
   - Navigate to Members page
   - See 5 demo members
   - Filter by status (Active, Pending, Inactive)
   - Search for members

3. **Member Details**
   - Click on any member
   - View complete profile
   - Check membership details
   - See quick stats

4. **Add New Member** (UI Only)
   - Click "Add Member"
   - Fill out the form
   - Note: Backend submission not yet implemented

---

## Troubleshooting

### Issue: Users can't log in
**Solution:** Make sure you checked "Auto Confirm User" when creating users in Supabase

### Issue: No data showing in dashboard
**Solution:**
1. Check if seed script ran successfully
2. Verify studio_id matches in all tables
3. Check browser console for errors

### Issue: Profile data missing
**Solution:** Ensure the `profiles` table entries use the same UUIDs as the auth users

### Issue: RLS (Row Level Security) blocking data
**Solution:** Check that RLS policies in `20251012191920_rls_policies.sql` are applied

---

## Next Steps

After testing with demo data:

1. **Implement Authentication Server Actions** (pending)
2. **Complete Member Form Submission** (UI ready, needs backend)
3. **Add Classes Management Pages**
4. **Add Payments Management Pages**
5. **Implement Email Notifications**
6. **Add Analytics & Reporting**

---

## Security Notes

⚠️ **Important:** These are demo credentials for development/testing only!

- Change all passwords before production
- Use environment variables for sensitive data
- Enable 2FA for admin accounts in production
- Implement proper role-based access control
- Regular security audits

---

## Support

For issues or questions:
- Check the main README.md
- Review Supabase logs
- Check browser developer console
- Verify database migrations are applied
