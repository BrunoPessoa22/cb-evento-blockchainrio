import { Reveal } from "@/components/reveal";

const items = [
  {
    time: "18h30",
    title: "Recepção",
    body: "Chegada, welcome drink e primeiras conexões.",
  },
  {
    time: "19h00",
    title: "Introduzindo a Cultura Builder em seu negócio",
    body: "Talk de Bruno Pessoa: o método por trás de times que constroem com IA — e o que muda na prática quando a cultura vem antes da ferramenta.",
  },
  {
    time: "19h45",
    title: "Cases reais",
    body: "Agentes de IA operando em empresas brasileiras: o que funcionou, o que quebrou e os números por trás.",
  },
  {
    time: "20h15",
    title: "Jantar e networking",
    body: "Churrasco à mesa e conversa aberta entre os convidados.",
  },
  {
    time: "21h00",
    title: "Encerramento",
    body: "Próximos passos e como continuar a conversa no Blockchain.Rio.",
  },
];

export function Agenda() {
  return (
    <section className="rule-b bg-[var(--ink-up)]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal>
          <p className="tag">Programação</p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-5xl">
            Uma noite, um roteiro
          </h2>
        </Reveal>
        <Reveal stagger className="mt-12">
          {items.map((item) => (
            <div
              key={item.time}
              className="rule-t grid gap-2 py-6 md:grid-cols-[120px_1fr] md:gap-10"
            >
              <span className="mono tnum text-sm text-[var(--rust)]">{item.time}</span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[var(--paper-mute)]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
