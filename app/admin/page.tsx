import { timingSafeEqual } from "node:crypto";
import { Download, Users } from "lucide-react";
import { getDb, type Registration } from "@/lib/db";

export const dynamic = "force-dynamic";

function authorized(key: string | undefined): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !key) return false;
  const a = Buffer.from(key);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!authorized(key)) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-sm border border-[var(--rule-strong)] bg-[var(--ink-up)] p-8 text-center">
          <h1 className="text-lg font-bold">Acesso restrito</h1>
          <p className="mt-3 text-sm text-[var(--paper-mute)]">
            Esta área exige a chave de administração. Acesse com{" "}
            <code className="mono text-xs">/admin?key=SUA_CHAVE</code>.
          </p>
        </div>
      </main>
    );
  }

  const rows = getDb()
    .prepare(
      "SELECT id, nome, email, empresa, cargo, created_at FROM registrations ORDER BY created_at DESC",
    )
    .all() as Registration[];

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="tag">Admin · Evento Blockchain.Rio</p>
          <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold">
            <Users className="h-6 w-6 text-[var(--rust)]" aria-hidden />
            {rows.length} inscrito{rows.length === 1 ? "" : "s"}
          </h1>
        </div>
        <a
          href={`/api/admin/registrations?format=csv&key=${encodeURIComponent(key ?? "")}`}
          className="inline-flex h-11 items-center gap-2 border border-[var(--rule-strong)] px-5 text-sm font-medium transition-colors hover:border-[var(--paper)]"
        >
          <Download className="h-4 w-4" aria-hidden />
          Exportar CSV
        </a>
      </div>

      {rows.length === 0 ? (
        <div className="mt-10 border border-[var(--rule)] p-10 text-center text-sm text-[var(--paper-mute)]">
          Nenhuma inscrição ainda. Compartilhe a página para começar a receber.
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto border border-[var(--rule)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="rule-b bg-[var(--ink-up)]">
                <th className="tag px-4 py-3 font-normal">#</th>
                <th className="tag px-4 py-3 font-normal">Nome</th>
                <th className="tag px-4 py-3 font-normal">E-mail</th>
                <th className="tag px-4 py-3 font-normal">Empresa</th>
                <th className="tag px-4 py-3 font-normal">Cargo</th>
                <th className="tag px-4 py-3 font-normal">Inscrito em (UTC)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="rule-t">
                  <td className="mono tnum px-4 py-3 text-[var(--paper-faint)]">{r.id}</td>
                  <td className="px-4 py-3 font-medium">{r.nome}</td>
                  <td className="px-4 py-3 text-[var(--paper-mute)]">{r.email}</td>
                  <td className="px-4 py-3">{r.empresa}</td>
                  <td className="px-4 py-3 text-[var(--paper-mute)]">{r.cargo}</td>
                  <td className="mono tnum px-4 py-3 text-[var(--paper-faint)]">{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
