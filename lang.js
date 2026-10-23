// Idioma compartido entre la portada y las páginas de cada marca.
export const LANGS = ["es", "en"];

// Prioridad: ?lang=en en la URL, luego la última elección, luego el idioma del navegador.
export function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

// Conecta los botones [data-lang]; onChange aplica el idioma a la página.
export function bindLangButtons(onChange) {
  const mark = (lang) => {
    for (const btn of document.querySelectorAll("[data-lang]")) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    }
  };
  for (const btn of document.querySelectorAll("[data-lang]")) {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      try {
        localStorage.setItem("lang", lang);
      } catch {}
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
      mark(lang);
      onChange(lang);
    });
  }
  const lang = initialLang();
  mark(lang);
  onChange(lang);
}
