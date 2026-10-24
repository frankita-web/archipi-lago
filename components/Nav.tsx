import { LangSwitch } from "./LangSwitch";
import { T } from "./T";

export function Nav() {
  return (
    <header className="nav">
      <nav className="nav__side nav__side--left" aria-label="Principal">
        <a href="/#lugares">
          <span className="idx">[01]</span> <T k="nav.lugares" />
        </a>
        <a href="/#plataformas">
          <span className="idx">[02]</span> <T k="nav.plataformas" />
        </a>
        <a href="/#spirits">
          <span className="idx">[03]</span> <T k="nav.spirits" />
        </a>
      </nav>
      <div className="nav__side nav__side--right">
        <a href="/#manifesto">
          <span className="idx">[04]</span> <T k="nav.manifesto" />
        </a>
        <a href="/#contacto">
          <span className="idx">[05]</span> <T k="nav.contacto" />
        </a>
        <LangSwitch />
      </div>
    </header>
  );
}
