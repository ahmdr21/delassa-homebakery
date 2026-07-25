# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Maintenance mode

To put the site into maintenance mode, set the Vite env variable `VITE_MAINTENANCE` to `true` when serving or building. When enabled, the app will render a maintenance page instead of the normal routes.

Example (development):

```powershell
# Windows PowerShell
$env:VITE_MAINTENANCE='true'; npm run dev
```

Example (build):

```powershell
# Set the flag and build
$env:VITE_MAINTENANCE='true'; npm run build
```

Set the value back to `false` (or unset) to restore normal site behavior.

## Review moderation

Review dari pelanggan tidak langsung tampil di website. Form review menyimpan data ke tabel `product_reviews` dengan `is_approved = false`, sedangkan halaman publik hanya membaca review yang sudah `is_approved = true`.

Panel moderasi tersedia di:

```text
/admin/reviews
```

Di panel ini admin bisa:

- melihat review pending dan review yang sudah tampil;
- mengedit nama, username, produk, sumber, rating, dan isi ulasan;
- memilih `Tampilkan` atau `Sembunyikan` untuk mengatur apakah review muncul di website.

Kolom tabel Supabase yang dipakai:

```sql
product_title text
reviewer_name text
reviewer_username text
review text
rating int
source text
is_approved boolean default false
created_at timestamptz default now()
```

Jika ingin memberi PIN sederhana untuk halaman admin, isi env berikut:

```env
VITE_REVIEW_ADMIN_PIN=pin-admin-anda
```

Catatan: PIN Vite tetap ikut masuk ke bundle frontend, jadi ini hanya pembatas ringan. Untuk produksi, gunakan Supabase Auth + RLS agar hanya akun admin yang boleh membaca semua review dan melakukan update.
