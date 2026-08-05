import { PageHero, Section, Note } from "@/components/primitives";

/** Legal documents awaiting external counsel sign-off. */
export default function LegalPlaceholder({
  title,
  eyebrow = "Legal",
}: {
  title: string;
  eyebrow?: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <Section>
        <div className="max-w-2xl space-y-6">
          <p className="font-display text-2xl font-bold text-foreground">
            Publication pending legal review.
          </p>
          <Note>
            This document will be published once independent counsel has
            completed its review. Nothing on this prototype constitutes a legal
            notice, an offer, or a credit agreement.
          </Note>
        </div>
      </Section>
    </>
  );
}
