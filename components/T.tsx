import { I18N, type TextKey } from "@/lib/i18n";

// El HTML trae ambos idiomas; el CSS muestra solo el de <html lang>, así no hay parpadeo ni JS extra.
export function Bi({ es, en, html = false }: { es: string; en: string; html?: boolean }) {
  if (html) {
    return (
      <>
        <span className="only-es" dangerouslySetInnerHTML={{ __html: es }} />
        <span className="only-en" dangerouslySetInnerHTML={{ __html: en }} />
      </>
    );
  }
  return (
    <>
      <span className="only-es">{es}</span>
      <span className="only-en">{en}</span>
    </>
  );
}

export function T({ k }: { k: TextKey }) {
  return <Bi es={I18N.es[k]} en={I18N.en[k]} />;
}
