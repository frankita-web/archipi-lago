"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ALPHABET, BRANDS, FACEBOOK, INSTAGRAM } from "@/lib/brands";
import { startLetterLogo } from "@/lib/letter-logo";
import { T } from "./T";

export function Hero({ fontFamily }: { fontFamily: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Al cargar, la página arranca en el logo (o en la sección del #ancla si viene en la URL).
    // Va sin animación: con scroll-behavior: smooth, Safari dejaba la página a medio camino.
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const logo = startLetterLogo({
      canvas: canvasRef.current!,
      label: labelRef.current!,
      brands: BRANDS,
      alphabet: ALPHABET,
      fontFamily,
      onNavigate: (href) => router.push(href),
    });
    logo.ready.then(() => setLoaded(true));
    return () => logo.stop();
  }, [fontFamily, router]);

  return (
    <section className="hero" aria-label="Archipiélago">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <h1 className="visually-hidden">Archipiélago</h1>
      <div className={`hero__bar${loaded ? " is-loaded" : ""}`}>
        <p className="hero__hint">
          <span className="hero__dot" aria-hidden="true" />
          <span className="hint-hover">
            <T k="hero.hint" />
          </span>
          <span className="hint-touch">
            <T k="hero.hint.touch" />
          </span>
        </p>
        <p className="hero__meta">
          [{BRANDS.length}] <T k="hero.count" /> &nbsp;·&nbsp; CDMX <span className="dim">[2008—{new Date().getFullYear()}]</span>
        </p>
        <p className="hero__social">
          <a href={INSTAGRAM} target="_blank" rel="noopener">
            Instagram ↗
          </a>
          <a href={FACEBOOK} target="_blank" rel="noopener">
            Facebook ↗
          </a>
        </p>
      </div>
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </section>
  );
}
