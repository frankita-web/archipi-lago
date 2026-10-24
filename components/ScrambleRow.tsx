"use client";

import Link from "next/link";
import { useRef } from "react";
import { ALPHABET } from "@/lib/brands";

// Al pasar el cursor, las letras pasan por caracteres de otras marcas antes de quedarse quietas.
export function ScrambleRow({ name, href, meta }: { name: string; href: string | null; meta: string }) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);

  function scramble() {
    const el = nameRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 420);
      const settled = Math.floor(p * name.length);
      el.textContent = [...name]
        .map((ch, i) => (i < settled || ch === " " ? ch : ALPHABET[(Math.random() * ALPHABET.length) | 0]))
        .join("");
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  const content = (
    <>
      <span ref={nameRef}>{name}</span>
      <span className="meta">{meta}</span>
    </>
  );
  return href ? (
    <Link className="row" href={href} onMouseEnter={scramble} onFocus={scramble}>
      {content}
    </Link>
  ) : (
    <div className="row" onMouseEnter={scramble}>
      {content}
    </div>
  );
}
