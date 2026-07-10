import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { getDb, type Registration } from "@/lib/db";

export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function authorized(req: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const bearer = req.headers.get("authorization");
  if (bearer && safeEqual(bearer, `Bearer ${secret}`)) return true;
  const key = new URL(req.url).searchParams.get("key");
  return key !== null && safeEqual(key, secret);
}

function csvField(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rows = getDb()
    .prepare("SELECT id, nome, email, empresa, cargo, created_at FROM registrations ORDER BY created_at DESC")
    .all() as Registration[];

  const format = new URL(req.url).searchParams.get("format");
  if (format === "csv") {
    const header = "id,nome,email,empresa,cargo,created_at";
    const lines = rows.map((r) =>
      [r.id, r.nome, r.email, r.empresa, r.cargo, r.created_at].map(csvField).join(","),
    );
    return new NextResponse([header, ...lines].join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="inscricoes.csv"',
      },
    });
  }

  return NextResponse.json({ count: rows.length, registrations: rows });
}
