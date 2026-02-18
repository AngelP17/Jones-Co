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
  IconMessages,
  IconNews,
  IconPhoneCall,
  IconSparkles,
  IconWorldWww,
  IconWriting,
  IconMail,
} from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import HeroScene from '@/components/HeroScene';

const credentials = [
  { icon: IconMapPin, text: 'Arkansas-based support with statewide service' },
  {
    icon: IconNews,
    text: 'Editorial, agency, and strategic content experience for local brands',
  },
  {
    icon: IconMessages,
    text: 'Clear communication, quick turnarounds, and practical recommendations',
  },
  {
    icon: IconLanguage,
    text: 'Bilingual content support for businesses serving diverse communities',
  },
];

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-[#10131c] pb-24 pt-28 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(242,171,98,0.22),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(137,208,197,0.18),transparent_45%)]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                <IconSparkles className="h-4 w-4 text-[#f2ab62]" />
                Arkansas Marketing Studio
              </span>
              <h1 className="mb-5 text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
                <span className="font-hero block text-[#f2ab62]">
                  Big-Agency Quality.
                </span>
                <span className="block">Small-Town Service.</span>
              </h1>
              <p className="mb-3 max-w-2xl text-lg text-white/85">
                I help Arkansas businesses look professional online through
                websites, social media, marketing materials, and content that
                connects with your customers.
              </p>
              <p className="mb-8 text-sm font-semibold tracking-wide text-[#9ad7cd]">
                Your Arkansas neighbor • Serving businesses statewide
              </p>

              <div className="mb-8 flex flex-wrap gap-4">
                <Button
                  onClick={() => handleNavClick('/contact')}
                  size="lg"
                  className="bg-[#f2ab62] text-[#10131c] hover:bg-[#f8ba79]"
                >
                  Get Started <IconArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleNavClick('/services')}
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/12"
                >
                  View Services
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {credentials.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/6 p-3 backdrop-blur"
                  >
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#9ad7cd]" />
                    <p className="text-sm leading-relaxed text-white/85">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <HeroScene />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
                Local context, professional execution.
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
              <Card className="border-primary/20 bg-accent">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                    Quick Snapshot
                  </h3>
                  <div className="space-y-3">
                    {services.map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
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
                className="group bg-white transition-shadow hover:shadow-lg"
              >
                <CardContent className="flex h-full flex-col items-start p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
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
                    className="px-0 text-primary"
                  >
                    Learn More <IconArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary/20 bg-accent py-16">
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
            className="bg-primary hover:bg-primary/90"
          >
            Contáctenos
          </Button>
        </div>
      </section>

      <section className="bg-foreground py-20 text-background">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mb-8 text-background/70">
            Let&apos;s map out what you need and build a plan that fits your goals.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-background/80">
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
              className="bg-primary hover:bg-primary/90"
            >
              Schedule a Call
            </Button>
            <Button
              onClick={() => handleNavClick('/bundles')}
              variant="outline"
              size="lg"
              className="border-background/30 text-background hover:bg-background/10"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
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
