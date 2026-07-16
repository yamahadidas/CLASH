'use client';

export default function OpenInNewTab({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const frame = document.querySelector<HTMLIFrameElement>('iframe.terminal-frame');
        const html = frame?.srcdoc;
        if (!html) return;
        const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
        window.open(url, '_blank', 'noopener');
      }}
    >
      Abrir en pestaña nueva ↗
    </button>
  );
}