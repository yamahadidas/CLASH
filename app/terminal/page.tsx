import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terminal Fixer — CLASH',
  description: 'Companion app de CLASH: ficha de personaje, calculadora de ATAQUES, resistencias y chequeos.',
};

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
          <a href="/companion.html" target="_blank" rel="noopener" className="th-link primary">
            Abrir en pestaña nueva ↗
          </a>
        </div>
      </header>
      <iframe className="terminal-frame" src="/companion.html" title="Terminal Fixer — Companion App de CLASH" />
    </div>
  );
}
