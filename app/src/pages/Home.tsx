import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  IconArrowRight,
  IconBrandInstagram,
  IconLanguage,
  IconMapPin,
  IconPhone,
  IconWorldWww,
  IconWriting,
  IconMail,
} from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const trustLedger = [
  { number: '01', label: 'Arkansas-based', text: 'Statewide service with local roots in Harrison and Fayetteville' },
  { number: '02', label: 'Agency-trained', text: 'Editorial, strategic, and content experience from professional practice' },
  { number: '03', label: 'Direct access', text: 'Clear communication, quick turnarounds, and practical recommendations' },
  { number: '04', label: 'Bilingual', text: 'Spanish-language content support for businesses serving diverse communities' },
];

const serviceIndex = [
  {
    number: '01',
    title: 'Websites',
    desc: 'Professional websites that are clear, modern, and easy for your customers to navigate.',
    icon: IconWorldWww,
  },
  {
    number: '02',
    title: 'Social Media',
    desc: 'Consistent posting, active engagement, and content calendars built around your goals.',
    icon: IconBrandInstagram,
  },
  {
    number: '03',
    title: 'Marketing Materials',
    desc: 'Print and digital assets that keep your brand polished across every touchpoint.',
    icon: IconWriting,
  },
  {
    number: '04',
    title: 'Spanish Services',
    desc: 'Bilingual content and culturally grounded messaging for Arkansas audiences.',
    icon: IconLanguage,
  },
];

const faqs = [
  {
    q: 'Do I need to be in Harrison or Fayetteville to work with you?',
    a: 'No. I can work with businesses across Arkansas remotely and by phone, and I am happy to meet locally when schedules allow.',
  },
  {
    q: 'How long does a website project take?',
    a: 'Most small business websites are completed in about two to three weeks depending on project scope and revision rounds.',
  },
  {
    q: 'Do you require contracts?',
    a: 'For one-time projects, no. For monthly services, yes, but they are month-to-month and can be canceled anytime.',
  },
  {
    q: 'Can you help after launch?',
    a: 'Yes. Ongoing updates and support are available, and I can step in when you need edits or new content.',
  },
];

const Home = () => {
  const { navigate } = useRouter();

  const { ref: trustRef, isVisible: trustVisible } = useIntersectionObserver();
  const { ref: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  const { ref: spanishRef, isVisible: spanishVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();
  const { ref: faqRef, isVisible: faqVisible } = useIntersectionObserver();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />

      <section className="relative min-h-[100dvh] overflow-hidden pt-16 lg:pt-[72px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100dvh-4rem)] items-center gap-8 py-10 lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-12 lg:gap-6 lg:py-0">
            <div className="flex flex-col justify-center lg:col-span-7 xl:col-span-6">
              <p className="hero-intro hero-intro-1 editorial-label mb-5">
                Jones & Co.
              </p>
              <h1 className="hero-intro hero-intro-1 mb-5 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
                <span className="font-hero block text-primary leading-[1.12] pb-1">
                  Big-agency quality.
                </span>
                <span className="block mt-2">Small-town service.</span>
              </h1>
              <p className="hero-intro hero-intro-2 mb-7 max-w-[48ch] text-[15px] leading-[1.65] text-muted-foreground lg:text-base">
                Websites, social media, marketing materials, and content that helps Arkansas businesses look credible online.
              </p>
              <div className="hero-intro hero-intro-3 flex flex-wrap gap-3">
                <Button
                  onClick={() => handleNavClick('/contact')}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7"
                >
                  Get Started
                  <IconArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Button>
                <Button
                  onClick={() => handleNavClick('/services')}
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 border-foreground/12 hover:bg-foreground/[0.03]"
                >
                  View Services
                </Button>
              </div>

              <div className="hero-intro hero-intro-3 mt-8 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <IconMapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Harrison & Fayetteville, AR
                </span>
                <span className="h-3 w-px bg-border" />
                <span>Statewide service</span>
              </div>
            </div>

            <div className="flex items-center justify-center lg:col-span-5 xl:col-span-6">
              <div className="hero-intro hero-intro-2 relative w-full max-w-lg">
                <img
                  src={`${import.meta.env.BASE_URL}images/hero-storefront.jpg`}
                  alt="A welcoming storefront along a small-town Arkansas sidewalk"
                  width={760}
                  height={950}
                  fetchPriority="high"
                  loading="eager"
                  className="h-[28dvh] min-h-[180px] max-h-[240px] w-full rounded-2xl object-cover shadow-md lg:h-auto lg:max-h-none lg:aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-12 sm:py-16">
        <div
          ref={trustRef}
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-fade-up ${trustVisible ? 'visible' : ''}`}
        >
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="editorial-label mb-2">The Practice</p>
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                What sets us apart
              </h2>
            </div>
            <div className="lg:col-span-9">
              <div className="grid gap-6 sm:grid-cols-2">
                {trustLedger.map((item) => (
                  <div key={item.number} className="flex gap-4">
                    <span className="editorial-number mt-0.5 shrink-0">{item.number}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={servicesRef} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-4 reveal-fade-left ${servicesVisible ? 'visible' : ''}`}>
              <p className="editorial-label mb-3">Services</p>
              <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                What we do
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-[40ch] mb-6">
                Clear, polished marketing support for businesses across Arkansas.
              </p>
              <Button
                onClick={() => handleNavClick('/services')}
                variant="outline"
                className="rounded-full border-foreground/12 hover:bg-foreground/[0.03]"
              >
                View All Services
                <IconArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>

            <div className={`lg:col-span-8 reveal-fade-right stagger-1 ${servicesVisible ? 'visible' : ''}`}>
              <div className="divide-y divide-border">
                {serviceIndex.map((service) => (
                  <div
                    key={service.number}
                    className="group flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    <span className="editorial-number mt-1 shrink-0">{service.number}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <service.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground max-w-[55ch]">
                        {service.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavClick('/services')}
                      className="mt-1 shrink-0 text-primary opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 focus-visible:opacity-100"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <IconArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent py-20 sm:py-28">
        <div
          ref={spanishRef}
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-fade-up ${spanishVisible ? 'visible' : ''}`}
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/workspace-detail.jpg`}
                  alt="Editorial workspace with notebooks and coffee"
                  width={680}
                  height={850}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover aspect-[4/5]"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="editorial-label mb-3">Servicios en Español</p>
              <h2 className="mb-5 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Bilingual content for Arkansas communities
              </h2>
              <p className="mb-6 text-muted-foreground leading-relaxed max-w-[55ch]">
                Website translation, bilingual social content, and culturally authentic messaging to connect with Arkansas's growing Hispanic community.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleNavClick('/contact')}
                  className="bg-primary hover:bg-primary/90 rounded-full px-7"
                >
                  Contáctenos
                </Button>
                <Button
                  onClick={() => handleNavClick('/services')}
                  variant="outline"
                  className="rounded-full border-foreground/12 hover:bg-foreground/[0.03]"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-fade-up ${ctaVisible ? 'visible' : ''}`}
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="editorial-label mb-3">Start a Project</p>
              <h2 className="mb-5 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Ready to grow your business?
              </h2>
              <p className="mb-8 text-muted-foreground leading-relaxed max-w-[50ch]">
                Let's map out what you need and build a plan that fits your goals and budget.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleNavClick('/contact')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 rounded-full px-7"
                >
                  Schedule a Call
                </Button>
                <Button
                  onClick={() => handleNavClick('/bundles')}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-foreground/12 px-7 hover:bg-foreground/[0.03]"
                >
                  View Pricing
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="w-full rounded-xl border border-border bg-accent p-6">
                <p className="editorial-label mb-4">Direct Contact</p>
                <div className="space-y-4">
                  <a
                    href="tel:8705770389"
                    className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <IconPhone className="h-4 w-4 text-primary" strokeWidth={1.5} />
                    + 870 577 0389
                  </a>
                  <a
                    href="mailto:jonescopr@gmail.com"
                    className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <IconMail className="h-4 w-4 text-primary" strokeWidth={1.5} />
                    jonescopr@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 sm:py-28">
        <div
          ref={faqRef}
          className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 reveal-fade-up ${faqVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-12">
            <p className="editorial-label mb-3">Questions</p>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Frequently Asked
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-display text-base font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
