import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Agenda } from "@/components/agenda";
import { Host } from "@/components/host";
import { SignupForm } from "@/components/signup-form";
import { Footer } from "@/components/footer";
import { REGISTRATIONS_CLOSED } from "@/lib/event";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Agenda />
      <Host />
      <section id="inscricao" className="scroll-mt-8 bg-[var(--ink-up)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="tag">Inscrição</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
              {REGISTRATIONS_CLOSED ? "Lista encerrada" : "Garanta seu lugar na mesa"}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-[var(--paper-mute)]">
              {REGISTRATIONS_CLOSED
                ? "As inscrições para este jantar foram encerradas. Quem já confirmou recebeu os detalhes por e-mail."
                : "O jantar é gratuito e as vagas são limitadas — a curadoria prioriza quem decide sobre tecnologia e inovação na empresa. Confirmação imediata por e-mail, com convite de calendário."}
            </p>
          </Reveal>
          <Reveal>
            <SignupForm />
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
