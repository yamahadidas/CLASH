# CLASH — Pulperian Edition

Manual web de **CLASH**, un TTRPG homebrew ambientado en el universo de **Project Moon**
(Lobotomy Corporation / Library of Ruina / Limbus Company). Hecho con Next.js (App Router),
exportado como sitio estático. Incluye buscador del manual completo y la **Terminal Fixer**
(companion app self-hosted).

> Homebrew de fans, sin afiliación con Project Moon. Contiene lenguaje explícito.

## Desarrollo

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build

```bash
npm run build
# genera out/ (sitio estático listo para servir)
```

## Deploy en Vercel

1. Sube este repo a GitHub/GitLab.
2. En Vercel: **Add New → Project → Import** el repo.
3. Vercel detecta Next.js automáticamente. Build command: `next build`. Deploy y listo.

## Estructura

| Ruta | Qué es |
| --- | --- |
| `content/*.md` | Fuente del manual en Markdown (editar aquí el contenido) |
| `lib/content.ts` | Pipeline: md → HTML + nav + índice de búsqueda (build time) |
| `app/page.tsx` | Manual (página principal) |
| `app/terminal/` | Página que embebe la companion app |
| `public/companion.html` | Terminal Fixer (app independiente, también accesible directo en `/companion.html`) |
| `public/img/` | Imágenes del manual |

## Editar el manual

Edita los archivos en `content/`. Las imágenes se referencian como `![](/img/nombre.png)`
(el pipeline normaliza nombres con espacios/guiones bajos automáticamente desde `_attachments`).
Para agregar una sección nueva, añade el `.md` y regístralo en `SECTION_DEFS` dentro de
`lib/content.ts`.
