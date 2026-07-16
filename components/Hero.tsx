export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-stamp">
        Documento
        <br />
        No Oficial
        <br />
        Uso Interno
      </div>
      <div className="hero-inner">
        <div className="hero-eyebrow">Ambientado en el universo de Project Moon</div>
        <h1>CLASH</h1>
        <div className="sub">Pulperian Edition</div>
        <p className="tag">
          Manual homebrew de rol para La Ciudad — Fixers, Alas, Sindicatos, y la clase de
          violencia que solo el capitalismo hiper-avanzado puede producir. Contiene lenguaje
          explícito.
        </p>
        <div className="hero-actions">
          <a href="#sec-introduccion" className="btn btn-primary">
            Empezar a leer ↓
          </a>
          <a href="/terminal/" className="btn btn-ghost">
            Terminal Fixer (Companion App) ↗
          </a>
        </div>
      </div>
    </div>
  );
}
