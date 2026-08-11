import Image from "next/image";
import { ArrowDown, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT, REGISTRATIONS_CLOSED } from "@/lib/event";

export function Hero() {
  return (
    <header className="edge-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Image
          src="/logos/cultura-builder.svg"
          alt="Cultura Builder"
          width={148}
          height={50}
          priority
        />
        <span className="tag hidden sm:inline-flex">Side event · Blockchain.Rio 2026</span>
      </div>

      <div className="rule-t">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="reveal-stagger in">
            <p className="tag">
              <span aria-hidden className="inline-block h-2 w-2 bg-[var(--rust)]" />
              Pré Blockchain.Rio · Rio de Janeiro
            </p>
            <h1 className="mt-6 text-[clamp(38px,7vw,84px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              Introduzindo a <span className="hi">Cultura Builder</span> em seu negócio
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--paper-mute)]">
              Um jantar para quem decide. Antes do Blockchain.Rio, reunimos líderes para
              mostrar como empresas brasileiras estão colocando agentes de IA em produção —
              método, cases reais e conversa franca, à mesa de uma churrascaria.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="group">
                <a href="#inscricao">
                  {REGISTRATIONS_CLOSED ? "Inscrições encerradas" : "Garantir meu lugar"}
                  <ArrowDown className="cta-arrow" aria-hidden />
                </a>
              </Button>
              <span className="mono text-xs uppercase tracking-[0.18em] text-[var(--paper-faint)]">
                {REGISTRATIONS_CLOSED ? "Lista fechada" : "Gratuito · vagas limitadas"}
              </span>
            </div>
          </div>

          {/* Reservation card — the event facts, set like a table booking */}
          <aside className="reveal in self-start border border-[var(--rule-strong)] bg-[var(--ink-up)]">
            <div className="rule-b px-6 py-4">
              <span className="tag">Reserva</span>
            </div>
            <dl className="space-y-5 px-6 py-6">
              <div className="flex gap-4">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rust)]" aria-hidden />
                <div>
                  <dt className="tag">Data</dt>
                  <dd className="mono tnum mt-1 text-sm">
                    {EVENT.dateLabel} · {EVENT.weekdayLabel}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rust)]" aria-hidden />
                <div>
                  <dt className="tag">Horário</dt>
                  <dd className="mono tnum mt-1 text-sm">{EVENT.timeLabel}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rust)]" aria-hidden />
                <div>
                  <dt className="tag">Local</dt>
                  <dd className="mt-1 text-sm font-medium">{EVENT.venue}</dd>
                  <dd className="mt-0.5 text-sm text-[var(--paper-mute)]">{EVENT.venueDetail}</dd>
                </div>
              </div>
            </dl>
            <div className="rule-t px-6 py-4">
              <p className="text-xs leading-relaxed text-[var(--paper-faint)]">
                Um dia antes do Blockchain.Rio (12–13 ago). Inscrição confirmada por e-mail
                com convite de calendário.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
}
