import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ScrambleRow } from "@/components/ScrambleRow";
import { Bi, T } from "@/components/T";
import { BRANDS, TIMELINE, type Group } from "@/lib/brands";
import { mono } from "@/lib/fonts";
import { I18N } from "@/lib/i18n";

const GROUPS: { id: Group; idx: string }[] = [
  { id: "lugares", idx: "01" },
  { id: "plataformas", idx: "02" },
  { id: "spirits", idx: "03" },
];

const monthLabel = (date: string, lang: "es" | "en") => `${I18N[lang].months[Number(date.slice(5)) - 1]} ${date.slice(0, 4)}`;

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero fontFamily={mono.style.fontFamily} />

        <section className="intro">
          <p className="label">
            <span className="idx">[00]</span> Archipiélago
          </p>
          <p className="intro__lead">
            <T k="intro.lead" />
          </p>
          <p className="intro__body">
            <T k="intro.body" />
          </p>
        </section>

        <section className="directory" aria-label="Proyectos">
          {GROUPS.map(({ id, idx }) => (
            <div className="directory__group" id={id} key={id}>
              <h2 className="label">
                <span className="idx">[{idx}]</span> <T k={`nav.${id}`} />
              </h2>
              <ul className="directory__list">
                {BRANDS.filter((b) => b.group === id).map((b) => (
                  <li key={b.name}>
                    <ScrambleRow name={b.name} href={b.href} meta={b.year ? `[${b.year}]` : "[—]"} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="manifesto" id="manifesto">
          <h2 className="label">
            <span className="idx">[04]</span> <T k="nav.manifesto" />
          </h2>
          <blockquote className="manifesto__quote">
            <p>
              <T k="manifesto.quote" />
            </p>
          </blockquote>
          <p className="manifesto__body">
            <T k="manifesto.body" />
          </p>
        </section>

        <section className="timeline" aria-labelledby="timeline-title">
          <h2 className="label" id="timeline-title">
            <span className="idx">[—]</span> <T k="timeline.title" />
          </h2>
          <ol className="timeline__list">
            {TIMELINE.map(([date, name]) => (
              <li className="timeline__item" key={`${date}-${name}`}>
                <span className="timeline__date">
                  <Bi es={monthLabel(date, "es")} en={monthLabel(date, "en")} />
                </span>
                <span className="timeline__name">{name}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
