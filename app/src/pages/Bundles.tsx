import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconCheck, IconStar, IconBolt, IconCrown } from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const bundles = [
  {
    name: 'Local Business Starter',
    icon: IconStar,
    price: '$950',
    monthly: '$75/mo',
    description: 'Everything a local business needs to establish a professional online presence.',
    bestFor: 'New businesses and startups',
    features: [
      '5-page custom website',
      'Mobile responsive design',
      'Basic SEO setup',
      'Google Business Profile setup',
      'Social media setup (2 platforms)',
      'Business card design',
      'Monthly maintenance included',
    ],
  },
  {
    name: 'Digital Presence Package',
    icon: IconBolt,
    price: '$1,400',
    monthly: '$125/mo',
    description: 'Comprehensive digital marketing to grow your audience and engagement.',
    bestFor: 'Growing businesses ready to scale',
    features: [
      '10-page professional website',
      'Blog setup & training',
      'Advanced SEO optimization',
      'Social media management (3 platforms)',
      '12 posts per month',
      'Email marketing setup',
      'Monthly newsletter',
      'Analytics dashboard',
      'Brand style guide',
    ],
    popular: true,
  },
  {
    name: 'Full-Service Growth',
    icon: IconCrown,
    price: '$2,000',
    monthly: '$400/mo',
    description: 'Complete marketing solution for businesses serious about growth.',
    bestFor: 'Established businesses seeking comprehensive marketing',
    features: [
      'Unlimited page website',
      'E-commerce ready',
      'Full social media management (4+ platforms)',
      '20 posts per month',
      'Content strategy & planning',
      'Press release writing (2/mo)',
      'Media list & pitching',
      'Monthly analytics & strategy calls',
      'Priority support',
      'All design materials included',
    ],
  },
];

const comparisonFeatures = [
  { label: 'Website Pages', starter: '5', digital: '10', full: 'Unlimited' },
  { label: 'Social Platforms', starter: '2', digital: '3', full: '4+' },
  { label: 'Monthly Posts', starter: 'Setup only', digital: '12', full: '20' },
  { label: 'SEO', starter: 'Basic', digital: 'Advanced', full: 'Comprehensive' },
  { label: 'Email Marketing', starter: false, digital: true, full: true },
  { label: 'PR Services', starter: false, digital: false, full: true },
  { label: 'Support', starter: 'Email', digital: 'Email + Phone', full: 'Priority' },
];

const Bundles = () => {
  const { navigate } = useRouter();

  const { ref: bundlesRef, isVisible: bundlesVisible } = useIntersectionObserver();
  const { ref: comparisonRef, isVisible: comparisonVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />

      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="editorial-label mb-3">Packages</p>
            <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Service Bundles
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Save money and get everything you need with our curated service packages. Designed for Arkansas businesses at every stage.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={bundlesRef} className="grid gap-6 lg:grid-cols-3">
            {bundles.map((bundle, index) => (
              <div
                key={bundle.name}
                className={`reveal-fade-up stagger-${index + 1} ${bundlesVisible ? 'visible' : ''}`}
              >
                <Card
                  className={`relative flex flex-col h-full ${
                    bundle.popular
                      ? 'border-primary/40 shadow-sm bg-background ring-1 ring-primary/10'
                      : 'border-border bg-background'
                  }`}
                >
                  {bundle.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full px-3 py-0.5 text-xs">
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                        bundle.popular ? 'bg-primary/10' : 'bg-muted'
                      }`}
                    >
                      <bundle.icon
                        className={`h-5 w-5 ${bundle.popular ? 'text-primary' : 'text-foreground/70'}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <CardTitle className="font-display text-xl font-semibold">
                      {bundle.name}
                    </CardTitle>
                    <div className="mt-3">
                      <span className="text-3xl font-semibold text-primary tracking-tight">
                        {bundle.price}
                      </span>
                      <span className="text-muted-foreground mx-1">+</span>
                      <span className="text-base font-medium text-foreground/70">
                        {bundle.monthly}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {bundle.description}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm font-medium text-foreground mb-1">Best for:</p>
                    <p className="text-sm text-muted-foreground mb-5">{bundle.bestFor}</p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {bundle.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm">
                          <IconCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleNavClick('/contact')}
                      className={`w-full rounded-full ${
                        bundle.popular
                          ? 'bg-primary hover:bg-primary/90'
                          : 'bg-foreground hover:bg-foreground/90 text-background'
                      }`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div
          ref={comparisonRef}
          className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 reveal-fade-up ${comparisonVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-2xl font-semibold tracking-tight text-center mb-10">
            Bundle Comparison
          </h2>

          <div className="overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-display text-sm font-semibold text-foreground">Feature</th>
                  <th className="text-center p-4 font-display text-sm font-semibold text-foreground">Starter</th>
                  <th className="text-center p-4 font-display text-sm font-semibold text-primary">Digital Presence</th>
                  <th className="text-center p-4 font-display text-sm font-semibold text-foreground">Full-Service</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.label} className={i < comparisonFeatures.length - 1 ? 'border-b border-border/60' : ''}>
                    <td className="p-4 text-foreground/80">{row.label}</td>
                    <td className="text-center p-4 text-muted-foreground">
                      {typeof row.starter === 'boolean'
                        ? row.starter
                          ? <IconCheck className="h-4 w-4 mx-auto text-primary" strokeWidth={1.5} />
                          : <span className="text-foreground/25">-</span>
                        : row.starter}
                    </td>
                    <td className="text-center p-4 font-medium text-primary/90">
                      {typeof row.digital === 'boolean'
                        ? row.digital
                          ? <IconCheck className="h-4 w-4 mx-auto text-primary" strokeWidth={1.5} />
                          : <span className="text-foreground/25">-</span>
                        : row.digital}
                    </td>
                    <td className="text-center p-4 text-muted-foreground">
                      {typeof row.full === 'boolean'
                        ? row.full
                          ? <IconCheck className="h-4 w-4 mx-auto text-primary" strokeWidth={1.5} />
                          : <span className="text-foreground/25">-</span>
                        : row.full}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 reveal-fade-up ${ctaVisible ? 'visible' : ''}`}
        >
          <div className="rounded-2xl border border-border bg-accent p-8 text-center md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              Every business is unique. Let's create a custom solution that fits your specific needs and budget.
            </p>
            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={() => handleNavClick('/contact')}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 rounded-full px-7 sm:w-auto"
              >
                Request Custom Quote
              </Button>
              <Button
                onClick={() => handleNavClick('/services')}
                variant="outline"
                size="lg"
                className="w-full rounded-full border-foreground/15 bg-transparent px-7 hover:bg-background sm:w-auto"
              >
                View Individual Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bundles;
