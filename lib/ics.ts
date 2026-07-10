import { EVENT } from "@/lib/event";

function icsEscape(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export function buildIcs(): string {
  const dtstamp = `${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cultura Builder//Evento//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:blockchainrio-2026@evento.culturabuilder.com",
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${EVENT.startUtc}`,
    `DTEND:${EVENT.endUtc}`,
    `SUMMARY:${icsEscape(EVENT.name)}`,
    `LOCATION:${icsEscape(`${EVENT.venue}, ${EVENT.venueDetail}`)}`,
    `DESCRIPTION:${icsEscape(`${EVENT.description} Detalhes: ${EVENT.siteUrl}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
