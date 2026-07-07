type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  badgePillars: string;
  badgeHolistic: string;
  badgeFamily: string;
};

export function FunctionalMedicinePageHero({
  eyebrow,
  title,
  lead,
  badgePillars,
  badgeHolistic,
  badgeFamily,
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-ink-100)]">
      {/* Renkli mesh — yalnızca CSS */}
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--color-cream-50)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65]"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 10% 20%, rgba(91,168,214,0.38), transparent 55%),
            radial-gradient(ellipse 80% 60% at 90% 15%, rgba(168,216,185,0.36), transparent 50%),
            radial-gradient(ellipse 70% 55% at 50% 95%, rgba(255,184,154,0.32), transparent 55%),
            radial-gradient(ellipse 50% 40% at 70% 55%, rgba(139,92,246,0.12), transparent 60%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgb(91 168 214) 0%, transparent 40%, transparent 60%, rgb(168 216 185) 100%)",
        }}
      />

      {/* Alt geçiş — yumuşak dalga + marka renklerinde ince hat */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-[0]"
        aria-hidden
      >
        <svg
          className="block h-[clamp(3rem,7vw,4.75rem)] w-full text-[var(--color-surface)]"
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <linearGradient
              id="fmHeroWaveStroke"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(91 168 214)" stopOpacity="0.55" />
              <stop offset="28%" stopColor="rgb(130 195 154)" stopOpacity="0.5" />
              <stop offset="52%" stopColor="rgb(255 184 154)" stopOpacity="0.55" />
              <stop offset="76%" stopColor="rgb(167 139 250)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="rgb(91 168 214)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            fill="currentColor"
            d="M0 42 C 220 22 380 58 520 42 C 660 26 780 18 900 34 C 1020 50 1160 62 1300 46 C 1380 38 1410 34 1440 36 L 1440 72 L 0 72 Z"
          />
          <path
            d="M0 42 C 220 22 380 58 520 42 C 660 26 780 18 900 34 C 1020 50 1160 62 1300 46 C 1380 38 1410 34 1440 36"
            fill="none"
            stroke="url(#fmHeroWaveStroke)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container-x relative z-[1] max-w-4xl pb-20 pt-14 sm:pb-24 sm:pt-16">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-emerald-800 shadow-[var(--shadow-soft)] backdrop-blur-md">
            {badgePillars}
          </span>
          <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sky-800 shadow-[var(--shadow-soft)] backdrop-blur-md">
            {badgeHolistic}
          </span>
          <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-rose-900/90 shadow-[var(--shadow-soft)] backdrop-blur-md">
            {badgeFamily}
          </span>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-sky-700)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.12] text-[var(--color-ink-900)] sm:text-5xl text-balance">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-800)] text-pretty sm:text-xl">
          {lead}
        </p>
      </div>
    </section>
  );
}
