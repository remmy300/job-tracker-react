# 💼 Job Application Tracker

A sleek and powerful Job Application Tracker built with **Next.js (App Router, TypeScript)**, **Supabase**, **Tailwind CSS**, and **shadcn/ui**.

Track your job applications, manage statuses, add excitement ratings, and never lose sight of your job hunt progress — all in one beautiful dashboard.

---

## ✨ Features

- 🔐 **Authentication**

  - Email/password sign-up and login via Supabase Auth
  - User-specific job data enforced by row-level security

- 📋 **Job Management**

  - Add, edit, and delete job applications
  - Fields: title, company, status, dates, excitement, description, location
  - Live sync via Supabase Realtime

- 🔎 **Status Tracking**

  - Track status: Bookmarked / Applying / Applied / Interviewing / Negotiating / Accepted
  - Filter by job status
  - Sort by excitement, date, or company

- 🧠 **Excitement Rating**

  - Rate how excited you are about a job (1-5 stars)

- 📅 **Date Fields**

  - Track saved date, applied date, interview date, and deadline

- 💻 **UI & UX**
  - Built with **Tailwind CSS** and **shadcn/ui**
  - Responsive layout for desktop & mobile
- ✅ **Form Validation**
  - Built with **React Hook Form** + **Zod** for schema-based validation

---

## 🛠 Tech Stack

| Tool                                            | Purpose                              |
| ------------------------------------------------ | ------------------------------------ |
| [Next.js](https://nextjs.org/)                  | Fullstack React framework (App Router) |
| [Supabase](https://supabase.com/)               | Postgres database + Auth + Realtime  |
| [Tailwind CSS](https://tailwindcss.com/)        | Utility-first CSS                    |
| [shadcn/ui](https://ui.shadcn.com/)             | Accessible and styled UI components  |
| [React Hook Form](https://react-hook-form.com/) | Form state management                |
| [Zod](https://zod.dev/)                         | Schema-based form validation         |
| [TypeScript](https://www.typescriptlang.org/)   | Type safety                          |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Create a project at [supabase.com](https://supabase.com), then open the SQL editor and run [`supabase/schema.sql`](./supabase/schema.sql) to create the `jobs` table, its row-level security policies, and enable realtime.

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your project's URL and anon key (Project Settings → API):

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).
