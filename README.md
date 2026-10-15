# HUMORA — Mobile Streaming App UI/UX Prototype

> **Tagline Resmi:** *“Scroll. laugh. repeat.”*

HUMORA adalah prototype aplikasi mobile streaming video series pendek modern Indonesia yang berfokus pada konten episodik ringan, komedi, romansa, slice of life, dan drama perkantoran yang dirancang khusus untuk kenyamanan menonton lewat smartphone.

Proyek ini dibangun sepenuhnya menggunakan **Next.js (App Router), React, TypeScript, dan Tailwind CSS**. Seluruh data katalog series, status pengguna, simulasi transaksi pembayaran, riwayat tontonan, dan progres episode berjalan 100% di sisi frontend tanpa memerlukan backend server, database luar, ataupun payment gateway produksi.

---

## 🎨 1. Identitas Visual & Desain UI/UX

- **Warna Utama Brand:**
  - **Kuning Cerah (`#FFD52E` / `#FFD42A`)**: Identitas brand, splash screen, aksen playful, highlight tontonan, dan badge promosi.
  - **Ungu Gelap (`#21052F` / `#260936`)**: Teks brand utama, tombol aksi kontras, dan frame mockup smartphone.
  - **Ungu Brand (`#4B0B7A`)**: Tombol utama, navigasi aktif, dan kartu promosi.
  - **Ungu Sekunder (`#7028B8`)**: Aksen premium dan interaksi aktif.
  - **Latar Netral Hangat (`#FFFDF7`)**: Permukaan utama aplikasi yang nyaman di mata pembaca.
  - **Permukaan Kartu (`#FFFFFF`)**: Kartu series, modal, dan sheet.
- **Tipografi:** Plus Jakarta Sans dengan hierarki bobot 400 (regular) hingga 800 (black).
- **Logo Playful:** Karakter play button berbentuk segitiga membulat dengan wajah tertawa ekspresif, outline tegas, dan aksen bintang.
- **Aturan Akses Episode (Free Preview Model):**
  - Episode 1 & 2 di setiap series berstatus **GRATIS** dan dapat ditonton langsung tanpa perlu login.
  - Episode 3 dan seterusnya berstatus **PREMIUM (Terkunci)**.
  - Menekan episode terkunci akan memicu **Subscription Bottom Sheet** yang memandu pengguna menuju pemilihan paket dan pembayaran demo.

---

## 📱 2. Desain Mobile-First & Mode Screenshot Desktop

1. **Pada Smartphone Nyata / Viewport Sempit (< 640px):**
   - Tampilan memenuhi layar secara native (100% viewport).
   - Bottom navigation menetap dengan padding safe-area (`env(safe-area-inset-bottom)`).
   - Frame bezel smartphone otomatis dihilangkan.
2. **Pada Desktop / Layar Lebar (≥ 640px):**
   - Menampilkan frame smartphone virtual elegan berukuran proporsional (~400px x 880px) dengan bezel melengkung dan mock status bar dynamic island di tengah studio background netral.
   - Dilengkapi **Humora Demo Controller** di sisi kiri luar frame untuk keperluan pengujian dan pengambilan screenshot.

---

## 🕹️ 3. Panel Pengujian Demo & State Pengguna

Panel controller di sisi layar desktop memungkinkan penguji mengubah kondisi aplikasi dalam 1 kali klik:

| Mode Pengguna | Deskripsi Perilaku di Aplikasi |
|---|---|
| **1. Tamu (Guest)** | Belum login. Dapat menjelajah katalog, mencari series, dan menonton 2 episode gratis. Episode 3 terkunci dan meminta login/langganan saat diakses. |
| **2. User Gratis** | Sudah login tapi belum berlangganan. Episode 1 & 2 terbuka, episode 3+ terkunci. Profil menampilkan kartu *Akun Gratis*. |
| **3. Premium Aktif** | Memiliki paket aktif (3 Bulan). Seluruh episode terkunci di 8 series terbuka langsung tanpa gembok. Profil menampilkan badge *Premium Aktif* dan sisa masa aktif. |
| **4. Expired** | Masa langganan telah kedaluwarsa. Episode premium terkunci kembali. Profil menampilkan peringatan jelas berwarna jingga dengan tombol *Perpanjang Premium*. |
| **Reset Demo Data** | Mengembalikan seluruh data demo, riwayat tontonan, notifikasi, dan transaksi ke kondisi awal. |

---

## 📂 4. Struktur Direktori Proyek

```
fe-humora/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx            # Form Login (Email & Phone tabs, demo fill)
│   │   └── register/page.tsx         # Form Register (validasi frontend & redirect)
│   ├── history/page.tsx              # Riwayat (Tabs Lanjutkan vs Selesai, hapus item)
│   ├── home/page.tsx                 # Beranda (Hero spotlight, Populer, Rekomendasi)
│   ├── notifications/page.tsx        # Pusat notifikasi internal (kategori & filter)
│   ├── payment/
│   │   ├── page.tsx                  # Checkout demo, promo code, metode bayar
│   │   └── success/page.tsx          # Konfirmasi pembayaran berhasil & buka episode
│   ├── profile/
│   │   ├── page.tsx                  # Profil pengguna & 3-state subscription card
│   │   └── subscription/page.tsx     # Detail paket aktif & riwayat transaksi demo
│   ├── search/page.tsx               # Pencarian live filter & genre chips
│   ├── series/[slug]/
│   │   ├── page.tsx                  # Server component pre-rendering
│   │   └── SeriesDetailClient.tsx    # Detail series, daftar episode, sinopsis
│   ├── subscription/page.tsx         # Pilihan 3 paket premium (Bulanan, 3 Bulan, Tahunan)
│   ├── watch/[seriesSlug]/[episodeId]/
│   │   ├── page.tsx                  # Server component pre-rendering
│   │   └── WatchClient.tsx           # Video player streaming, scrubber, navigasi ep
│   ├── globals.css                   # Design tokens, variables, dan keyframe animasi
│   ├── layout.tsx                    # Root layout, Plus Jakarta Sans, Provider, AppShell
│   └── page.tsx                      # Splash screen & onboarding entry screen
├── components/
│   ├── brand/
│   │   └── HumoraLogo.tsx            # Logo SVG play button tertawa
│   ├── demo/
│   │   └── DemoToolbar.tsx           # Toolbar kontrol screenshot & state demo
│   ├── layout/
│   │   ├── AppHeader.tsx             # Header mobile ringkas dengan notifikasi & avatar
│   │   ├── AppShell.tsx              # Wrapper mobile-first & virtual phone frame
│   │   ├── BottomNavigation.tsx      # Navigasi bawah 4 tab (Home, Search, History, Profile)
│   │   └── StatusBarMock.tsx         # Status bar tiruan khusus desktop preview
│   ├── series/
│   │   ├── ContinueWatchingCard.tsx  # Kartu horizontal lanjutkan menonton
│   │   ├── EpisodeCard.tsx           # Baris episode dengan indikator gembok & gratis
│   │   └── SeriesCard.tsx            # Kartu poster vertikal 2:3 dengan rating & badge
│   ├── subscription/
│   │   ├── SubscriptionBottomSheet.tsx # Bottom sheet penawaran episode premium
│   │   └── SubscriptionPlanCard.tsx    # Kartu pilihan paket berlangganan
│   ├── ui/
│   │   ├── ConfirmationModal.tsx     # Modal konfirmasi (logout, hapus, bayar)
│   │   └── Toast.tsx                 # Toast notifikasi status in-app
│   └── video/
│       └── VideoPlayer.tsx           # HTML5 video player + interactive canvas fallback
└── lib/
    ├── context/
    │   └── HumoraContext.tsx         # Global client state & LocalStorage sync
    ├── data/
    │   ├── notificationsData.ts      # Data statis notifikasi
    │   ├── seriesData.ts             # 8 series lengkap (min. 6-8 episode per series)
    │   └── subscriptionPlans.ts      # Data paket harga & kode voucher promo
    ├── types/
    │   └── index.ts                  # TypeScript interfaces & types
    └── utils/
        └── formatters.ts             # Format Rupiah, detik ke waktu, tanggal Indo
```

---

## 🎬 5. Katalog Series Demo (Lengkap & Realistis)

Setiap series memiliki poster, sinopsis mendalam, dan minimal 6–8 episode dengan durasi realistis:
1. **Kontrak Jadi Pacar** (Romantis, Komedi, Drama) — 8 Episode
2. **Kos Paling Berisik** (Komedi, Slice of Life) — 7 Episode
3. **Cinta Salah Chat** (Romantis, Komedi) — 6 Episode
4. **Mantan Satu Kantor** (Romance, Office Drama, Komedi) — 8 Episode
5. **Drama Grup Keluarga** (Komedi, Family, Slice of Life) — 6 Episode
6. **Tetangga Banyak Gaya** (Komedi, Satire) — 6 Episode
7. **Jangan Bilang Sayang** (Romance, Drama) — 7 Episode
8. **Rahasia Jam Pulang** (Misteri, Komedi, Workplace) — 6 Episode

---

## 🎟️ 6. Kode Promo Demo yang Didukung

Pada halaman checkout simulasi (`/payment`), kamu dapat menguji kode promo berikut:
- `HUMORAHEMAT` — Diskon 20%
- `TAWALAGI` — Diskon 15%
- `SERIESSERU` — Diskon 10%

---

## 🚀 7. Cara Menjalankan Proyek Secara Lokal

1. **Pastikan Node.js (versi 18.18 atau lebih baru) terpasang.**
2. **Clone repository dan buka direktori:**
   ```bash
   git clone https://github.com/ardhikaxx/fe-mobile-humora.git
   cd fe-mobile-humora
   ```
3. **Pasang dependensi:**
   ```bash
   npm install
   ```
4. **Jalankan development server:**
   ```bash
   npm run dev
   ```
5. **Buka di browser:**
   Akses `http://localhost:3000` untuk mulai menjelajah aplikasi.
6. **Build untuk verifikasi produksi:**
   ```bash
   npm run build
   npm run start
   ```

---

## 💡 8. Catatan Prototype

Aplikasi ini dibuat khusus untuk keperluan demonstrasi desain UI/UX, pengujian alur interaksi pengguna, dan presentasi portofolio. Tidak ada nomor kartu kredit riil yang diproses dan tidak ada data pribadi yang dikirimkan ke server eksternal.
