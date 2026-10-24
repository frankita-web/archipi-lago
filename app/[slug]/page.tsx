import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Bi, T } from "@/components/T";
import { BRAND_PAGES, type Bilingual, type BrandPage } from "@/lib/brand-pages";

const GROUP_INDEX = { lugares: "01", plataformas: "02", spirits: "03" } as const;
const LIST = Object.values(BRAND_PAGES);

// Solo existen las páginas de marcas con contenido; cualquier otra URL da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LIST.map((b) => ({ slug: b.slug }));
}

const plain = (html: string) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const brand = BRAND_PAGES[(await params).slug];
  if (!brand) return {};
  const title = `${brand.name} — Archipiélago`;
  const description = plain(brand.desc.es);
  return { title, description, openGraph: { title, description, images: brand.images.slice(0, 1) } };
}

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {children} ↗
    </a>
  );
}

function Lines({ items }: { items: Bilingual[] }) {
  return (
    <p className="info__body">
      {items.map((h) => (
        <span key={h.es}>
          <Bi es={h.es} en={h.en} />
        </span>
      ))}
    </p>
  );
}

function Place({ hours, address, maps, title }: { hours: Bilingual[]; address: string[]; maps: string | null; title?: string }) {
  const prefix = title ? <span className="idx">({title}) </span> : null;
  return (
    <>
      {hours.length > 0 && (
        <div className="info">
          <p className="label">
            {prefix}
            <T k="brand.hours" />
          </p>
          <Lines items={hours} />
        </div>
      )}
      {(address.length > 0 || maps) && (
        <div className="info">
          <p className="label">
            {prefix}
            <T k="brand.location" />
          </p>
          {address.length > 0 && (
            <p className="info__body">
              {address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
          )}
          {maps && (
            <p className="info__link">
              <External href={maps}>
                <T k="brand.map" />
              </External>
            </p>
          )}
        </div>
      )}
    </>
  );
}

function Info({ brand }: { brand: BrandPage }) {
  return (
    <section className="brand__info">
      {brand.locations.length > 0 ? (
        brand.locations.map((loc) => <Place key={loc.name} title={loc.name} hours={loc.hours} address={loc.address} maps={loc.maps} />)
      ) : (
        <Place hours={brand.hours} address={brand.address} maps={brand.maps} />
      )}
      {brand.instagram && (
        <div className="info">
          <p className="label">Instagram</p>
          <p className="info__link">
            <External href={brand.instagram}>@{new URL(brand.instagram).pathname.replace(/\//g, "")}</External>
          </p>
        </div>
      )}
      {brand.links.map((link) => (
        <div className="info" key={link.href}>
          <p className="label">
            <T k={link.kind === "reservar" ? "brand.book" : "brand.site"} />
          </p>
          <p className="info__link">
            <External href={link.href}>{link.kind === "reservar" ? "WhatsApp" : new URL(link.href).hostname.replace(/^www\./, "")}</External>
          </p>
        </div>
      ))}
    </section>
  );
}

export default async function BrandPageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = BRAND_PAGES[slug];
  if (!brand) notFound();
  const i = LIST.indexOf(brand);
  const prev = LIST[(i - 1 + LIST.length) % LIST.length];
  const next = LIST[(i + 1) % LIST.length];
  const [cover, ...gallery] = brand.images;

  return (
    <>
      <Nav />
      <main className="brand">
        <section className="brand__head">
          <p className="label">
            <a href={`/#${brand.group}`}>
              <span className="idx">[{GROUP_INDEX[brand.group]}]</span> <T k={`nav.${brand.group}`} />
            </a>
            {brand.year && <span className="idx"> / [{brand.year}]</span>}
          </p>
          <h1 className="brand__name">{brand.name}</h1>
          <p className="brand__desc">
            <Bi es={brand.desc.es} en={brand.desc.en || brand.desc.es} html />
          </p>
        </section>

        {cover && (
          <figure className="brand__cover">
            <Image src={cover} alt={brand.name} fill priority sizes="100vw" />
          </figure>
        )}

        <Info brand={brand} />

        <section className="gallery" aria-label={brand.name}>
          {gallery.map((src, n) => (
            <figure className={`gallery__item gallery__item--${n % 3}`} key={src}>
              <Image src={src} alt={brand.name} fill sizes={n % 3 === 2 ? "100vw" : "(max-width: 720px) 100vw, 50vw"} />
            </figure>
          ))}
        </section>

        <nav className="pager" aria-label="Marcas">
          <Link className="pager__link" href={`/${prev.slug}/`}>
            <span className="label">
              <span className="idx">←</span> <T k="brand.prev" />
            </span>
            <span className="pager__name">{prev.name}</span>
          </Link>
          <Link className="pager__link pager__link--next" href={`/${next.slug}/`}>
            <span className="label">
              <T k="brand.next" /> <span className="idx">→</span>
            </span>
            <span className="pager__name">{next.name}</span>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
