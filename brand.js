import { bindLangButtons } from "./lang.js";

// Las páginas de marca traen ambos idiomas en el HTML; el CSS muestra el activo según <html lang>.
bindLangButtons((lang) => {
  document.documentElement.lang = lang;
});
document.querySelectorAll(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));
