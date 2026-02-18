import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  IconPhoneCall,
  IconWorldWww,
  IconWriting,
  IconMail,
} from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import HeroScene from '@/components/HeroScene';
import ProcessRail from '@/components/home/ProcessRail';

const services = [
  {
    title: 'Websites',
    desc: 'Professional websites that are clear, modern, and easy for your customers to navigate.',
    icon: IconWorldWww,
    path: '/services',
  },
  {
    title: 'Social Media',
    desc: 'Consistent posting, active engagement, and content calendars built around your goals.',
    icon: IconBrandInstagram,
    path: '/services',
  },
  {
    title: 'Marketing Materials',
    desc: 'Print and digital assets that keep your brand polished across every touchpoint.',
    icon: IconWriting,
    path: '/services',
  },
  {
    title: 'Spanish Services',
    desc: 'Bilingual content and culturally grounded messaging for Arkansas audiences.',
    icon: IconLanguage,
    path: '/services',
  },
];

const snapshotPoints = [
  {
    title: 'Positioning Clarity',
    detail: 'Messaging frameworks that help customers understand value in seconds.',
  },
  {
    title: 'Editorial Consistency',
    detail: 'Unified visual and written standards across web, social, and campaigns.',
  },
  {
    title: 'Conversion Focus',
    detail: 'Clear CTA architecture and content flow designed to drive action.',
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
    a: "For one-time projects, no. For monthly services, yes, but they are month-to-month and can be canceled anytime.",
  },
  {
    q: 'Can you help after launch?',
    a: 'Yes. Ongoing updates and support are available, and I can step in when you need edits or new content.',
  },
];

const Home = () => {
  const { navigate } = useRouter();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#10131c] pb-24 pt-28 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(242,171,98,0.2),transparent_45%),radial-gradient(circle_at_82%_75%,rgba(137,208,197,0.16),transparent_45%)]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
                Jones & Co. Media
              </span>
              <h1 className="mb-5 text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
                <span className="font-hero block text-[#f2ab62]">
                  Distinctive brand presence.
                </span>
                <span className="block">Built with editorial precision.</span>
              </h1>
              <p className="mb-3 max-w-2xl text-lg text-white/85">
                Jones & Co. Media delivers strategic websites, social systems,
                and campaign-ready content designed to look elevated, read
                clearly, and convert consistently.
              </p>
              <p className="mb-8 text-sm font-semibold tracking-wide text-[#9ad7cd]">
                Arkansas-based studio • Serving growth-focused brands statewide
              </p>

              <div className="mb-6 flex flex-wrap gap-4">
                <Button
                  onClick={() => handleNavClick('/contact')}
                  size="lg"
                  className="bg-[#f2ab62] text-[#10131c] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f8ba79] motion-reduce:hover:translate-y-0"
                >
                  Book a Consultation <IconArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleNavClick('/services')}
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12 motion-reduce:hover:translate-y-0"
                >
                  View Services
                </Button>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
                Trusted by Arkansas brands • Fast communication • Bilingual support
              </p>
            </div>

            <HeroScene />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ec] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Positioning
              </p>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
                Local context, premium execution.
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Jones & Co. Media is built for Arkansas businesses that want to
                  look credible online without paying big-city agency retainers.
                </p>
                <p>
                  Every project is designed to be practical: clear messaging,
                  consistent branding, and content your customers actually want to
                  read.
                </p>
                <p>
                  You get strategic support with direct communication, fast
                  feedback loops, and work that reflects your business voice.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Card className="rounded-2xl border border-[#f2ab62]/30 bg-white shadow-[0_18px_45px_rgba(33,27,18,0.08)]">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                    Quick Snapshot
                  </h3>
                  <div className="space-y-3">
                    {snapshotPoints.map((item) => (
                      <div key={item.title} className="rounded-xl border border-[#f0e4d8] bg-[#fdfaf6] p-3">
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ec] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
            What We Do
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Clear, polished marketing support for businesses across Arkansas.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card
                key={service.title}
                className="group rounded-2xl border border-[#f2ab62]/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(33,27,18,0.08)] motion-reduce:hover:translate-y-0"
              >
                <CardContent className="flex h-full flex-col items-start p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f2ab62]/15">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    {service.desc}
                  </p>
                  <Button
                    onClick={() => handleNavClick(service.path)}
                    variant="link"
                    className="px-0 text-primary hover:text-[#b8673e]"
                  >
                    Learn More <IconArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProcessRail />

      <section className="border-y border-[#f2ab62]/20 bg-[#f7f2ec] py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <IconLanguage className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            Servicios en Español
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Website translation, bilingual social content, and culturally
            authentic messaging to connect with Arkansas&apos;s growing Hispanic
            community.
          </p>
          <Button
            onClick={() => handleNavClick('/contact')}
            className="bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 motion-reduce:hover:translate-y-0"
          >
            Contáctenos
          </Button>
        </div>
      </section>

      <section className="bg-[#10131c] py-20 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mb-8 text-white/70">
            Let&apos;s map out what you need and build a plan that fits your goals.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <a
              href="tel:8705770389"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <IconPhoneCall className="h-4 w-4" /> + 870 577 0389
            </a>
            <a
              href="mailto:jonescopr@gmail.com"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <IconMail className="h-4 w-4" /> jonescopr@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <IconMapPin className="h-4 w-4" /> Harrison & Fayetteville, AR
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => handleNavClick('/contact')}
              size="lg"
              className="bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 motion-reduce:hover:translate-y-0"
            >
              Schedule a Call
            </Button>
            <Button
              onClick={() => handleNavClick('/bundles')}
              variant="outline"
              size="lg"
              className="border-white/25 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:hover:translate-y-0"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ec] py-20">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-2xl border border-[#f2ab62]/20 bg-white px-6"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-display text-base font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
