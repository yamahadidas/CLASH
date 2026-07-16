'use client';

import { useEffect, useState } from 'react';

export default function ManualEffects() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // ---------- active nav highlight ----------
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.doc-section[id]'));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link[data-slug]'));
    const linkBySlug: Record<string, HTMLAnchorElement> = {};
    navLinks.forEach((a) => {
      if (a.dataset.slug) linkBySlug[a.dataset.slug] = a;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const slug = entry.target.id.replace('sec-', '');
          const link = linkBySlug[slug];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
            link.scrollIntoView({ block: 'nearest' });
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    // ---------- back to top visibility ----------
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---------- direct hash on load ----------
    if (location.hash) {
      setTimeout(() => {
        const t = document.querySelector(location.hash);
        if (t) t.scrollIntoView({ block: 'start' });
      }, 60);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={`back-top${showTop ? ' show' : ''}`}
      title="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </div>
  );
}
