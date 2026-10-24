"use client";

import { useSyncExternalStore } from "react";
import type { Lang } from "@/lib/i18n";

// El idioma vive en <html lang>; lo fija antes de pintar el script de app/layout.tsx.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  return () => observer.disconnect();
}

const getLang = () => (document.documentElement.lang === "en" ? "en" : "es") as Lang;

function setLang(lang: Lang) {
  document.documentElement.lang = lang;
  try {
    localStorage.setItem("lang", lang);
  } catch {}
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(history.state, "", url);
}

export function LangSwitch({ labels = { es: "ES", en: "EN" } }: { labels?: Record<Lang, string> }) {
  const lang = useSyncExternalStore(subscribe, getLang, () => "es" as Lang);
  return (
    <div className="lang-switch" role="group" aria-label="Idioma / Language">
      {(["es", "en"] as const).map((l, i) => (
        <span key={l} className="lang-switch__item">
          {i > 0 && <span aria-hidden="true">/</span>}
          <button type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
            {labels[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
