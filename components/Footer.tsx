import Image from "next/image";
import { CONTACT, FACEBOOK, INSTAGRAM } from "@/lib/brands";
import { LangSwitch } from "./LangSwitch";
import { T } from "./T";

export function Footer() {
  return (
    <footer className="footer" id="contacto">
      <h2 className="label">
        <span className="idx">[05]</span> <T k="footer.follow" />
      </h2>
      <div className="footer__social">
        <a className="social-card" href={INSTAGRAM} target="_blank" rel="noopener">
          <span className="social-card__name">Instagram</span>
          <span className="social-card__handle">@archipielagomx ↗</span>
        </a>
        <a className="social-card" href={FACEBOOK} target="_blank" rel="noopener">
          <span className="social-card__name">Facebook</span>
          <span className="social-card__handle">/Archipielagomx ↗</span>
        </a>
      </div>
      <div className="footer__bottom">
        <Image className="footer__logo" src="/assets/logo.svg" alt="Archipiélago" width={226} height={154} />
        <a className="footer__contact" href={CONTACT} target="_blank" rel="noopener">
          <T k="footer.contact" /> ↗
        </a>
        <LangSwitch labels={{ es: "Español", en: "English" }} />
        <p className="footer__copy">©Archipiélago {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
