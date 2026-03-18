# FUSION 24 — Premium Fitness Website

High-end gym brand website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Supabase (Auth + DB)**, **Lucide Icons**, and **Shadcn UI-style components**.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- Lucide React
- Shadcn UI component patterns in `components/ui`

## Folder Structure

```
app/
  admin/
  contact/
  dashboard/
  gallery/
  login/
  memberships/
  trainers/
components/
  auth/
  layout/
  motion/
  ui/
hooks/
lib/
public/
  images/
styles/
supabase/
```

## Setup

### 1) Install

```bash
npm install
```

### 2) Supabase

Create a project in Supabase, then in the SQL editor run:

- `supabase/schema.sql`

Then create a local env file:

```bash
copy .env.example .env.local
```

Fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Make a user admin

After signing up once, promote your account in Supabase SQL:

```sql
update public.profiles set role = 'admin' where id = 'YOUR_USER_UUID';
```

### 3) Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Pages

- `/` Home
- `/memberships` Membership plans + comparison
- `/trainers` Trainer profiles
- `/gallery` Responsive gallery grid
- `/contact` Contact form (demo UI)
- `/login` Supabase login/signup
- `/dashboard` Member dashboard (protected)
- `/admin` Admin dashboard (protected + role-gated)

## Notes

- Protected routes are enforced in `middleware.ts`.
- Admin access is determined by `profiles.role = 'admin'`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
