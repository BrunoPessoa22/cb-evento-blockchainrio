import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { EVENT } from "@/lib/event";
import "./globals.css";

export const metadata: Metadata = {
  title: `${EVENT.name} — Cultura Builder`,
  description: EVENT.description,
  metadataBase: new URL(EVENT.siteUrl),
  alternates: { canonical: "/" },
  authors: [{ name: "Cultura Builder", url: "https://culturabuilder.com" }],
  keywords: [
    "Cultura Builder",
    "Blockchain.Rio",
    "side event",
    "IA para empresas",
    "agentes de IA",
    "Rio de Janeiro",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Cultura Builder",
    title: `${EVENT.name} — 11 de agosto, Rio de Janeiro`,
    description: EVENT.description,
  },
  robots: { index: true, follow: true },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "BusinessEvent",
  name: EVENT.name,
  description: EVENT.description,
  startDate: "2026-08-11T18:30:00-03:00",
  endDate: "2026-08-11T21:00:00-03:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: EVENT.venue,
    address: EVENT.venueDetail,
  },
  organizer: {
    "@type": "Organization",
    name: "Cultura Builder",
    url: "https://culturabuilder.com",
  },
  isAccessibleForFree: true,
  url: EVENT.siteUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
