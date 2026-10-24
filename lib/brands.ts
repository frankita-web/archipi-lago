import { BRAND_PAGES } from "./brand-pages";

export type Group = "lugares" | "plataformas" | "spirits";

export type Brand = {
  name: string;
  group: Group;
  year: number | null;
  // Solo las marcas con página interna tienen slug y href.
  slug?: string;
  href: string | null;
};

// Todas las marcas del archipiélago; también son las letras que forman el logo de la portada.
export const BRANDS: Brand[] = (
  [
    { name: "Leonor", group: "lugares", year: 2008, slug: "leonor" },
    { name: "Cibeles", group: "lugares", year: null },
    { name: "Mezcal Unión", group: "spirits", year: 2011, slug: "union" },
    { name: "Primo Aperitivo", group: "spirits", year: null },
    { name: "La Ventanita", group: "lugares", year: 2012, slug: "ventanita" },
    { name: "Salón ACME", group: "plataformas", year: 2013, slug: "salon-acme" },
    { name: "Trópico", group: "plataformas", year: 2013, slug: "tropico" },
    { name: "Café Paraíso", group: "lugares", year: 2015, slug: "cafe-paraiso" },
    { name: "Bonbón", group: "lugares", year: 2017, slug: "bonbon" },
    { name: "RadioBosque", group: "plataformas", year: 2019, slug: "radiobosque" },
    { name: "Jardín Paraíso", group: "lugares", year: 2020, slug: "jardin-paraiso" },
    { name: "Taverna", group: "lugares", year: 2021, slug: "taverna" },
    { name: "Primo", group: "lugares", year: 2023 },
    { name: "Ayer", group: "lugares", year: 2023 },
    { name: "Abrazarnos", group: "plataformas", year: null },
    { name: "Liga Productora", group: "plataformas", year: null, slug: "liga-productora" },
  ] satisfies Omit<Brand, "href">[]
).map((b) => ({ ...b, href: b.slug && BRAND_PAGES[b.slug] ? `/${b.slug}/` : null }));

// [año-mes, nombre]
export const TIMELINE: [string, string][] = [
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

// Letras únicas de todos los nombres (para el logo y el efecto de letras revueltas).
export const ALPHABET = [...new Set(BRANDS.map((b) => b.name.toUpperCase().replace(/\s/g, "")).join(""))];

export const INSTAGRAM = "https://instagram.com/archipielagomx";
export const FACEBOOK = "https://www.facebook.com/Archipielagomx/";
export const CONTACT = "https://archipielagomx.com/contacto/";
