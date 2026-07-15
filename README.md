# Evento — Introduzindo a Cultura Builder em seu negócio

Landing page + inscrições do side event da Cultura Builder antes do Blockchain.Rio.
11 de agosto de 2026 · Rio Brasa Jardim Oceânico, Rio de Janeiro.

**Produção:** https://evento.culturabuilder.com

## Stack

Next.js 16 (App Router, standalone) · Tailwind v4 · SQLite (better-sqlite3, volume persistente) · Resend (confirmação com .ics) · Docker no Coolify (EC2).

## Conteúdo do evento

Tudo em `lib/event.ts` — data, horário, local, descrição. Alterou lá, página, e-mail e convite de calendário acompanham.

## Rotas

- `/` — landing + formulário de inscrição
- `/admin?key=ADMIN_SECRET` — lista de inscritos + export CSV
- `POST /api/register` — inscrição (rate limit, honeypot, dedupe por e-mail)
- `GET /api/admin/registrations?key=ADMIN_SECRET[&format=csv]`

## Env vars (Coolify env store, nunca no git)

| Var | Uso |
| --- | --- |
| `RESEND_API_KEY` | vazio = e-mail vira no-op com warning |
| `RESEND_FROM_EMAIL` | remetente verificado no Resend (`cafe@culturabuilder.com`) |
| `ADMIN_SECRET` | gate do /admin e do export |
| `NEXT_PUBLIC_SITE_URL` | URL canônica |

`DB_PATH` já vem do Dockerfile (`/app/data/registrations.db`, volume persistente `/app/data`).

## Deploy

Coolify (EC2 13.49.198.195) via API, build pack `dockerfile`, porta 3000, volume persistente em `/app/data` (criar ANTES do primeiro deploy). DNS: A record proxied `evento` → 13.49.198.195 na zona Cloudflare de culturabuilder.com (conta separada da brunopessoa.com — não usa o tunnel).

## Dev local

```bash
npm install
npm run dev        # SQLite local em ./data/
npm run typecheck
npm run build
```
