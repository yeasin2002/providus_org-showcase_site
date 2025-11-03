# Supabase Setup Complete ✅

Your Next.js project is now connected to Supabase!

## What Was Configured

### 1. Environment Variables (.env)

```
NEXT_PUBLIC_SUPABASE_URL=https://elzgwgkeskekvohwnewa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Supabase Client Files

- **`src/utils/supabase/client.ts`** - For Client Components (browser)
- **`src/utils/supabase/server.ts`** - For Server Components, Server Actions, Route Handlers
- **`src/utils/supabase/middleware.ts`** - For auth session refresh

### 3. Middleware Integration

The root `src/middleware.ts` now handles both:

- Supabase auth session refresh
- next-intl i18n routing

## How to Use Supabase

### In Server Components

```typescript
import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("churches").select();

  return <div>{JSON.stringify(data)}</div>;
}
```

### In Client Components

```typescript
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function MyComponent() {
  const [data, setData] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("churches").select();
      setData(data);
    }
    fetchData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

### In Server Actions

```typescript
"use server";

import { createClient } from "@/utils/supabase/server";

export async function createChurch(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("churches").insert({
    church_name: formData.get("name"),
    // ... other fields
  });

  return { data, error };
}
```

## Test the Connection

Visit `/dashboard` to see a test query fetching churches from your Supabase database.

## Next Steps

1. **Create Database Tables** - Go to your Supabase dashboard and create the required tables:

   - `churches`
   - `projects`
   - `certificates`

2. **Set up Row Level Security (RLS)** - Configure RLS policies for your tables

3. **Configure Auth** (if needed) - Set up authentication providers in Supabase dashboard

4. **Storage Buckets** - Create storage buckets for:
   - `uploads/` (photos and videos)
   - `certificates/` (PDF certificates)

## Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard/project/elzgwgkeskekvohwnewa)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Troubleshooting

### "Missing Supabase environment variables" error

- Make sure `.env` file exists in the project root
- Verify the environment variables are set correctly
- Restart the dev server after changing `.env`

### Database connection errors

- Check your Supabase project is active
- Verify the URL and anon key are correct
- Check your internet connection

### Auth issues

- Make sure middleware is running (check console logs)
- Verify RLS policies allow the operations you're trying to perform
- Use `supabase.auth.getUser()` to check auth state
