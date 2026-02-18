const HeroScene = () => {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#12151f] via-[#171b29] to-[#1f2536] shadow-[0_30px_90px_rgba(7,10,18,0.55)] sm:h-[380px] lg:h-[460px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(242,171,98,0.28),transparent_48%),radial-gradient(circle_at_78%_80%,rgba(137,208,197,0.2),transparent_45%)]" />
      <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
        Signature Direction
      </div>
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-black/20 p-5 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.16em] text-[#9ad7cd]">
          Built for growth
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">
          Bespoke digital presence, strategic content systems, and clear
          conversion paths for modern Arkansas brands.
        </p>
      </div>
      <div className="absolute -right-14 top-16 h-40 w-40 rounded-full border border-[#f2ab62]/35 bg-[#f2ab62]/20 blur-[1px]" />
      <div className="absolute right-10 top-14 h-24 w-24 rounded-full border border-[#f7d0a2]/50 bg-[#f7d0a2]/25" />
      <div className="absolute left-[20%] top-[44%] h-px w-[56%] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#f4c48f]/90 to-transparent" />
      <div className="absolute left-[14%] top-[24%] h-56 w-56 rounded-full border border-[#9ad7cd]/35" />
      <div className="absolute left-[38%] top-[16%] h-72 w-72 rounded-full border border-white/10" />
    </div>
  );
};

export default HeroScene;
