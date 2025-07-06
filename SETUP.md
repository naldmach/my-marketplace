# Setup Guide

## 1. Prerequisites

- Node.js 20+
- npm 9+
- Supabase account

## 2. Clone the Repository

```bash
git clone <your-repo-url>
cd my-marketplace
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 5. Supabase Setup

- Run the schema in `supabase-schema.sql` on your Supabase project.
- Create a public storage bucket named `listing-images`.
- Enable Row Level Security (RLS) and set appropriate policies.

## 6. Start the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 7. Troubleshooting

- Ensure all env vars are set
- Check Supabase storage permissions
- For Tailwind or build errors, ensure you are using Tailwind v3

---

See [FEATURES.md](./FEATURES.md) and [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for more.
