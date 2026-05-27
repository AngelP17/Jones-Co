import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconArrowRight,
  IconBrandLinkedin,
  IconBriefcase,
  IconChecklist,
  IconFileText,
  IconSchool,
  IconWriting,
} from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type ServiceOffer = {
  name: string;
  price: string;
  perfectFor: string;
  whatYouGet: string[];
  bestFor?: string;
  note?: string;
  highlight?: string;
};

type ServiceGroup = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  offers: ServiceOffer[];
};

const serviceGroups: ServiceGroup[] = [
  {
    id: 'resume-services',
    title: 'Resume Services',
    icon: IconFileText,
    offers: [
      {
        name: 'Resume Edit',
        price: '$50',
        perfectFor: 'Students who have a resume but need it polished',
        whatYouGet: [
          'Thorough line editing for grammar, clarity, and impact',
          'Format improvements for readability',
          'Keyword optimization for ATS systems',
          'Professional suggestions for stronger bullet points',
          '48-hour turnaround',
        ],
        bestFor: 'Internship applications, job hunting, career fairs',
      },
      {
        name: 'Complete Resume Overhaul',
        price: '$100',
        perfectFor: 'Starting from scratch or major restructuring needed',
        whatYouGet: [
          "We'll talk through your experience together",
          'Professional content development',
          'Strategic formatting and layout',
          'Tailored to your field/industry',
          'Multiple rounds of revisions',
          'Cover letter template included (bonus!)',
        ],
        bestFor: 'First resume, career changes, major updates',
        highlight: 'Most Popular',
      },
    ],
  },
  {
    id: 'college-application-support',
    title: 'College Application Support',
    icon: IconSchool,
    offers: [
      {
        name: 'Essay Edit',
        price: '$75',
        perfectFor: "Students who've written their essay but need expert feedback",
        whatYouGet: [
          'Developmental feedback on content and structure',
          'Line editing for grammar, flow, and clarity',
          'Ensures your authentic voice comes through (not AI-written sounding)',
          '2 rounds of revisions',
          'Up to 650 words (Common App length)',
        ],
        note: 'I help you make it better, not write it for you.',
      },
      {
        name: 'Application Package',
        price: '$200',
        perfectFor: 'Students applying to multiple schools who want comprehensive support',
        whatYouGet: [
          'Complete resume overhaul',
          '2 essay edits (Common App + supplement)',
          'Cover letter (if needed for scholarships/programs)',
          '30-minute strategy session on how to present yourself',
          'Email support throughout application season',
        ],
        bestFor: 'Seniors applying to colleges, scholarship applications',
        note: 'Additional essays: $60 each',
      },
    ],
  },
  {
    id: 'professional-materials',
    title: 'Professional Materials',
    icon: IconBriefcase,
    offers: [
      {
        name: 'Cover Letter',
        price: '$60',
        perfectFor: 'Internships, scholarships, or job applications',
        whatYouGet: [
          'Tailored to specific position/program',
          'Highlights your relevant experience',
          'Professional tone that sounds like you',
          '1 round of revisions',
        ],
      },
      {
        name: 'LinkedIn Profile Optimization',
        price: '$40',
        perfectFor: 'Building your professional online presence',
        whatYouGet: [
          'Headline and summary rewrite',
          'Experience descriptions optimized',
          'Keyword optimization for recruiters',
          'Profile review with suggestions',
        ],
      },
    ],
  },
];

const bundles = [
  {
    name: 'Internship Ready Package',
    price: '$150',
    features: ['Resume overhaul', 'Cover letter', 'LinkedIn optimization'],
    note: 'Save $10 vs. ordering separately',
  },
  {
    name: 'College Application Package',
    price: '$200',
    features: ['Resume overhaul', '2 essay edits', 'Strategy session'],
    note: 'Everything you need for strong applications',
  },
];

const reasons = [
  {
    title: "I'm a student too.",
    body: "I'm currently at the University of Arkansas, so I know exactly what you're going through.",
  },
  {
    title: 'I know what works.',
    body: 'I have been through competitive scholarship applications (Coca-Cola Scholars Semi-Finalist, Sturgis Fellow), college admissions, and internship searches at competitive organizations like Stone Ward and Center on Budget and Policy Priorities.',
  },
  {
    title: "I'm a professional writer.",
    body: 'I edit for the Arkansas Traveler and manage content reaching 17,000+ readers weekly. Writing is not a side hobby. It is what I do.',
  },
  {
    title: 'I keep your voice.',
    body: "The goal is not to make your essay sound like a 30-year-old wrote it. It's to make your writing clearer, stronger, and more compelling.",
  },
];

const processSteps = [
  {
    title: 'Submit Your Materials',
    detail: 'Email me your resume/essay or fill out my quick form with details about what you need.',
  },
  {
    title: "We'll Schedule a Quick Call (Optional)",
    detail: 'For resume overhauls and application packages, I like to chat for 15-20 minutes to understand your goals.',
  },
  {
    title: "I'll Edit & Send Feedback",
    detail: "You'll get detailed comments, suggestions, and a polished version within the timeline.",
  },
  {
    title: 'Revisions Included',
    detail: "We'll refine it together until you're confident submitting it.",
  },
];

const StudentServices = () => {
  const { navigate } = useRouter();

  const { ref: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  const { ref: bundlesRef, isVisible: bundlesVisible } = useIntersectionObserver();
  const { ref: whyRef, isVisible: whyVisible } = useIntersectionObserver();
  const { ref: processRef, isVisible: processVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const handleGetStarted = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />

      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <p className="editorial-label mb-3">Student Services</p>
              <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Resume & Application Support for Students
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-[55ch]">
                Get into your dream school or land that internship with professional editing and guidance from someone who just went through it.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-border bg-accent p-5">
                <p className="text-sm font-medium text-foreground mb-3">Based in Fayetteville</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  University of Arkansas student. Coca-Cola Scholars Semi-Finalist. Stone Ward alum. I know what works because I have been through it.
                </p>
                <Button
                  onClick={handleGetStarted}
                  className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                >
                  Get Started
                  <IconArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={servicesRef} className={`mb-12 reveal-fade-up ${servicesVisible ? 'visible' : ''}`}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
              Services Overview
            </h2>
          </div>

          <div className="space-y-16">
            {serviceGroups.map((group, groupIndex) => (
              <div
                key={group.id}
                className={`reveal-fade-up stagger-${groupIndex + 1} ${servicesVisible ? 'visible' : ''}`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8">
                    <group.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    {group.title}
                  </h3>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {group.offers.map((offer) => (
                    <Card
                      key={offer.name}
                      className={`relative flex flex-col ${
                        offer.highlight ? 'border-primary/40 shadow-sm' : 'border-border'
                      }`}
                    >
                      {offer.highlight && (
                        <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground rounded-full px-3 py-0.5 text-xs">
                          {offer.highlight}
                        </Badge>
                      )}
                      <CardHeader className="pb-3">
                        <CardTitle className="font-display text-lg font-semibold">
                          {offer.name}
                        </CardTitle>
                        <p className="text-2xl font-semibold text-primary tracking-tight">{offer.price}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">Perfect for:</span>{' '}
                          {offer.perfectFor}
                        </p>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="mb-3 text-sm font-medium text-foreground">What you get:</p>
                        <ul className="space-y-2 flex-1">
                          {offer.whatYouGet.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                              <IconChecklist className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {offer.bestFor && (
                          <p className="mt-4 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Best for:</span>{' '}
                            {offer.bestFor}
                          </p>
                        )}

                        {offer.note && (
                          <p className="mt-3 text-sm font-medium text-foreground/80">
                            {offer.note}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={bundlesRef} className={`mb-10 reveal-fade-up ${bundlesVisible ? 'visible' : ''}`}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
              Popular Bundles
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
            {bundles.map((bundle, index) => (
              <div
                key={bundle.name}
                className={`reveal-fade-up stagger-${index + 1} ${bundlesVisible ? 'visible' : ''}`}
              >
                <Card className="border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="font-display text-lg font-semibold">{bundle.name}</CardTitle>
                    <p className="text-2xl font-semibold text-primary tracking-tight">{bundle.price}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {bundle.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <IconChecklist className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm font-medium text-foreground/80">
                      {bundle.note}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-semibold tracking-tight text-foreground">
            Why Work With Me?
          </h2>
          <div ref={whyRef} className="grid gap-5 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className={`reveal-fade-up stagger-${index + 1} ${whyVisible ? 'visible' : ''}`}
              >
                <div className="rounded-xl border border-border bg-accent p-6 h-full">
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reason.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-display text-3xl font-semibold tracking-tight">
            How It Works
          </h2>
          <div ref={processRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className={`reveal-fade-up stagger-${index + 1} ${processVisible ? 'visible' : ''}`}
              >
                <div className="rounded-xl border border-border bg-background p-6 h-full">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8 reveal-fade-up ${ctaVisible ? 'visible' : ''}`}
        >
          <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-foreground">
            Ready to apply with confidence?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground leading-relaxed">
            Send your materials and I'll help you present your story clearly, professionally, and in your own voice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full px-7"
            >
              Get Started
              <IconArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Button>
            <Button
              onClick={handleGetStarted}
              size="lg"
              variant="outline"
              className="rounded-full px-7 border-foreground/15"
            >
              Contact Me
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <IconWriting className="h-4 w-4" strokeWidth={1.5} /> Essay & resume editing
            </span>
            <span className="inline-flex items-center gap-2">
              <IconBrandLinkedin className="h-4 w-4" strokeWidth={1.5} /> LinkedIn support
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentServices;
