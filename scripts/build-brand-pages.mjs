// Genera /<slug>/index.html para cada marca a partir de data/brand-pages.js.
// Reutiliza el header y footer de index.html para que no se dupliquen.
// Uso: node scripts/build-brand-pages.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BRAND_PAGES } from "../data/brand-pages.js";
import { I18N } from "../i18n.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const index = readFileSync(join(root, "index.html"), "utf8");

const GROUP_INDEX = { lugares: "01", plataformas: "02", spirits: "03" };
const GROUP_KEY = { lugares: "nav.lugares", plataformas: "nav.plataformas", spirits: "nav.spirits" };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
// Texto bilingüe: el CSS muestra solo el idioma activo.
const bi = (es, en) => `<span class="only-es">${es}</span><span class="only-en">${en}</span>`;
const t = (key) => bi(esc(I18N.es[key]), esc(I18N.en[key]));

function section(html, tag, className) {
  const start = html.indexOf(`<${tag} class="${className}"`);
  const end = html.indexOf(`</${tag}>`, start) + `</${tag}>`.length;
  if (start < 0 || end < start) throw new Error(`No encontré <${tag} class="${className}"> en index.html`);
  return html.slice(start, end);
}

// Header y footer de la portada, con anclas absolutas y textos bilingües estáticos.
function shared(html) {
  return html
    .replace(/href="#/g, 'href="/#')
    .replace(/<span data-i18n="([^"]+)">[^<]*<\/span>/g, (_, key) => t(key))
    .replace(/<(h2|p|a)([^>]*) data-i18n="([^"]+)">[^<]*<\/\1>/g, (_, tag, attrs, key) => `<${tag}${attrs}>${t(key)}</${tag}>`)
    .replace(/src="assets\//g, 'src="/assets/');
}

const header = shared(section(index, "header", "nav"));
const footer = shared(section(index, "footer", "footer"));

const external = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener">${label} ↗</a>`;
const lines = (items) => items.map((l) => `<span>${l}</span>`).join("");

function infoBlocks(b) {
  const blocks = [];
  const place = (hours, address, maps, title = "") => {
    const parts = [];
    if (hours.length) parts.push(`<div class="info"><p class="label">${title}${t("brand.hours")}</p><p class="info__body">${lines(hours.map((h) => bi(esc(h.es), esc(h.en))))}</p></div>`);
    if (address.length || maps) {
      const addr = address.length ? `<p class="info__body">${lines(address.map(esc))}</p>` : "";
      const map = maps ? `<p class="info__link">${external(maps, t("brand.map"))}</p>` : "";
      parts.push(`<div class="info"><p class="label">${title}${t("brand.location")}</p>${addr}${map}</div>`);
    }
    return parts;
  };
  if (b.locations.length) {
    for (const loc of b.locations) blocks.push(...place(loc.hours, loc.address, loc.maps, `<span class="idx">(${esc(loc.name)})</span> `));
  } else {
    blocks.push(...place(b.hours, b.address, b.maps));
  }
  if (b.instagram) {
    const handle = "@" + new URL(b.instagram).pathname.replace(/\//g, "");
    blocks.push(`<div class="info"><p class="label">Instagram</p><p class="info__link">${external(b.instagram, esc(handle))}</p></div>`);
  }
  for (const link of b.links) {
    const label = link.kind === "reservar" ? t("brand.book") : t("brand.site");
    const shown = link.kind === "reservar" ? "WhatsApp" : esc(new URL(link.href).hostname.replace(/^www\./, ""));
    blocks.push(`<div class="info"><p class="label">${label}</p><p class="info__link">${external(link.href, shown)}</p></div>`);
  }
  return blocks.join("\n        ");
}

function gallery(b) {
  return b.images
    .slice(1)
    .map((src, i) => `<figure class="gallery__item gallery__item--${i % 3}"><img src="${src}" alt="${esc(b.name)}" loading="lazy" decoding="async" /></figure>`)
    .join("\n      ");
}

function page(b, prev, next) {
  const desc = plain(b.desc.es);
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(b.name)} — Archipiélago</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:title" content="${esc(b.name)} — Archipiélago" />
  <meta property="og:description" content="${esc(desc)}" />
  ${b.images[0] ? `<meta property="og:image" content="${b.images[0]}" />` : ""}
  <meta name="theme-color" content="#ffffff" />
  <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="brand-page">
  <!-- Generado por scripts/build-brand-pages.mjs; edita data/brand-pages.js y vuelve a correrlo. -->
  ${header}

  <main class="brand">
    <section class="brand__head">
      <p class="label"><a href="/#${b.group}"><span class="idx">[${GROUP_INDEX[b.group]}]</span> ${t(GROUP_KEY[b.group])}</a>${b.year ? ` <span class="idx">/ [${b.year}]</span>` : ""}</p>
      <h1 class="brand__name">${esc(b.name)}</h1>
      <p class="brand__desc">${bi(b.desc.es, b.desc.en || b.desc.es)}</p>
    </section>

    ${b.images[0] ? `<figure class="brand__cover"><img src="${b.images[0]}" alt="${esc(b.name)}" fetchpriority="high" /></figure>` : ""}

    <section class="brand__info">
        ${infoBlocks(b)}
    </section>

    <section class="gallery" aria-label="${esc(b.name)}">
      ${gallery(b)}
    </section>

    <nav class="pager" aria-label="Marcas">
      <a class="pager__link" href="/${prev.slug}/"><span class="label"><span class="idx">←</span> ${t("brand.prev")}</span><span class="pager__name">${esc(prev.name)}</span></a>
      <a class="pager__link pager__link--next" href="/${next.slug}/"><span class="label">${t("brand.next")} <span class="idx">→</span></span><span class="pager__name">${esc(next.name)}</span></a>
    </nav>
  </main>

  ${footer}

  <script type="module" src="/brand.js"></script>
</body>
</html>
`;
}

const list = Object.values(BRAND_PAGES);
list.forEach((b, i) => {
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  mkdirSync(join(root, b.slug), { recursive: true });
  writeFileSync(join(root, b.slug, "index.html"), page(b, prev, next));
  console.log(`/${b.slug}/`);
});
