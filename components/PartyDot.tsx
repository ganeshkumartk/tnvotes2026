import { PARTIES, type PartyId } from "@/lib/data";

export function PartyDot({
  id,
  size = 12,
}: {
  id: PartyId;
  size?: number;
}) {
  const party = PARTIES[id];
  return (
    <span
      className="inline-block rounded-none border border-text-primary/20"
      style={{
        width: size,
        height: size,
        background: party.gradient,
      }}
    />
  );
}

export function PartyBar({
  id,
  pct,
}: {
  id: PartyId;
  pct: number;
}) {
  const party = PARTIES[id];
  return (
    <div
      className="h-full transition-all duration-1000"
      style={{
        width: `${pct}%`,
        background: party.gradient,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
}

export function PartyChip({ id }: { id: PartyId }) {
  const party = PARTIES[id];
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-text-primary/20 text-[10px] uppercase tracking-widest font-mono text-text-primary/70 bg-text-primary/5">
      <PartyDot id={id} size={8} />
      {party.name}
    </span>
  );
}

export function PartyFlagImage({ id, className = "" }: { id: PartyId, className?: string }) {
  const party = PARTIES[id];
  if (!party.flagUrl) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={party.flagUrl} 
      alt={`${party.name} Flag`} 
      className={`object-cover object-center ${className}`} 
      loading="lazy"
      crossOrigin="anonymous"
    />
  );
}
