"use client";

/**
 * Chennai doodle motifs — Namma Chennai theme.
 * Lighthouse, MTC bus, auto, filter coffee, coconut, popcorn, secretariat, ballot.
 */

const CHENNAI_ICONS = {
  lighthouse: "/icons/chennai/lighthouse.png",
  auto: "/icons/chennai/auto.png",
  mtcBus: "/icons/chennai/mtc-bus.png",
  filterCoffee: "/icons/chennai/filter-coffee.png",
  coconut: "/icons/chennai/coconut.png",
  popcorn: "/icons/chennai/popcorn.png",
  secretariat: "/icons/chennai/secretariat.png",
  ballot: "/icons/chennai/ballot-box.svg",
} as const;

export function ChennaiIcon({
  name,
  className = "",
  size = 40,
}: {
  name: keyof typeof CHENNAI_ICONS;
  className?: string;
  size?: number;
}) {
  return (
    <img
      src={CHENNAI_ICONS[name]}
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}

export function ChennaiCollage() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Secretariat as bg — covers ~60% viewport, mobile responsive */}
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] min-w-[280px] min-h-[200px] max-w-[720px] max-h-[540px] flex items-end justify-end opacity-[0.07] md:opacity-[0.08]">
        <img
          src={CHENNAI_ICONS.secretariat}
          alt=""
          className="w-full h-full object-contain object-bottom object-right"
        />
      </div>

      {/* Scattered Chennai doodles - Marina, bus, auto, coffee, etc. */}
      <div className="absolute top-8 left-8 opacity-20" style={{ transform: "rotate(-6deg)" }}>
        <img src={CHENNAI_ICONS.lighthouse} alt="" width={36} height={54} className="object-contain" />
      </div>
      <div className="absolute top-16 right-12 opacity-15" style={{ transform: "rotate(4deg)" }}>
        <img src={CHENNAI_ICONS.mtcBus} alt="" width={64} height={32} className="object-contain" />
      </div>
      <div className="absolute bottom-24 left-16 opacity-18" style={{ transform: "rotate(-3deg)" }}>
        <img src={CHENNAI_ICONS.auto} alt="" width={48} height={36} className="object-contain" />
      </div>
      <div className="absolute bottom-32 right-20 opacity-15" style={{ transform: "rotate(5deg)" }}>
        <img src={CHENNAI_ICONS.filterCoffee} alt="" width={28} height={34} className="object-contain" />
      </div>
      <div className="absolute top-1/3 right-8 opacity-12" style={{ transform: "rotate(-8deg)" }}>
        <img src={CHENNAI_ICONS.coconut} alt="" width={24} height={36} className="object-contain" />
      </div>
      <div className="absolute top-24 right-1/4 opacity-12" style={{ transform: "rotate(-4deg)" }}>
        <img src={CHENNAI_ICONS.popcorn} alt="" width={32} height={40} className="object-contain" />
      </div>
    </div>
  );
}

export function LocalPhrase({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest opacity-60 ${className}`}>
      {children}
    </span>
  );
}
