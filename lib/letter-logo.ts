// Logo de Archipiélago hecho con las letras de todas las marcas.
// Las letras llegan volando, forman el logo y reaccionan al cursor; al pasar sobre una letra
// se resaltan todas las de esa marca.
import { LOGO_PATHS, LOGO_VIEWBOX } from "./logo-paths";

const FOREST = "#1e3a2b";

type LogoBrand = { name: string; href: string | null };

type Options = {
  canvas: HTMLCanvasElement;
  label: HTMLElement;
  brands: LogoBrand[];
  alphabet: string[];
  fontFamily: string;
  onNavigate: (href: string) => void;
};

type Particle = {
  ch: string;
  brand: number;
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  scale: number;
  alpha: number;
  delay: number;
  phase: number;
};

type Bounds = { x: number; y: number; w: number; h: number };

function fillLogo(g: CanvasRenderingContext2D) {
  for (const p of LOGO_PATHS) g.fill(new Path2D(p.d), p.evenodd ? "evenodd" : "nonzero");
}

// Caja real del contenido del logo, en unidades del viewBox.
function logoBounds(): Bounds {
  const [vw, vh] = LOGO_VIEWBOX;
  const k = 8;
  const off = document.createElement("canvas");
  off.width = vw * k;
  off.height = vh * k;
  const g = off.getContext("2d", { willReadFrequently: true })!;
  g.scale(k, k);
  fillLogo(g);
  const { data, width, height } = g.getImageData(0, 0, off.width, off.height);
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
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
function sampleLogo(boxW: number, boxH: number, bounds: Bounds) {
  const scale = Math.min(boxW / bounds.w, boxH / bounds.h);
  const w = Math.ceil(bounds.w * scale) + 2;
  const h = Math.ceil(bounds.h * scale) + 2;
  const gap = Math.max(5, Math.round(w / 150));
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const g = off.getContext("2d", { willReadFrequently: true })!;
  g.setTransform(scale, 0, 0, scale, 1 - bounds.x * scale, 1 - bounds.y * scale);
  fillLogo(g);
  const data = g.getImageData(0, 0, w, h).data;

  const points: [number, number][] = [];
  const stepX = gap * 0.8;
  for (let y = gap / 2; y < h; y += gap) {
    const row = Math.round(y);
    for (let x = stepX / 2; x < w; x += stepX) {
      if (data[(row * w + Math.round(x)) * 4 + 3] > 100) points.push([x, row]);
    }
  }
  return { points, width: w, height: h, gap };
}

// Caja disponible para el logo dentro del hero.
function logoBox(w: number, h: number): [number, number] {
  return [w * (w < 720 ? 0.96 : 0.74), h - (w < 720 ? 220 : 200)];
}

export function startLetterLogo({ canvas, label, brands, alphabet, fontFamily, onNavigate }: Options) {
  const ctx = canvas.getContext("2d")!;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stream: [string, number][] = brands.flatMap((b, i) =>
    [...b.name.toUpperCase().replace(/\s/g, "")].map((ch): [string, number] => [ch, i])
  );

  let particles: Particle[] = [];
  const glyphs = new Map<string, HTMLCanvasElement>();
  let bounds: Bounds | null = null;
  let dpr = 1;
  let w = 0;
  let h = 0;
  let gap = 8;
  const pointer = { x: -9999, y: -9999, active: false };
  let hoverBrand = -1;
  let start = Infinity;
  let visible = true;
  let raf = 0;
  let disposed = false;

  function buildGlyphs(fontSize: number) {
    glyphs.clear();
    const size = Math.ceil(fontSize * 1.6 * dpr);
    for (const ch of alphabet) {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const g = c.getContext("2d")!;
      g.fillStyle = FOREST;
      g.font = `800 ${fontSize * dpr}px ${fontFamily}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(ch, size / 2, size / 2 + fontSize * dpr * 0.06);
      glyphs.set(ch, c);
    }
  }

  function layout() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const [boxW, boxH] = logoBox(w, h);
    bounds ??= logoBounds();
    const sample = sampleLogo(boxW, boxH, bounds);
    gap = sample.gap;
    const ox = (w - sample.width) / 2;
    const oy = (h - sample.height) / 2 + 10;
    const prev = particles;
    const firstBuild = prev.length === 0;

    particles = sample.points.map(([x, y], i) => {
      const [ch, brand] = stream[i % stream.length];
      const tx = ox + x;
      const ty = oy + y;
      const old = prev[i];
      // Al cargar, cada letra llega desde fuera de la pantalla.
      const intro = firstBuild && !reducedMotion;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.max(w, h) * (0.55 + Math.random() * 0.5);
      return {
        ch,
        brand,
        tx,
        ty,
        x: old ? old.x : intro ? w / 2 + Math.cos(angle) * radius : tx,
        y: old ? old.y : intro ? h / 2 + Math.sin(angle) * radius : ty,
        vx: 0,
        vy: 0,
        rot: intro ? (Math.random() - 0.5) * 6 : 0,
        vr: 0,
        scale: 1,
        alpha: intro ? 0 : 1,
        // Se van formando de izquierda a derecha, como una ola.
        delay: firstBuild ? (x / sample.width) * 1100 + Math.random() * 500 : 0,
        phase: x * 0.018 + y * 0.011,
      };
    });

    buildGlyphs(gap * 1.3);
  }

  function findBrandUnderPointer() {
    if (!pointer.active) return -1;
    const reach = gap * 2.2;
    let best = -1;
    let bestD = reach * reach;
    for (const p of particles) {
      const dx = p.tx - pointer.x;
      const dy = p.ty - pointer.y;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = p.brand;
      }
    }
    return best;
  }

  function frame(now: number) {
    raf = 0;
    const t = now - start;
    const radius = Math.max(70, gap * 11);
    const r2 = radius * radius;
    const hover = hoverBrand;
    const first = glyphs.values().next().value;
    const size = first ? first.width / dpr : 0;
    const half = size / 2;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      if (t > p.delay) {
        const wave = reducedMotion ? 0 : Math.sin(t * 0.0012 + p.phase) * gap * 0.12;
        let ax = (p.tx - p.x) * 0.045;
        let ay = (p.ty + wave - p.y) * 0.045;
        let targetScale = 1;

        if (pointer.active && !reducedMotion) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
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

      const glyph = glyphs.get(p.ch);
      if (!glyph) continue;
      const s = p.scale * (hover === p.brand ? 1.25 : 1);
      const cos = Math.cos(p.rot) * s * dpr;
      const sin = Math.sin(p.rot) * s * dpr;
      ctx.globalAlpha = p.alpha;
      ctx.setTransform(cos, sin, -sin, cos, p.x * dpr, p.y * dpr);
      ctx.drawImage(glyph, -half, -half, size, size);
    }
    ctx.globalAlpha = 1;

    if (visible && !disposed) raf = requestAnimationFrame(frame);
  }

  function requestFrame() {
    if (!raf && visible && !disposed) raf = requestAnimationFrame(frame);
  }

  function updatePointer(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;

    hoverBrand = findBrandUnderPointer();
    const brand = brands[hoverBrand];
    if (brand) {
      label.textContent = brand.name;
      label.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
      label.classList.add("is-visible");
      canvas.style.cursor = brand.href ? "pointer" : "default";
    } else {
      label.classList.remove("is-visible");
      canvas.style.cursor = "default";
    }
  }

  function clearPointer() {
    pointer.active = false;
    hoverBrand = -1;
    label.classList.remove("is-visible");
  }

  function onScroll() {
    if (pointer.active) clearPointer();
  }

  function onClick() {
    const href = brands[hoverBrand]?.href;
    if (href && window.matchMedia("(hover: hover)").matches) onNavigate(href);
  }

  let resizeTimer = 0;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      // En móvil la barra de direcciones cambia la altura al hacer scroll; solo re-calculamos si cambia el ancho.
      if (Math.abs(canvas.getBoundingClientRect().width - w) < 1 && particles.length) return;
      layout();
      requestFrame();
    }, 150);
  }

  canvas.addEventListener("pointermove", updatePointer);
  canvas.addEventListener("pointerdown", updatePointer);
  canvas.addEventListener("pointerleave", clearPointer);
  canvas.addEventListener("pointercancel", clearPointer);
  canvas.addEventListener("click", onClick);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    requestFrame();
  });
  observer.observe(canvas);

  const ready = document.fonts
    .load(`800 20px ${fontFamily}`)
    .catch(() => [])
    .then(() => {
      if (disposed) return;
      layout();
      start = performance.now();
      requestFrame();
    });

  return {
    ready,
    stop() {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerdown", updatePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
      canvas.removeEventListener("pointercancel", clearPointer);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    },
  };
}
