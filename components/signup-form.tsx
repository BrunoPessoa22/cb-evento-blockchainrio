"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Lock, LoaderCircle } from "lucide-react";
import { registrationSchema, type RegistrationInput } from "@/lib/validation";
import { REGISTRATIONS_CLOSED } from "@/lib/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "success" | "already" | "error";

export function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput>({ resolver: zodResolver(registrationSchema) });

  async function onSubmit(data: RegistrationInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; already?: boolean };
      if (!res.ok || !json.ok) {
        setStatus("error");
        return;
      }
      setStatus(json.already ? "already" : "success");
    } catch {
      setStatus("error");
    }
  }

  if (REGISTRATIONS_CLOSED) {
    return (
      <div className="border border-[var(--rule-strong)] bg-[var(--ink-up)] p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center bg-[var(--rust)]">
          <Lock className="h-6 w-6 text-white" aria-hidden />
        </span>
        <h3 className="mt-6 text-xl font-bold">Inscrições encerradas</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--paper-mute)]">
          A lista para este jantar está fechada. Se você já se inscreveu, seu lugar
          está garantido — nos vemos lá.
        </p>
      </div>
    );
  }

  if (status === "success" || status === "already") {
    return (
      <div className="border border-[var(--rule-strong)] bg-[var(--ink-up)] p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center bg-[var(--rust)]">
          <Check className="h-6 w-6 text-white" aria-hidden />
        </span>
        <h3 className="mt-6 text-xl font-bold">
          {status === "already" ? "Você já está inscrito" : "Lugar reservado"}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--paper-mute)]">
          {status === "already"
            ? "Sua inscrição já estava confirmada. Nos vemos no dia 11 de agosto."
            : "Inscrição confirmada. Enviamos os detalhes e o convite de calendário para o seu e-mail."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border border-[var(--rule-strong)] bg-[var(--ink-up)] p-6 md:p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            autoComplete="name"
            placeholder="Seu nome"
            aria-invalid={!!errors.nome}
            {...register("nome")}
          />
          {errors.nome && (
            <p role="alert" className="text-xs text-[var(--rust-bright)]">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-[var(--rust-bright)]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="empresa">Empresa</Label>
            <Input
              id="empresa"
              autoComplete="organization"
              placeholder="Onde você trabalha"
              aria-invalid={!!errors.empresa}
              {...register("empresa")}
            />
            {errors.empresa && (
              <p role="alert" className="text-xs text-[var(--rust-bright)]">
                {errors.empresa.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Input
              id="cargo"
              autoComplete="organization-title"
              placeholder="Sua função"
              aria-invalid={!!errors.cargo}
              {...register("cargo")}
            />
            {errors.cargo && (
              <p role="alert" className="text-xs text-[var(--rust-bright)]">
                {errors.cargo.message}
              </p>
            )}
          </div>
        </div>

        {/* Honeypot — invisible to humans, bots fill it */}
        <div aria-hidden className="absolute left-[-9999px] top-auto">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {status === "error" && (
          <p role="alert" className="border border-[var(--rust-deep)] px-4 py-3 text-sm text-[var(--rust-bright)]">
            Não foi possível concluir a inscrição. Verifique os dados e tente de novo.
          </p>
        )}

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden />
              Reservando…
            </>
          ) : (
            "Garantir meu lugar"
          )}
        </Button>
        <p className="text-center text-xs text-[var(--paper-faint)]">
          Usamos seus dados apenas para comunicação sobre este evento.
        </p>
      </div>
    </form>
  );
}
