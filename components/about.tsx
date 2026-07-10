import { Bot, TrendingUp, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";

const pillars = [
  {
    icon: Bot,
    title: "Agentes em produção, não slides",
    body: "Como empresas brasileiras já operam agentes de IA em vendas, atendimento e operações — com números e arquitetura, não promessa.",
  },
  {
    icon: Users,
    title: "Cultura antes de ferramenta",
    body: "O método Cultura Builder para transformar times em builders: quem aprende, quem constrói e como a adoção acontece de verdade.",
  },
  {
    icon: TrendingUp,
    title: "Por onde começar na sua empresa",
    body: "Um roteiro prático para os primeiros 90 dias: caso de uso inicial, time mínimo e como medir resultado desde a primeira semana.",
  },
];

export function About() {
  return (
    <section className="rule-b">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal>
          <p className="tag">Sobre o encontro</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
            O que sua empresa faz com IA quando a conferência termina?
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--paper-mute)]">
            O Blockchain.Rio reúne o ecossistema. Este jantar, na véspera, responde a
            pergunta que fica: como levar isso para dentro do seu negócio. Sem palco,
            sem pitch — uma mesa com quem já está construindo.
          </p>
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-px bg-[var(--rule)] md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="bg-[var(--ink)] p-8 md:min-h-64">
              <p.icon className="h-5 w-5 text-[var(--rust)]" aria-hidden />
              <h3 className="mt-6 text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--paper-mute)]">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
