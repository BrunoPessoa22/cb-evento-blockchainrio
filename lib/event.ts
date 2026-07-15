// Single source of truth for event facts. Update here; page, email and .ics follow.
export const EVENT = {
  name: "Introduzindo a Cultura Builder em seu negócio",
  shortName: "Cultura Builder × Blockchain.Rio",
  description:
    "Side event exclusivo antes do Blockchain.Rio: como levar a cultura de builders com IA para dentro da sua empresa — com cases reais, método e churrasco.",
  dateLabel: "11 de agosto de 2026",
  weekdayLabel: "terça-feira",
  timeLabel: "18h30 – 21h00",
  venue: "Rio Brasa Jardim Oceânico",
  venueDetail: "Av. Armando Lombardi, 583 — Jardim Oceânico, Rio de Janeiro",
  city: "Rio de Janeiro, RJ",
  // 18:30–21:00 BRT (UTC-3)
  startUtc: "20260811T213000Z",
  endUtc: "20260812T000000Z",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://evento.culturabuilder.com",
} as const;
