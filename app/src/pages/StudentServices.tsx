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
  IconSparkles,
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
  icon: React.ComponentType<{ className?: string }>;
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
        perfectFor:
          'Students applying to multiple schools who want comprehensive support',
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
    detail:
      'Email me your resume/essay or fill out my quick form with details about what you need.',
  },
  {
    title: "We'll Schedule a Quick Call (Optional)",
    detail:
      'For resume overhauls and application packages, I like to chat for 15-20 minutes to understand your goals.',
  },
  {
    title: "I'll Edit & Send Feedback",
    detail:
      "You'll get detailed comments, suggestions, and a polished version within the timeline.",
  },
  {
    title: 'Revisions Included',
    detail: "We'll refine it together until you're confident submitting it.",
  },
];

const StudentServices = () => {
  const { navigate } = useRouter();

  // Scroll reveal hooks
  const { ref: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  const { ref: bundlesRef, isVisible: bundlesVisible } = useIntersectionObserver();
  const { ref: whyRef, isVisible: whyVisible } = useIntersectionObserver();
  const { ref: processRef, isVisible: processVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const revealBaseClass =
    'transition-all duration-[380ms] ease-out motion-reduce:transform-none motion-reduce:transition-none';

  const handleGetStarted = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-foreground pb-16 pt-32 text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/85">
              <IconSparkles className="h-4 w-4 text-primary" />
              Student Services
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Resume & Application Support for Students
            </h1>
            <p className="mb-3 text-lg text-background/85">
              Get into your dream school or land that internship with
              professional editing and guidance from someone who just went
              through it.
            </p>
            <p className="mb-8 text-sm font-semibold tracking-wide text-primary">
              Based in Fayetteville • University of Arkansas student • I know
              what works
            </p>
            <Button
              onClick={handleGetStarted}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              Get Started <IconArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={servicesRef}
            className={`${revealBaseClass} ${
              servicesVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            <h2 className="mb-10 font-display text-3xl font-bold text-foreground">
              Services Overview
            </h2>
          </div>

          <div className="space-y-16">
            {serviceGroups.map((group, groupIndex) => (
              <div
                key={group.id}
                className={`${revealBaseClass} delay-[60ms] ${
                  servicesVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transitionDelay: servicesVisible ? `${(groupIndex + 1) * 100}ms` : '0ms',
                }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <group.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {group.title}
                  </h3>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {group.offers.map((offer) => (
                    <Card
                      key={offer.name}
                      className={`relative ${
                        offer.highlight ? 'border-primary shadow-lg' : 'border-border'
                      }`}
                    >
                      {offer.highlight ? (
                        <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
                          {offer.highlight}
                        </Badge>
                      ) : null}
                      <CardHeader>
                        <CardTitle className="font-display text-xl">
                          {offer.name}
                        </CardTitle>
                        <p className="text-2xl font-bold text-primary">{offer.price}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Perfect for:</span>{' '}
                          {offer.perfectFor}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 text-sm font-medium text-foreground">What you get:</p>
                        <ul className="space-y-2">
                          {offer.whatYouGet.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <IconChecklist className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {offer.bestFor ? (
                          <p className="mt-4 text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">Best for:</span>{' '}
                            {offer.bestFor}
                          </p>
                        ) : null}

                        {offer.note ? (
                          <p className="mt-3 text-sm font-medium text-foreground/90">
                            {offer.note}
                          </p>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={bundlesRef}
            className={`${revealBaseClass} ${
              bundlesVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
              Popular Bundles
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {bundles.map((bundle, index) => (
              <div
                key={bundle.name}
                className={`${revealBaseClass} delay-[60ms] ${
                  bundlesVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transitionDelay: bundlesVisible ? `${(index + 1) * 60}ms` : '0ms',
                }}
              >
                <Card className="border-primary/30 h-full">
                <CardHeader>
                  <CardTitle className="font-display text-xl">{bundle.name}</CardTitle>
                  <p className="text-2xl font-bold text-primary">{bundle.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {bundle.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <IconChecklist className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-medium text-foreground/90">
                    {bundle.note}
                  </p>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-3xl font-bold text-foreground">
            Why Work With Me?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map((reason) => (
              <Card key={reason.title} className="bg-accent">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reason.body}
                  </p>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground py-16 text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-3xl font-bold">How It Works</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <Card key={step.title} className="border-white/15 bg-white/5 text-white">
                <CardContent className="p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-2 font-display text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/75">{step.detail}</p>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
            Ready to apply with confidence?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Send your materials and I&apos;ll help you present your story clearly,
            professionally, and in your own voice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Get Started →
            </Button>
            <Button
              onClick={handleGetStarted}
              size="lg"
              variant="outline"
              className="border-primary/30"
            >
              Contact Me
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <IconWriting className="h-4 w-4" /> Essay & resume editing
            </span>
            <span className="inline-flex items-center gap-2">
              <IconBrandLinkedin className="h-4 w-4" /> LinkedIn support
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentServices;
