const processSteps = [
  {
    id: '01',
    label: 'Discovery',
    title: 'Strategy Alignment',
    detail:
      'We clarify goals, audience, and positioning so every deliverable is tied to business outcomes.',
  },
  {
    id: '02',
    label: 'Editorial',
    title: 'Execution',
    detail:
      'Design, messaging, and content are produced with one cohesive visual and verbal direction.',
  },
  {
    id: '03',
    label: 'Refinement',
    title: 'Review & Iterate',
    detail:
      'Feedback is integrated in focused rounds to sharpen clarity, consistency, and conversion flow.',
  },
  {
    id: '04',
    label: 'Support',
    title: 'Ongoing Optimization',
    detail:
      'After launch, updates and improvements keep your digital presence current and high-performing.',
  },
];

const ProcessRail = () => {
  return (
    <section className="bg-[#f2eae0] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary motion-safe:animate-in motion-safe:fade-in-50 motion-safe:slide-in-from-bottom-1">
            Process
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground motion-safe:animate-in motion-safe:fade-in-50 motion-safe:slide-in-from-bottom-1 md:text-4xl">
            A focused four-step system.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground motion-safe:animate-in motion-safe:fade-in-50 motion-safe:slide-in-from-bottom-1">
            One clear workflow from strategy to execution, refinement, and ongoing
            support. Built to stay practical and conversion-focused.
          </p>

          <div className="relative mt-10">
            <span className="pointer-events-none absolute left-[12%] right-[12%] top-4 hidden h-px bg-[#d8c7b2] md:block" />

            <ol
              aria-label="Jones and Co process"
              className="grid gap-4 md:grid-cols-4 md:gap-6"
            >
              {processSteps.map((step, index) => (
                <li
                  key={step.id}
                  className="group relative pl-10 motion-safe:animate-in motion-safe:fade-in-50 motion-safe:slide-in-from-bottom-1 md:pl-0"
                >
                  {index < processSteps.length - 1 ? (
                    <span className="pointer-events-none absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-[#d8c7b2] md:hidden" />
                  ) : null}

                  <span className="absolute left-0 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#f2ab62]/45 bg-white text-[11px] font-semibold tracking-wide text-[#b8673e] md:left-1/2 md:-translate-x-1/2">
                    {step.id}
                  </span>

                  <article className="rounded-2xl border border-[#dfcfbd] bg-white p-5 pt-10 transition-all duration-300 motion-reduce:transform-none motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:border-[#f2ab62]/45 motion-safe:group-hover:shadow-[0_18px_36px_rgba(33,27,18,0.1)] md:pt-12">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {step.label}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessRail;
