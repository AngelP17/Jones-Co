import {
  IconChartBar,
  IconPencil,
  IconWorld,
  IconHeart,
  IconMapPin,
  IconArrowRight,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const credentials = [
  {
    icon: IconChartBar,
    title: 'Content Management',
    description: 'Managing communications for organizations reaching over 17,000 weekly readers with consistent engagement and growth.',
  },
  {
    icon: IconPencil,
    title: 'Published Writer',
    description: 'Published in outlets reaching 30,000+ people, with experience in both digital and print media.',
  },
  {
    icon: IconWorld,
    title: 'Agency Experience',
    description: "Stone Ward Advertising Agency experience in Little Rock, working with diverse clients and campaigns.",
  },
  {
    icon: IconHeart,
    title: 'Local Focus',
    description: 'Arkansas native and University of Arkansas student, deeply connected to the local business community.',
  },
];

const values = [
  {
    title: 'Accessibility',
    description: 'Every business deserves professional marketing, regardless of budget size.',
  },
  {
    title: 'Authenticity',
    description: 'Real connections, real results. No cookie-cutter solutions.',
  },
  {
    title: 'Quality',
    description: 'Big-agency expertise with small-town personal service.',
  },
  {
    title: 'Community',
    description: 'Supporting Arkansas businesses and helping them thrive.',
  },
];

const impact = [
  { value: '17,000+', label: 'weekly readers reached' },
  { value: '30,000+', label: 'readers through published work' },
  { value: '3 years', label: 'communications experience' },
  { value: 'Arkansas', label: 'local focus and service' },
];

const About = () => {
  const { navigate } = useRouter();

  const { ref: storyRef, isVisible: storyVisible } = useIntersectionObserver();
  const { ref: impactRef, isVisible: impactVisible } = useIntersectionObserver();
  const { ref: valuesRef, isVisible: valuesVisible } = useIntersectionObserver();
  const { ref: educationRef, isVisible: educationVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />

      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="editorial-label mb-3">The Founder</p>
            <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              About Addie Jones
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Marketing professional, Arkansas native, and passionate advocate for local businesses. Bringing big-agency experience to small-town prices.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={storyRef} className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className={`lg:col-span-7 reveal-fade-left ${storyVisible ? 'visible' : ''}`}>
              <h2 className="font-display text-3xl font-semibold tracking-tight mb-6">
                My Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-[60ch]">
                <p>
                  I started Jones & Co. Media because I believe every Arkansas business deserves professional marketing, not just the ones with big budgets.
                </p>
                <p>
                  Growing up in Arkansas, I saw how hard local business owners work. I also saw how often they struggle to compete online against bigger companies with dedicated marketing teams. That didn't seem fair.
                </p>
                <p>
                  For the past three years, I've been building my skills in communications and marketing. I've managed content for organizations reaching tens of thousands of readers. I've worked at Stone Ward, one of Arkansas's top advertising agencies. I've learned what works and what doesn't.
                </p>
                <p>
                  Now I'm bringing that experience home to help local businesses thrive. Whether it's a new website, social media management, or a complete marketing strategy, I'm here to help Arkansas businesses succeed.
                </p>
                <p className="text-foreground font-medium">
                  Coffee's on me. Let's talk about what your business needs.
                </p>
              </div>
            </div>
            <div className={`lg:col-span-5 reveal-fade-right stagger-1 ${storyVisible ? 'visible' : ''}`}>
              <div className="overflow-hidden rounded-2xl mb-8">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-campus.jpg`}
                  alt="University of Arkansas campus atmosphere"
                  width={900}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover aspect-[4/3]"
                />
              </div>
              <div className="rounded-xl border border-border bg-accent p-6">
                <h3 className="font-display text-lg font-semibold mb-5">
                  Credentials & Experience
                </h3>
                <div className="space-y-5">
                  {credentials.map((cred) => (
                    <div key={cred.title} className="flex gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                        <cred.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-0.5">
                          {cred.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {cred.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-accent py-10 sm:py-12">
        <div
          ref={impactRef}
          className={`mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 reveal-fade-up ${impactVisible ? 'visible' : ''}`}
        >
          {impact.map((item) => (
            <div key={item.label} className="border-l border-primary/20 pl-5">
              <p className="font-display text-3xl font-semibold tracking-tight text-primary">{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={valuesRef}
            className={`mb-12 text-center reveal-fade-up ${valuesVisible ? 'visible' : ''}`}
          >
            <h2 className="font-display text-3xl font-semibold tracking-tight mb-3">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The principles that guide everything we do at Jones & Co. Media.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`reveal-fade-up stagger-${index + 1} ${valuesVisible ? 'visible' : ''}`}
              >
                <div className="rounded-xl border border-border bg-background p-6 h-full">
                  <h3 className="font-display text-base font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div
            ref={educationRef}
            className={`mb-10 text-center reveal-fade-up ${educationVisible ? 'visible' : ''}`}
          >
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Education & Background
            </h2>
          </div>
          <div className="space-y-5">
            <div className={`reveal-fade-up stagger-1 ${educationVisible ? 'visible' : ''}`}>
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                    <IconMapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">
                      University of Arkansas
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Currently pursuing degree with focus on communications and marketing. Active in campus organizations and community initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`reveal-fade-up stagger-2 ${educationVisible ? 'visible' : ''}`}>
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                    <IconWorld className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">
                      Stone Ward Advertising Agency
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Professional experience at one of Arkansas's leading advertising agencies, working with diverse clients across multiple industries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`reveal-fade-up stagger-3 ${educationVisible ? 'visible' : ''}`}>
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                    <IconHeart className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">
                      Arkansas Native
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Born and raised in Arkansas with deep roots in both Harrison and Fayetteville communities. Understanding of local culture and business landscape.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent py-16 sm:py-20">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8 reveal-fade-up ${ctaVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Ready to take your business to the next level? I'd love to hear about your goals and how I can help.
          </p>
          <Button
            onClick={() => {
              navigate('/contact');
              window.scrollTo(0, 0);
            }}
            size="lg"
            className="bg-primary hover:bg-primary/90 rounded-full px-7"
          >
            Get in Touch
            <IconArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
