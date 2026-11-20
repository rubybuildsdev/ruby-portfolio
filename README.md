# RUBY — Personal Portfolio

Portfolio pribadi untuk menampilkan keahlian sebagai Frontend / Full-Stack Developer. Dibangun dengan tema neo-brutalist bernuansa biru elektrik dan aksen neon volt, dengan hero interaktif, terminal playground, dan showcase proyek.

**Live demo:** _(tambahkan link Vercel di sini)_

## Fitur

- **Hero interaktif** — judul yang diketik otomatis, teks yang bisa di-drag & dilempar, kartu kaca (glassmorphism) yang miring mengikuti kursor.
- **Terminal Playground** — mini shell interaktif dengan command bawaan (`help`, `about`, `skills`, `projects`, `run test`, `theme --toggle`) dan auto-demo saat section terlihat.
- **Projects showcase** — kartu proyek dengan tag teknologi, link ke GitHub, dan (opsional) link demo langsung.
- **Journey timeline** — perjalanan belajar dari dasar web development hingga fokus saat ini.
- **Custom cursor trail** di desktop, otomatis nonaktif di perangkat sentuh dan saat pengguna mengaktifkan `prefers-reduced-motion`.
- Dua tema warna: `classic` (biru elektrik) dan `cyber` (gelap), bisa di-toggle dari Terminal Playground.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build tool & dev server
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) (framer-motion) — animasi
- [Lucide React](https://lucide.dev/) — ikon
- [Oxlint](https://oxc.rs/) — linting

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Script yang tersedia

| Script            | Keterangan                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`      | Menjalankan dev server dengan HMR        |
| `npm run build`    | Type-check (`tsc -b`) lalu build produksi |
| `npm run preview`  | Preview hasil build produksi secara lokal |
| `npm run lint`     | Menjalankan Oxlint                       |

## Struktur Proyek

```
src/
├── components/     # Semua komponen UI (Hero, Projects, Terminal, dll.)
├── data/
│   └── portfolioData.ts   # Konten portfolio (profil, proyek, journey) — edit di sini
├── App.tsx
├── main.tsx
└── index.css
public/
└── images/         # Foto profil & screenshot proyek
```

Sebagian besar konten (nama, tagline, daftar proyek, link GitHub/email, timeline journey) terpusat di `src/data/portfolioData.ts`, sehingga bisa diperbarui tanpa menyentuh komponen.

## Deploy

Proyek ini dirancang untuk deploy ke [Vercel](https://vercel.com/):

```bash
npm run build
```

Output ada di folder `dist/`, siap di-deploy ke Vercel atau static host lainnya.
