'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { NavGroup, SearchEntry } from '@/lib/content';

interface Props {
  nav: NavGroup[];
  searchIndex: SearchEntry[];
  hero: React.ReactNode;
  children: React.ReactNode;
}

function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

function highlight(text: string, q: string): string {
  if (!q) return text;
  const idx = normalize(text).indexOf(q);
  if (idx === -1) return text;
  return (
    text.slice(0, idx) + '<mark>' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length)
  );
}

export default function Sidebar({ nav, searchIndex, hero, children }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selIdx, setSelIdx] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(
    (raw: string) => {
      const q = normalize(raw.trim());
      if (q.length < 2) {
        setResults([]);
        setShowResults(false);
        setSelIdx(-1);
        return;
      }
      const scored: { e: SearchEntry; score: number }[] = [];
      for (const e of searchIndex) {
        let score = -1;
        if (normalize(e.title).includes(q)) score = 3;
        else if (normalize(e.chapter).includes(q)) score = 2;
        else if (normalize(e.snippet || '').includes(q)) score = 1;
        if (score > 0) scored.push({ e, score });
      }
      scored.sort((a, b) => b.score - a.score);
      setResults(scored.slice(0, 9).map((s) => s.e));
      setShowResults(true);
      setSelIdx(-1);
    },
    [searchIndex]
  );

  // Cerrar resultados al hacer click fuera
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const goTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    setShowResults(false);
    setQuery('');
    setOpen(false);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const section = target.closest('.doc-section');
      if (section) {
        section.classList.remove('flash');
        void (section as HTMLElement).offsetWidth;
        section.classList.add('flash');
      }
      history.replaceState(null, '', `#${id}`);
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      const pick = results[selIdx] ?? results[0];
      if (pick) goTo(pick.id);
    } else if (e.key === 'Escape') {
      setShowResults(false);
      inputRef.current?.blur();
    }
  };

  const q = normalize(query.trim());

  return (
    <>
      <div className="topbar">
        <span className="mark">CLASH</span>
        <button onClick={() => setOpen((o) => !o)}>☰ Índice / Buscar</button>
      </div>

      <div
        className={`sidebar-backdrop${open ? ' show' : ''}`}
        onClick={() => setOpen(false)}
      />

      {hero}

      <div className="layout">
        <aside className={`sidebar${open ? ' open' : ''}`} id="sidebar">
          <div className="sidebar-head">
            <div className="brand">
              <span className="brand-mark">CLASH</span>
              <span className="brand-sub">Pulperian Ed.</span>
            </div>
            <div className="search-wrap" ref={wrapRef}>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Buscar en el manual… (ej. Sangrado, HP, Ataque)"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  runSearch(e.target.value);
                }}
                onFocus={() => {
                  if (query.trim().length >= 2) runSearch(query);
                }}
                onKeyDown={onKeyDown}
              />
              <span className="search-icon">⌕</span>
              <div className={`search-results${showResults ? ' show' : ''}`}>
                {showResults && results.length === 0 && (
                  <div className="search-empty">
                    Sin resultados para &quot;{query}&quot;. Prueba con otro término.
                  </div>
                )}
                {showResults &&
                  results.map((e, i) => (
                    <a
                      key={e.id}
                      className={`search-result${i === selIdx ? ' sel' : ''}`}
                      onClick={(ev) => {
                        ev.preventDefault();
                        goTo(e.id);
                      }}
                      onMouseEnter={() => setSelIdx(i)}
                    >
                      <div className="sr-chapter">{e.chapter}</div>
                      <div
                        className="sr-title"
                        dangerouslySetInnerHTML={{ __html: highlight(e.title, q) }}
                      />
                      {e.snippet && (
                        <div
                          className="sr-snippet"
                          dangerouslySetInnerHTML={{ __html: highlight(e.snippet, q) }}
                        />
                      )}
                    </a>
                  ))}
              </div>
            </div>
          </div>

          <nav className="nav-scroll">
            <ul className="nav-tree">
              {nav.map((group) => (
                <li key={group.label}>
                  <div className="nav-group-label">{group.label}</div>
                  <ul className="nav-tree">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <a
                          href={`#sec-${item.slug}`}
                          className="nav-link"
                          data-slug={item.slug}
                          onClick={() => setOpen(false)}
                        >
                          <span
                            className="nav-dot"
                            style={{ ['--dot' as string]: item.dot } as React.CSSProperties}
                          />
                          {item.title}
                        </a>
                        {item.subs.length > 0 && (
                          <ul className="nav-sub">
                            {item.subs.map((sub) => (
                              <li key={sub.id}>
                                <a
                                  href={`#${sub.id}`}
                                  className={`nav-link${sub.level === 3 ? ' lvl-3' : ''}`}
                                  onClick={() => setOpen(false)}
                                >
                                  {sub.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-foot">
            <a href="/terminal/" className="companion-card">
              <div className="cc-eyebrow">Companion App · Self-hosted</div>
              <div className="cc-title">Terminal Fixer</div>
              <div className="cc-desc">
                Ficha de personaje, calculadora de ATAQUES, resistencias y chequeos. Se hostea
                junto a este manual.
              </div>
              <div className="cc-cta">Abrir Terminal ↗</div>
            </a>
            <div className="credit-line">
              CLASH es un homebrew de fans, sin afiliación con Project Moon.
              <br />
              Lobotomy Corporation, Library of Ruina y Limbus Company © Project Moon.
            </div>
          </div>
        </aside>

        <main className="content">{children}</main>
      </div>
    </>
  );
}
