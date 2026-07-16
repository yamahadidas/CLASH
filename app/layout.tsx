import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CLASH — Pulperian Edition',
  description:
    'Manual homebrew de rol para La Ciudad — Fixers, Alas, Sindicatos, y la clase de violencia que solo el capitalismo hiper-avanzado puede producir. Ambientado en el universo de Project Moon.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Oswald:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
