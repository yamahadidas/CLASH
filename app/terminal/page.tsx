import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import OpenInNewTab from './OpenInNewTab';

export const metadata: Metadata = {
  title: 'Terminal Fixer — CLASH',
  description: 'Companion app de CLASH: ficha de personaje, calculadora de ATAQUES, resistencias y chequeos.',
};

// Incrusta companion.html en la página en build time. Así la Terminal no
// depende de cómo el hosting resuelva /companion.html (next dev solo sirve
// la ruta literal; Vercel limpia las URLs .html y da 404 en la ruta literal).
const companionHtml = readFileSync(
  path.join(process.cwd(), 'public', 'companion.html'),
  'utf8',
);

export default function TerminalPage() {
  return (
    <div className="terminal-page">
      <header className="terminal-header">
        <div className="th-left">
          <span className="th-mark">TERMINAL FIXER</span>
          <span className="th-sub">CLASH · Companion App</span>
        </div>
        <div className="th-actions">
          <a href="/" className="th-link">
            ← Volver al manual
          </a>
          <OpenInNewTab className="th-link primary" />
        </div>
      </header>
      <iframe
        className="terminal-frame"
        srcDoc={companionHtml}
        title="Terminal Fixer — Companion App de CLASH"
      />
    </div>
  );
}