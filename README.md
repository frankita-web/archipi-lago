# Archipiélago

Sitio de [Archipiélago](https://archipi-lago.vercel.app), hecho con Next.js (App Router + TypeScript) y publicado en Vercel.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # revisa que compile antes de publicar
```

Cada push a `main` publica producción en Vercel.

## Dónde está cada cosa

- `app/page.tsx` — portada (logo de letras, directorio, manifiesto, línea del tiempo).
- `app/[slug]/page.tsx` — página de cada marca (`/leonor/`, `/taverna/`, …).
- `lib/brands.ts` — lista de marcas del directorio y del logo, línea del tiempo y redes.
- `lib/brand-pages.ts` — textos ES/EN, horarios, ubicación, links y fotos de cada página de marca.
- `lib/i18n.ts` — textos del sitio en español e inglés.
- `lib/letter-logo.ts` — animación del logo hecho con letras.
- `public/assets/brands/<slug>/` — fotos de cada marca.
