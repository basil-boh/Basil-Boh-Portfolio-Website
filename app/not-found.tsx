import { Container, Section, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <Section>
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-display text-[clamp(5rem,20vw,12rem)] leading-none text-primary">
          404
        </span>
        <h1 className="font-display mt-4 text-3xl md:text-4xl">This page took a different route.</h1>
        <p className="mt-4 max-w-md text-muted">
          The link may be broken or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8">
          <ButtonLink href="/" variant="accent" withArrow>
            Back home
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
