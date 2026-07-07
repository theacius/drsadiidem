import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <Container className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-24 lg:pb-16 max-w-3xl">
        {eyebrow && (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-balance">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 text-base sm:text-lg text-[var(--color-ink-700)] text-pretty max-w-2xl">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
