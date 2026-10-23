import { LOGO_PATHS, LOGO_VIEWBOX } from "./logo-paths.js";

const SITE = "https://archipielagomx.com";

const BRANDS = [
  { name: "Leonor", group: "lugares", year: 2008, href: `${SITE}/leonor/` },
  { name: "Cibeles", group: "lugares", year: null },
  { name: "Mezcal Unión", group: "spirits", year: 2011, href: `${SITE}/union/` },
  { name: "La Ventanita", group: "lugares", year: 2012, href: `${SITE}/ventanita/` },
  { name: "Salón ACME", group: "plataformas", year: 2013, href: `${SITE}/salon-acme/` },
  { name: "Trópico", group: "plataformas", year: 2013, href: `${SITE}/tropico/` },
  { name: "Café Paraíso", group: "lugares", year: 2015, href: `${SITE}/cafe-paraiso/` },
  { name: "Bonbón", group: "lugares", year: 2017, href: `${SITE}/bonbon/` },
  { name: "RadioBosque", group: "plataformas", year: 2019, href: `${SITE}/radiobosque/` },
  { name: "Jardín Paraíso", group: "lugares", year: 2020, href: `${SITE}/jardin-paraiso/` },
  { name: "Taverna", group: "lugares", year: 2021, href: `${SITE}/taverna/` },
  { name: "Primo", group: "lugares", year: 2023 },
  { name: "Ayer", group: "lugares", year: 2023 },
  { name: "Abrazarnos", group: "plataformas", year: null },
  { name: "Liga Productora", group: "plataformas", year: null, href: `${SITE}/liga-productora/` },
];

const TIMELINE = [
  ["2008-07", "Leonor"],
  ["2011-03", "Mezcal Unión"],
  ["2012-01", "La Ventanita"],
  ["2013-04", "Salón ACME"],
  ["2013-12", "Trópico"],
  ["2015-11", "Café Paraíso"],
  ["2016-01", "Taller"],
  ["2017-02", "Bonbón"],
  ["2019-11", "RadioBosque"],
  ["2020-10", "Jardín Paraíso"],
  ["2021-05", "Taverna"],
  ["2023-02", "Primo"],
  ["2023-09", "Ayer"],
];

const I18N = {
  es: {
    "nav.lugares": "Lugares",
    "nav.plataformas": "Plataformas",
    "nav.spirits": "Spirits",
    "nav.manifesto": "Manifesto",
    "nav.contacto": "Contacto",
    "hero.hint": matchMedia("(hover: hover)").matches ? "Pasa el cursor sobre las islas" : "Toca las islas",
    "intro.lead":
      "Ecosistema donde creamos e incubamos marcas alrededor de la hospitalidad y las experiencias.",
    "intro.body":
      "Hacemos lugares, restaurantes, bares, clubs, plataformas, festivales, ferias, fiestas, spirits artesanales mexicanos y más cosas que queramos compartir y disfrutar en comunidad.",
    "manifesto.quote":
      "Para los griegos, un archipiélago no se trata de sus islas sino del mar que las rodea.",
    "manifesto.body":
      "Para nosotros tampoco se trata de nuestros proyectos, sino de la comunidad que los vive. Es la excusa perfecta para comer rico, tomar mezcales y bailar sin fin, simplemente por estar conectados.",
    "timeline.title": "Línea del tiempo",
    "hero.count": "Proyectos",
    "footer.follow": "Síguenos",
    "footer.contact": "Escríbenos",
    "nav.home": "Archipiélago, inicio",
    "nav.label": "Principal",
    "lang.label": "Idioma",
    "directory.label": "Proyectos",
    title: "Archipiélago",
    description: "Ecosistema donde creamos e incubamos marcas alrededor de la hospitalidad y las experiencias.",
    soon: "Próximamente",
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  },
  en: {
    "nav.lugares": "Places",
    "nav.plataformas": "Platforms",
    "nav.spirits": "Spirits",
    "nav.manifesto": "Manifesto",
    "nav.contacto": "Contact",
    "hero.hint": matchMedia("(hover: hover)").matches ? "Move your cursor over the islands" : "Touch the islands",
    "intro.lead":
      "An ecosystem where we create and incubate brands around hospitality and experiences.",
    "intro.body":
      "We make places, restaurants, bars, clubs, platforms, festivals, fairs, parties, Mexican craft spirits and anything else we want to share and enjoy as a community.",
    "manifesto.quote":
      "For the Greeks, an archipelago is not about its islands but about the sea that surrounds them.",
    "manifesto.body":
      "For us, it isn't about our projects either, but about the community that lives them. It's the perfect excuse to eat well, drink mezcal and dance endlessly, simply by being connected.",
    "timeline.title": "Timeline",
    "hero.count": "Projects",
    "footer.follow": "Follow us",
    "footer.contact": "Get in touch",
    "nav.home": "Archipiélago, home",
    "nav.label": "Main",
    "lang.label": "Language",
    "directory.label": "Projects",
    title: "Archipiélago",
    description: "An ecosystem where we create and incubate brands around hospitality and experiences.",
    soon: "Coming soon",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ALPHABET = [...new Set(BRANDS.map((b) => b.name.toUpperCase().replace(/\s/g, "")).join(""))];

let lang = "es";

/* ---------- Content ---------- */

function renderDirectory() {
  for (const list of document.querySelectorAll(".directory__list")) {
    list.innerHTML = "";
    for (const brand of BRANDS.filter((b) => b.group === list.dataset.group)) {
      const li = document.createElement("li");
      const row = document.createElement(brand.href ? "a" : "div");
      row.className = "row";
      if (brand.href) {
        row.href = brand.href;
        row.target = "_blank";
        row.rel = "noopener";
      }
      const name = document.createElement("span");
      name.textContent = brand.name;
      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = brand.year ? `[${brand.year}]` : "[—]";
      row.append(name, meta);
      row.addEventListener("mouseenter", () => scramble(name, brand.name));
      row.addEventListener("focus", () => scramble(name, brand.name));
      li.append(row);
      list.append(li);
    }
  }
  document.querySelector(".js-count").textContent = `[${BRANDS.length}]`;
}

function renderTimeline() {
  const list = document.querySelector(".timeline__list");
  const t = I18N[lang];
  list.innerHTML = "";
  for (const [date, name] of TIMELINE) {
    const li = document.createElement("li");
    li.className = "timeline__item" + (date ? "" : " is-soon");
    const label = date ? `${t.months[Number(date.slice(5)) - 1]} ${date.slice(0, 4)}` : `${t.soon}…`;
    li.innerHTML = `<span class="timeline__date"></span><span class="timeline__name"></span>`;
    li.querySelector(".timeline__date").textContent = label;
    li.querySelector(".timeline__name").textContent = name;
    list.append(li);
  }
}

// Las letras pasan por caracteres de otros negocios antes de quedarse quietas.
function scramble(el, text) {
  if (reducedMotion) return;
  cancelAnimationFrame(el._raf);
  const start = performance.now();
  const duration = 420;
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * text.length);
    el.textContent = [...text]
      .map((ch, i) => (i < settled || ch === " " ? ch : ALPHABET[(Math.random() * ALPHABET.length) | 0]))
      .join("");
    if (p < 1) el._raf = requestAnimationFrame(tick);
  };
  el._raf = requestAnimationFrame(tick);
}

function setLang(next) {
  lang = next;
  const t = I18N[next];
  document.documentElement.lang = next;
  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  for (const el of document.querySelectorAll("[data-i18n]")) {
    if (t[el.dataset.i18n]) el.textContent = t[el.dataset.i18n];
  }
  for (const el of document.querySelectorAll("[data-i18n-aria]")) {
    if (t[el.dataset.i18nAria]) el.setAttribute("aria-label", t[el.dataset.i18nAria]);
  }
  for (const btn of document.querySelectorAll("[data-lang]")) {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === next));
  }
  renderTimeline();
}

// Prioridad: ?lang=en en la URL, luego la última elección, luego el idioma del navegador.
function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl in I18N) return fromUrl;
  try {
    const saved = localStorage.getItem("lang");
    if (saved in I18N) return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

document.querySelectorAll("[data-lang]").forEach((btn) =>
  btn.addEventListener("click", () => {
    setLang(btn.dataset.lang);
    try {
      localStorage.setItem("lang", btn.dataset.lang);
    } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", btn.dataset.lang);
    history.replaceState(null, "", url);
  })
);
document.querySelectorAll(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));
renderDirectory();
setLang(initialLang());

/* ---------- Hero: logo hecho de letras ---------- */

const canvas = document.querySelector(".hero__canvas");
const ctx = canvas.getContext("2d");
const label = document.querySelector(".cursor-label");
const FONT_FAMILY = '"JetBrains Mono", ui-monospace, monospace';
const FOREST = "#1e3a2b";

const state = {
  particles: [],
  glyphs: new Map(),
  dpr: 1,
  w: 0,
  h: 0,
  gap: 8,
  fontSize: 10,
  pointer: { x: -9999, y: -9999, active: false },
  hoverBrand: -1,
  start: 0,
  visible: true,
  raf: 0,
};

function buildGlyphs(fontSize, dpr) {
  state.glyphs.clear();
  const size = Math.ceil(fontSize * 1.6 * dpr);
  for (const ch of ALPHABET) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d");
    g.fillStyle = FOREST;
    g.font = `800 ${fontSize * dpr}px ${FONT_FAMILY}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(ch, size / 2, size / 2 + fontSize * dpr * 0.06);
    state.glyphs.set(ch, c);
  }
}

// Caja real del contenido del logo, en unidades del viewBox.
function logoBounds() {
  const [vw, vh] = LOGO_VIEWBOX;
  const k = 8;
  const off = document.createElement("canvas");
  off.width = vw * k;
  off.height = vh * k;
  const g = off.getContext("2d", { willReadFrequently: true });
  g.scale(k, k);
  for (const p of LOGO_PATHS) g.fill(new Path2D(p.d), p.evenodd ? "evenodd" : "nonzero");
  const { data, width, height } = g.getImageData(0, 0, off.width, off.height);
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 64) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { x: minX / k, y: minY / k, w: (maxX - minX) / k, h: (maxY - minY) / k };
}

// Rasteriza el logo dentro de la caja y devuelve puntos sobre las islas y el texto.
function sampleLogo(boxW, boxH, bounds) {
  const scale = Math.min(boxW / bounds.w, boxH / bounds.h);
  const w = Math.ceil(bounds.w * scale) + 2;
  const h = Math.ceil(bounds.h * scale) + 2;
  const gap = Math.max(5, Math.round(w / 150));
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const g = off.getContext("2d", { willReadFrequently: true });
  g.setTransform(scale, 0, 0, scale, 1 - bounds.x * scale, 1 - bounds.y * scale);
  for (const p of LOGO_PATHS) g.fill(new Path2D(p.d), p.evenodd ? "evenodd" : "nonzero");
  const data = g.getImageData(0, 0, w, h).data;

  const points = [];
  const stepX = gap * 0.8;
  for (let y = gap / 2; y < h; y += gap) {
    const row = Math.round(y);
    for (let x = stepX / 2; x < w; x += stepX) {
      if (data[(row * w + Math.round(x)) * 4 + 3] > 100) points.push([x, row]);
    }
  }
  return { points, width: w, height: h, gap };
}

function letterStream() {
  const seq = [];
  for (let i = 0; i < BRANDS.length; i++) {
    for (const ch of BRANDS[i].name.toUpperCase().replace(/\s/g, "")) seq.push([ch, i]);
  }
  return seq;
}

function layout() {
  const rect = canvas.getBoundingClientRect();
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.w = rect.width;
  state.h = rect.height;
  canvas.width = Math.round(rect.width * state.dpr);
  canvas.height = Math.round(rect.height * state.dpr);

  const boxW = state.w * (state.w < 720 ? 0.96 : 0.74);
  const boxH = state.h - (state.w < 720 ? 220 : 200);
  state.bounds ||= logoBounds();
  const { points, width, height, gap } = sampleLogo(boxW, boxH, state.bounds);
  state.gap = gap;
  state.fontSize = gap * 1.3;
  const ox = (state.w - width) / 2;
  const oy = (state.h - height) / 2 + 10;
  const stream = letterStream();
  const prev = state.particles;
  const firstBuild = prev.length === 0;

  state.particles = points.map(([x, y], i) => {
    const [ch, brand] = stream[i % stream.length];
    const tx = ox + x;
    const ty = oy + y;
    const old = prev[i];
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.max(state.w, state.h) * (0.55 + Math.random() * 0.5);
    return {
      ch,
      brand,
      tx,
      ty,
      x: old ? old.x : firstBuild && !reducedMotion ? state.w / 2 + Math.cos(angle) * radius : tx,
      y: old ? old.y : firstBuild && !reducedMotion ? state.h / 2 + Math.sin(angle) * radius : ty,
      vx: 0,
      vy: 0,
      rot: firstBuild && !reducedMotion ? (Math.random() - 0.5) * 6 : 0,
      vr: 0,
      scale: 1,
      alpha: firstBuild && !reducedMotion ? 0 : 1,
      // Se van formando de izquierda a derecha, como una ola.
      delay: firstBuild ? (x / width) * 1100 + Math.random() * 500 : 0,
      phase: x * 0.018 + y * 0.011,
    };
  });

  buildGlyphs(state.fontSize, state.dpr);
}

function findBrandUnderPointer() {
  const { x, y, active } = state.pointer;
  if (!active) return -1;
  const reach = state.gap * 2.2;
  let best = -1;
  let bestD = reach * reach;
  for (const p of state.particles) {
    const dx = p.tx - x;
    const dy = p.ty - y;
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      best = p.brand;
    }
  }
  return best;
}

function frame(now) {
  state.raf = 0;
  const t = now - state.start;
  const { x: mx, y: my, active } = state.pointer;
  const radius = Math.max(70, state.gap * 11);
  const r2 = radius * radius;
  const hover = state.hoverBrand;
  const size = state.glyphs.values().next().value?.width / state.dpr || 0;
  const half = size / 2;
  const dpr = state.dpr;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of state.particles) {
    const live = t > p.delay;
    if (live) {
      const wave = reducedMotion ? 0 : Math.sin(t * 0.0012 + p.phase) * state.gap * 0.12;
      let ax = (p.tx - p.x) * 0.045;
      let ay = (p.ty + wave - p.y) * 0.045;
      let targetScale = 1;

      if (active && !reducedMotion) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / radius) ** 2;
          ax += (dx / d) * f * 9;
          ay += (dy / d) * f * 9;
          p.vr += (dx > 0 ? 1 : -1) * f * 0.04;
          targetScale = 1 + f * 1.4;
        }
      }

      p.vx = (p.vx + ax) * 0.82;
      p.vy = (p.vy + ay) * 0.82;
      p.x += p.vx;
      p.y += p.vy;
      p.vr = (p.vr - p.rot * 0.05) * 0.86;
      p.rot += p.vr;
      p.scale += (targetScale - p.scale) * 0.2;

      const targetAlpha = hover === -1 || hover === p.brand ? 1 : 0.18;
      p.alpha += (targetAlpha - p.alpha) * 0.12;
    }
    if (p.alpha < 0.01) continue;

    const glyph = state.glyphs.get(p.ch);
    const s = p.scale * (hover === p.brand ? 1.25 : 1);
    const cos = Math.cos(p.rot) * s * dpr;
    const sin = Math.sin(p.rot) * s * dpr;
    ctx.globalAlpha = p.alpha;
    ctx.setTransform(cos, sin, -sin, cos, p.x * dpr, p.y * dpr);
    ctx.drawImage(glyph, -half, -half, size, size);
  }
  ctx.globalAlpha = 1;

  if (state.visible) state.raf = requestAnimationFrame(frame);
}

function requestFrame() {
  if (!state.raf && state.visible) state.raf = requestAnimationFrame(frame);
}

function updatePointer(e) {
  const rect = canvas.getBoundingClientRect();
  state.pointer.x = e.clientX - rect.left;
  state.pointer.y = e.clientY - rect.top;
  state.pointer.active = true;

  const brand = findBrandUnderPointer();
  state.hoverBrand = brand;
  if (brand >= 0) {
    label.textContent = BRANDS[brand].name;
    label.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
    label.classList.add("is-visible");
    canvas.style.cursor = BRANDS[brand].href ? "pointer" : "default";
  } else {
    label.classList.remove("is-visible");
    canvas.style.cursor = "default";
  }
}

function clearPointer() {
  state.pointer.active = false;
  state.hoverBrand = -1;
  label.classList.remove("is-visible");
}

canvas.addEventListener("pointermove", updatePointer);
canvas.addEventListener("pointerdown", updatePointer);
canvas.addEventListener("pointerleave", clearPointer);
canvas.addEventListener("pointercancel", clearPointer);
window.addEventListener("scroll", () => state.pointer.active && clearPointer(), { passive: true });
canvas.addEventListener("click", () => {
  const brand = BRANDS[state.hoverBrand];
  if (brand?.href && matchMedia("(hover: hover)").matches) window.open(brand.href, "_blank", "noopener");
});

new IntersectionObserver(([entry]) => {
  state.visible = entry.isIntersecting;
  requestFrame();
}).observe(canvas);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const before = state.w;
    // En móvil la barra de direcciones cambia la altura al hacer scroll; solo re-calculamos si cambia el ancho.
    if (Math.abs(canvas.getBoundingClientRect().width - before) < 1 && state.particles.length) return;
    layout();
    requestFrame();
  }, 150);
});

document.fonts.load(`800 20px ${FONT_FAMILY}`).finally(() => {
  layout();
  state.start = performance.now();
  requestFrame();
});
