import { Reveal } from "@/components/reveal";

const hosts = [
  {
    name: "Bruno Pessoa",
    role: "Fundador · Cultura Builder",
    bio: "Lidera a Cultura Builder, comunidade e metodologia que forma builders com IA no Brasil, e é Head of Strategic Innovations na Chiliz — a empresa por trás dos fan tokens dos maiores clubes do mundo. Constrói com IA em produção todos os dias.",
  },
  {
    name: "Caio Vicentino",
    role: "Co-fundador · Cultura Builder",
    bio: "Educador e criador à frente de algumas das maiores comunidades de investimento em cripto do Brasil. Na Cultura Builder, transforma conhecimento técnico em conteúdo que faz builders saírem do zero à produção.",
  },
  {
    name: "Deco Montenegro",
    role: "Co-fundador · Cultura Builder",
    bio: "Empreendedor serial — fundador da Liqi, pioneira em tokenização no Brasil, com passagens por fundos e mercado imobiliário. Conecta o ecossistema de negócios, blockchain e IA que se encontra nesta mesa.",
  },
];

export function Host() {
  return (
    <section className="rule-b">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal>
          <p className="tag">Quem recebe</p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-5xl">
            Os fundadores da Cultura Builder
          </h2>
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-px bg-[var(--rule)] md:grid-cols-3">
          {hosts.map((h) => (
            <div key={h.name} className="bg-[var(--ink)] p-8">
              <h3 className="text-xl font-bold tracking-[-0.01em]">{h.name}</h3>
              <p className="mono mt-2 text-xs uppercase tracking-[0.18em] text-[var(--rust)]">
                {h.role}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[var(--paper-mute)]">{h.bio}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
