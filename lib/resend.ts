import { Resend } from "resend";
import { EVENT } from "@/lib/event";
import { buildIcs } from "@/lib/ics";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

const from =
  process.env.RESEND_FROM_EMAIL ?? "Cultura Builder <cafe@culturabuilder.com>";

export async function sendConfirmation(p: { to: string; nome: string }) {
  if (!resend) {
    console.warn("[resend] no API key, skipping confirmation to", p.to);
    return;
  }
  const firstName = p.nome.trim().split(/\s+/)[0];
  const html = `
    <div style="font-family: Geist, -apple-system, Helvetica, Arial, sans-serif; background: #050505; color: #FAFAFA; padding: 40px 20px;">
      <div style="max-width: 520px; margin: 0 auto;">
        <div style="font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #FF5A1F; margin-bottom: 32px;">
          Cultura Builder &times; Blockchain.Rio
        </div>
        <h1 style="font-size: 26px; line-height: 1.15; margin: 0 0 12px 0; letter-spacing: -0.02em;">
          Seu lugar na mesa est&aacute; reservado, ${firstName}.
        </h1>
        <p style="color: #8A857C; line-height: 1.6; margin: 0 0 28px 0;">
          Inscri&ccedil;&atilde;o confirmada para <strong style="color:#FAFAFA;">${EVENT.name}</strong> —
          o side event da Cultura Builder antes do Blockchain.Rio.
        </p>
        <div style="border: 1px solid #333333; padding: 20px; margin-bottom: 28px;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #8A857C; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; padding: 6px 0; width: 90px;">Quando</td>
              <td style="color: #FAFAFA; font-size: 14px; padding: 6px 0;">${EVENT.dateLabel} (${EVENT.weekdayLabel}) &middot; ${EVENT.timeLabel}</td>
            </tr>
            <tr>
              <td style="color: #8A857C; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; padding: 6px 0;">Onde</td>
              <td style="color: #FAFAFA; font-size: 14px; padding: 6px 0;">${EVENT.venue}<br /><span style="color:#8A857C;">${EVENT.venueDetail}</span></td>
            </tr>
          </table>
        </div>
        <p style="color: #8A857C; line-height: 1.6; font-size: 13px;">
          O convite de calend&aacute;rio est&aacute; anexo. Qualquer mudan&ccedil;a, avisamos por este e-mail.
        </p>
        <p style="color: #5C594F; font-size: 12px; margin-top: 40px;">
          Cultura Builder &middot; culturabuilder.com
        </p>
      </div>
    </div>
  `;
  await resend.emails.send({
    from,
    to: p.to,
    subject: `Confirmado — ${EVENT.name} · 11 ago`,
    html,
    attachments: [
      {
        filename: "cultura-builder-evento.ics",
        content: Buffer.from(buildIcs()),
        contentType: "text/calendar; charset=utf-8; method=PUBLISH",
      },
    ],
  });
}
