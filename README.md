# RUBY — Personal Portfolio

Portfolio pribadi untuk menampilkan keahlian sebagai Frontend / Full-Stack Developer. Dibangun dengan tema neo-brutalist bernuansa biru elektrik dan aksen neon volt, dengan hero interaktif, terminal playground, dan showcase proyek.

**Live demo:** [rubyporto.vercel.app](https://rubyporto.vercel.app)

## Fitur

- **Hero interaktif** — judul yang diketik otomatis, teks & kartu kaca yang bisa di-drag di area hero, serta kartu *Focus Stack* yang berganti saat diklik.
- **Settings popover & persistensi** — pengaturan `Theme` (`classic` biru elektrik & `cyber` gelap), `Lite Mode` (nonaktifkan efek partikel/GPU dekoratif), dan `Sound FX` yang tersimpan di `localStorage`.
- **Projects showcase & Quick-View Modal** — kartu proyek 3D parallax dengan cursor spotlight, tag teknologi, link GitHub/demo, dan modal detail cepat.
- **Terminal Playground** — mini shell interaktif dengan efek suara Web Audio API, `Tab` autocomplete, command bawaan (`help`, `about`, `skills`, `projects`, `run test`, `theme --toggle`, `lite --toggle`), dan auto-demo saat section terlihat.
- **Journey timeline & Toolchain Marquee** — perjalanan belajar dengan garis progres berbasis scroll serta marquee teknologi dengan tooltip peran.
- **Custom cursor trail & aksesibilitas** — cursor trail di desktop (otomatis nonaktif di perangkat sentuh, `Lite Mode`, dan `prefers-reduced-motion`), *Skip to main content*, serta target sentuh ramah mobile.

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
├── lib/            # Utilitas & Web Audio API sound effects
├── App.tsx
├── main.tsx
└── index.css
public/
└── images/         # Foto profil & aset proyek
```

Sebagian besar konten (nama, tagline, daftar proyek, link GitHub/email, timeline journey) terpusat di `src/data/portfolioData.ts`, sehingga bisa diperbarui tanpa menyentuh komponen.

## Deploy

Proyek ini dirancang untuk deploy ke [Vercel](https://vercel.com/):

```bash
npm run build
```

Output ada di folder `dist/`, siap di-deploy ke Vercel atau static host lainnya.
