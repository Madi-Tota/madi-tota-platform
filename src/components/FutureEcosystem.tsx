import { BRAND_IMAGES, ILLUSTRATIVE_CAPTION } from "@/lib/brand";
import { Section, SectionHeading, Note } from "./primitives";
import { useTranslation } from "react-i18next";

/** Future Utlwala ecosystem — every image carries the mandatory governance caption. */
export function FutureEcosystem() {
  const { t } = useTranslation();
  return (
    <Section muted>
      <SectionHeading
        eyebrow="Utlwala Tactical System"
        title={t("ecosystem.title")}
        subtitle={t("ecosystem.subtitle")}
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {BRAND_IMAGES.verticals.map((v) => (
          <figure key={v.src} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={v.src}
                alt={v.alt}
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="space-y-1 p-4">
              <p className="font-display font-bold">{v.title}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {ILLUSTRATIVE_CAPTION}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8">
        <Note variant="warning">
          These are concept renderings only. No operational clinic, depot or store
          exists, and no claim of service delivery is made pre-evidence.
        </Note>
      </div>
    </Section>
  );
}
