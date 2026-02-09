# MI Studio — Premium Scrollytelling Experience

A high-end landing page for **MI Studio**, featuring a scroll-linked image sequence animation, built with Next.js 16, Framer Motion, and Tailwind CSS.

## 🚀 Features

- **Scrollytelling Image Sequence**: 179-frame canvas animation syncs with scroll.
- **Performance**: Optimized HTML5 Canvas rendering (60fps).
- **Aesthetic**: Premium "Dark Luxury" design (#050505 background).
- **Tech Stack**: Next.js 16 (App Router), Tailwind CSS v4, Framer Motion.

## 🛠️ Getting Started

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

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fmi-studio)

1. Push this code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel will auto-detect Next.js and deploy.

## 📂 Project Structure

- `app/page.tsx`: Main entry point assembling the sections.
- `components/ScrollSequence.tsx`: Core canvas animation logic.
- `components/PriceScreen.tsx`: Services list.
- `components/ContactScreen.tsx`: Map and contact info.
- `public/sequence/`: Image assets for the animation.

---
Designed for **MI Beauty Studio**.
