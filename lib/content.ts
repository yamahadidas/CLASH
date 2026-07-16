import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/* ============================================================
   Tipos
============================================================ */
export interface SubItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface Section {
  slug: string;
  title: string;
  group: string;
  eyebrow: string;
  dot: string;
  card?: 'ee' | 'stat';
  swatch?: string;
  html: string;
  subs: SubItem[];
}

export interface NavGroup {
  label: string;
  items: {
    slug: string;
    title: string;
    dot: string;
    subs: SubItem[];
  }[];
}

export interface SearchEntry {
  id: string;
  title: string;
  chapter: string;
  snippet: string;
}

/* ============================================================
   Definición de secciones (orden fijo del manual)
============================================================ */
interface SectionDef {
  file: string;
  slug: string;
  group: string;
  dot: string;
  titleOverride?: string;
  card?: 'ee' | 'stat';
  swatch?: string;
}

const SECTION_DEFS: SectionDef[] = [
  { file: '01-Introduction.md',            slug: 'introduccion', group: 'INICIO',            dot: '#ece7dc' },
  { file: '02-La_Ciudad.md',               slug: 'la-ciudad',    group: 'EL MUNDO',          dot: '#c98a2c' },
  { file: '02a-La_Cabeza.md',              slug: 'la-cabeza',    group: 'EL MUNDO',          dot: '#b7362f' },
  { file: '03-Componentes_Personaje.md',   slug: 'componentes',  group: 'EL PERSONAJE',      dot: '#ece7dc' },
  { file: '03a-Fortitude.md',              slug: 'fortaleza',    group: 'EL PERSONAJE',      dot: '#b7362f', card: 'stat' },
  { file: '03b-Prudence.md',               slug: 'prudencia',    group: 'EL PERSONAJE',      dot: '#e8e4da', card: 'stat' },
  { file: '03c-Temperance.md',             slug: 'templanza',    group: 'EL PERSONAJE',      dot: '#c98a2c', card: 'stat' },
  { file: '03d-Justice.md',                slug: 'justicia',     group: 'EL PERSONAJE',      dot: '#3f8079', card: 'stat' },
  { file: '03EX-Status.md',                slug: 'estados',      group: 'EFECTOS DE ESTADO', dot: '#ece7dc' },
  { file: '03EXa-Bleed.md',                slug: 'sangrado',     group: 'EFECTOS DE ESTADO', dot: '#c0392b', card: 'ee', swatch: '#c0392b' },
  { file: '03EXb-Burn.md',                 slug: 'quemadura',    group: 'EFECTOS DE ESTADO', dot: '#e0622a', card: 'ee', swatch: '#e0622a' },
  { file: '03EXc-Rupture.md',              slug: 'ruptura',      group: 'EFECTOS DE ESTADO', dot: '#7aa83f', card: 'ee', swatch: '#7aa83f' },
  { file: '03EXd-Sinking.md',              slug: 'ahogo',        group: 'EFECTOS DE ESTADO', dot: '#3f7d9c', card: 'ee', swatch: '#3f7d9c' },
  { file: '03EXe-Tremor.md',               slug: 'tremor',       group: 'EFECTOS DE ESTADO', dot: '#cfc9a8', card: 'ee', swatch: '#cfc9a8' },
  { file: '03EXf-Poise.md',                slug: 'postura',      group: 'EFECTOS DE ESTADO', dot: '#4aa8cf', card: 'ee', swatch: '#4aa8cf' },
  { file: '03EXg-Charge.md',               slug: 'carga',        group: 'EFECTOS DE ESTADO', dot: '#d4af37', card: 'ee', swatch: '#d4af37' },
  { file: '04Aa-Combate.md',               slug: 'sistema-clash',group: 'COMBATE',           dot: '#b7362f' },
  { file: '04Ab-CombatStart.md',           slug: 'el-flujo',     group: 'COMBATE',           dot: '#b7362f' },
  { file: '04Ac-Attacks.md',               slug: 'ataques',      group: 'COMBATE',           dot: '#b7362f' },
  { file: '04Ad-OffensiveDice.md',         slug: 'resistencias', group: 'COMBATE',           dot: '#b7362f' },
  { file: '04Ae-EmotionLevel.md',          slug: 'emocion',      group: 'COMBATE',           dot: '#b7362f' },
  { file: '04Ba-Otros.md',                 slug: 'checks',       group: 'COMBATE',           dot: '#b7362f', titleOverride: 'Checks & Dificultad' },
  { file: '05-Creando_Personaje.md',       slug: 'creando-pj',   group: 'CREACIÓN',          dot: '#3f8079' },
];

/* ============================================================
   Utilidades
============================================================ */
function imgName(orig: string): string {
  const dec = decodeURIComponent(orig);
  return dec.toLowerCase().replace(/[\s_]+/g, '-');
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ============================================================
   Pre-procesado del markdown:
   - Normaliza rutas de imágenes (_attachments con espacios → /img/…)
   - Detecta diálogos in-character ("…") y los convierte en voice-logs
   - Detecta imágenes (+ caption en itálica) y las convierte en <figure>
============================================================ */
function preprocess(md: string): string {
  // 1. Normalizar imágenes
  md = md.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt, src) => `![${alt}](/img/${imgName(src)})`);

  // 1b. Asegurar línea en blanco tras una tabla (si no, marked se traga el párrafo siguiente)
  md = md.replace(/(\|[^\n]*\|)\n(?!\s*\|)/g, '$1\n\n');

  const blocks = md.split(/\n{2,}/);
  const out: string[] = [];
  let prevWasQuote = false;

  for (const rawBlock of blocks) {
    const block = rawBlock.trim();
    if (!block) continue;

    // Voice-log: diálogo de un jugador / fixer
    if (block.startsWith('"') || block.startsWith('“')) {
      out.push(
        `<div class="voice-log"><div class="voice-log-tag">Registro de audio — Fixer anónimo</div><p class="voice-line">${escapeHtml(block)}</p></div>`
      );
      prevWasQuote = true;
      continue;
    }

    const isPlainText = !/^[#!|\->*<]/.test(block);
    // Respuesta del GM inmediatamente después de un voice-log
    if (prevWasQuote && isPlainText) {
      out.push(
        `<div class="voice-log gm-log"><div class="voice-log-tag">GM — Respuesta</div><p class="voice-line">${escapeHtml(block)}</p></div>`
      );
      prevWasQuote = false;
      continue;
    }
    prevWasQuote = false;

    // Figure: bloque compuesto solo de imágenes + caption opcional en itálica
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const imgRe = /^!\[[^\]]*\]\([^)]+\)$/;
    const capRe = /^\*[^*]+\*$/;
    if (lines.length > 0 && lines.every((l) => imgRe.test(l) || capRe.test(l)) && lines.some((l) => imgRe.test(l))) {
      const imgs = lines
        .filter((l) => imgRe.test(l))
        .map((l) => {
          const src = l.match(/\(([^)]+)\)/)![1];
          return `<img src="${src}" alt="" loading="lazy" />`;
        });
      const capLine = lines.find((l) => capRe.test(l));
      const caption = capLine ? capLine.slice(1, -1) : '';
      const cls = imgs.length > 1 ? 'manual-figure multi' : 'manual-figure';
      out.push(
        `<figure class="${cls}"><div class="fig-row">${imgs.join('')}</div>${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}</figure>`
      );
      continue;
    }

    out.push(block);
  }

  return out.join('\n\n');
}

/* ============================================================
   Post-procesado del HTML:
   - IDs en h2/h3 (anchors para nav + búsqueda)
   - Tablas envueltas en .table-scroll con clase .manual-table
============================================================ */
function postProcess(html: string, sectionSlug: string): { html: string; subs: SubItem[] } {
  const subs: SubItem[] = [];
  const used = new Set<string>();

  html = html.replace(/<h([23])>(.*?)<\/h\1>/g, (_m, lvl, inner) => {
    const level = Number(lvl) as 2 | 3;
    const text = stripTags(inner).replace(/:$/, '');
    let id = `${sectionSlug}--${slugify(text)}`;
    let i = 2;
    while (used.has(id)) id = `${sectionSlug}--${slugify(text)}-${i++}`;
    used.add(id);
    subs.push({ id, title: text, level });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  html = html
    .replace(/<table>/g, '<div class="table-scroll"><table class="manual-table">')
    .replace(/<\/table>/g, '</table></div>');

  return { html, subs };
}

/* ============================================================
   Pipeline principal (corre en build time, servidor)
============================================================ */
export interface ManualData {
  sections: Section[];
  nav: NavGroup[];
  searchIndex: SearchEntry[];
}

export function getManual(): ManualData {
  const sections: Section[] = [];
  const searchIndex: SearchEntry[] = [];

  SECTION_DEFS.forEach((def, idx) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, def.file), 'utf8');

    // Extraer título del H1 y quitarlo del cuerpo
    const h1 = raw.match(/^#\s+(.+)$/m);
    const title = def.titleOverride ?? (h1 ? h1[1].trim().replace(/:$/, '') : def.slug);
    const body = raw.replace(/^#\s+.+$/m, '');

    const pre = preprocess(body);
    let html = marked.parse(pre, { async: false }) as string;
    const processed = postProcess(html, def.slug);
    html = processed.html;

    const eyebrow = `${def.group} · ${String(idx + 1).padStart(2, '0')}`;

    sections.push({
      slug: def.slug,
      title,
      group: def.group,
      eyebrow,
      dot: def.dot,
      card: def.card,
      swatch: def.swatch,
      html,
      subs: processed.subs,
    });

    // Índice de búsqueda: entrada por sección
    const plain = stripTags(html);
    searchIndex.push({
      id: `sec-${def.slug}`,
      title,
      chapter: def.group,
      snippet: plain.slice(0, 150),
    });

    // Entradas por subsección: texto entre este heading y el siguiente
    processed.subs.forEach((sub) => {
      const idPos = html.indexOf(`id="${sub.id}"`);
      const start = idPos !== -1 ? html.indexOf('>', idPos) + 1 : -1;
      let chunk = '';
      if (start > 0) {
        const rest = html.slice(start);
        const nextHeading = rest.search(/<h[23] id="/);
        const end = nextHeading !== -1 ? nextHeading : rest.length;
        chunk = stripTags(rest.slice(0, end));
      }
      searchIndex.push({
        id: sub.id,
        title: sub.title,
        chapter: title,
        snippet: chunk.slice(0, 150),
      });
    });
  });

  // Nav agrupado
  const nav: NavGroup[] = [];
  for (const s of sections) {
    let g = nav.find((n) => n.label === s.group);
    if (!g) {
      g = { label: s.group, items: [] };
      nav.push(g);
    }
    g.items.push({ slug: s.slug, title: s.title, dot: s.dot, subs: s.subs });
  }

  return { sections, nav, searchIndex };
}
