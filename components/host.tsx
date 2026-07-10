import { Reveal } from "@/components/reveal";

export function Host() {
  return (
    <section className="rule-b">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
          <p className="tag">Quem recebe</p>
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] md:text-4xl">Bruno Pessoa</h2>
            <p className="mono mt-2 text-xs uppercase tracking-[0.18em] text-[var(--rust)]">
              Fundador · Cultura Builder
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-[var(--paper-mute)]">
              Bruno lidera a Cultura Builder, comunidade e metodologia que forma builders
              com IA no Brasil, e é Head of Strategic Innovations na Chiliz — a empresa por
              trás dos fan tokens dos maiores clubes do mundo. Constrói com IA em produção
              todos os dias: agentes, produtos e times.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
