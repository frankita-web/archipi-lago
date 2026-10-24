import type { Metadata, Viewport } from "next";
import { mono, sans } from "@/lib/fonts";
import "./globals.css";

// Dominio para las URLs absolutas de las imágenes al compartir en redes.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Archipiélago",
  description: "Ecosistema donde creamos e incubamos marcas alrededor de la hospitalidad y las experiencias.",
  icons: { icon: "/assets/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Elige el idioma antes de pintar: ?lang=en en la URL, luego la última elección, luego el navegador.
const LANG_SCRIPT = `(function(){try{var ok=function(l){return l==="es"||l==="en"};var q=new URLSearchParams(location.search).get("lang");var s=null;try{s=localStorage.getItem("lang")}catch(e){}document.documentElement.lang=ok(q)?q:ok(s)?s:((navigator.language||"").toLowerCase().indexOf("es")===0?"es":"en")}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
