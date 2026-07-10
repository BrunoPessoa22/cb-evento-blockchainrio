import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { registrationSchema } from "@/lib/validation";
import { sendConfirmation } from "@/lib/resend";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "rate_limited", message: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots don't adapt.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const email = parsed.data.email.toLowerCase().trim();

  try {
    getDb()
      .prepare("INSERT INTO registrations (nome, email, empresa, cargo) VALUES (?, ?, ?, ?)")
      .run(parsed.data.nome.trim(), email, parsed.data.empresa.trim(), parsed.data.cargo.trim());
  } catch (err) {
    if ((err as { code?: string }).code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json({
        ok: true,
        already: true,
        message: "Você já está inscrito. Nos vemos lá!",
      });
    }
    console.error("[register] insert failed", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }

  try {
    await sendConfirmation({ to: email, nome: parsed.data.nome });
  } catch (err) {
    console.warn("[register] confirmation email failed (non-fatal)", err);
  }

  return NextResponse.json({ ok: true });
}
