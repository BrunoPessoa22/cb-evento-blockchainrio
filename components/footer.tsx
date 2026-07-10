import Image from "next/image";

export function Footer() {
  return (
    <footer className="edge-t">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <Image
          src="/logos/cultura-builder.svg"
          alt="Cultura Builder"
          width={120}
          height={41}
        />
        <div className="flex flex-col gap-1 sm:items-end">
          <a
            href="https://culturabuilder.com"
            className="text-sm text-[var(--paper-mute)] transition-colors hover:text-[var(--paper)]"
          >
            culturabuilder.com
          </a>
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--paper-faint)]">
            Side event · Blockchain.Rio 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
