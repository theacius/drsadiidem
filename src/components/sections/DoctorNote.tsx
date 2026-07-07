import { Container, Section } from "@/components/ui/Container";
import { DoctorNoteEmbed } from "@/components/sections/DoctorNoteEmbed";

export type DoctorNoteContent = {
  heading: string;
  greeting: string;
  paragraphs: string[];
  closingLine: string;
};

/** Tam genişlik bölüm — ana sayfada kullanılmıyor; başka sayfalarda veya şablonda gerekebilir. */
export function DoctorNote({ note }: { note: DoctorNoteContent }) {
  return (
    <Section spacing="lg" className="bg-white border-y border-[var(--color-ink-100)]">
      <Container className="max-w-3xl">
        <DoctorNoteEmbed note={note} variant="standalone" />
      </Container>
    </Section>
  );
}
