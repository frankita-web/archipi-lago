// Textos en español e inglés de todo el sitio.
export const I18N = {
  es: {
    "nav.lugares": "Lugares",
    "nav.plataformas": "Plataformas",
    "nav.spirits": "Spirits",
    "nav.manifesto": "Manifesto",
    "nav.contacto": "Contacto",
    "hero.hint": "Pasa el cursor sobre las islas",
    "hero.hint.touch": "Toca las islas",
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
    "nav.label": "Principal",
    "lang.label": "Idioma",
    "directory.label": "Proyectos",
    title: "Archipiélago",
    description: "Ecosistema donde creamos e incubamos marcas alrededor de la hospitalidad y las experiencias.",
    soon: "Próximamente",
    "brand.hours": "Horarios",
    "brand.location": "Ubicación",
    "brand.map": "Ver en mapa",
    "brand.site": "Sitio oficial",
    "brand.book": "Reservar",
    "brand.prev": "Anterior",
    "brand.next": "Siguiente",
    "brand.back": "Volver al archipiélago",
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  },
  en: {
    "nav.lugares": "Places",
    "nav.plataformas": "Platforms",
    "nav.spirits": "Spirits",
    "nav.manifesto": "Manifesto",
    "nav.contacto": "Contact",
    "hero.hint": "Move your cursor over the islands",
    "hero.hint.touch": "Touch the islands",
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
    "nav.label": "Main",
    "lang.label": "Language",
    "directory.label": "Projects",
    title: "Archipiélago",
    description: "An ecosystem where we create and incubate brands around hospitality and experiences.",
    soon: "Coming soon",
    "brand.hours": "Hours",
    "brand.location": "Location",
    "brand.map": "View on map",
    "brand.site": "Official site",
    "brand.book": "Book",
    "brand.prev": "Previous",
    "brand.next": "Next",
    "brand.back": "Back to the archipelago",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
} as const;

export type Lang = keyof typeof I18N;
export type TextKey = { [K in keyof (typeof I18N)["es"]]: (typeof I18N)["es"][K] extends string ? K : never }[keyof (typeof I18N)["es"]];
