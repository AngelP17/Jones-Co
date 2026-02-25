import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const bundles = [
  {
    name: 'Local Business Starter',
    icon: Star,
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
    color: 'border-secondary',
  },
  {
    name: 'Digital Presence Package',
    icon: Zap,
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
    color: 'border-primary',
  },
  {
    name: 'Full-Service Growth',
    icon: Crown,
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
    color: 'border-foreground',
  },
];

const Bundles = () => {
  const { navigate } = useRouter();

  // Scroll reveal hooks
  const { ref: bundlesRef, isVisible: bundlesVisible } = useIntersectionObserver();
  const { ref: comparisonRef, isVisible: comparisonVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-foreground pt-32 pb-16 text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Service <span className="text-primary">Bundles</span>
            </h1>
            <p className="text-lg text-background/80">
              Save money and get everything you need with our curated service
              packages. Designed for Arkansas businesses at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={bundlesRef} className="grid gap-8 lg:grid-cols-3">
            {bundles.map((bundle, index) => (
              <div
                key={bundle.name}
                className={`reveal-fade-up stagger-${index + 1} ${
                  bundlesVisible ? 'visible' : ''
                }`}
              >
                <Card
                  className={`relative flex flex-col h-full ${
                    bundle.popular
                      ? 'border-primary shadow-xl scale-105'
                      : bundle.color
                  }`}
                >
                {bundle.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                      bundle.popular ? 'bg-primary/10' : 'bg-muted'
                    }`}
                  >
                    <bundle.icon
                      className={`h-7 w-7 ${
                        bundle.popular ? 'text-primary' : 'text-foreground'
                      }`}
                    />
                  </div>
                  <CardTitle className="font-display text-2xl">
                    {bundle.name}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-primary">
                      {bundle.price}
                    </span>
                    <span className="text-muted-foreground"> + </span>
                    <span className="text-lg font-semibold">
                      {bundle.monthly}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {bundle.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Best for:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {bundle.bestFor}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {bundle.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleNavClick('/contact')}
                    className={`w-full ${
                      bundle.popular
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-foreground hover:bg-foreground/90'
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

      {/* Comparison */}
      <section className="bg-muted py-16">
        <div
          ref={comparisonRef}
          className={`container mx-auto px-4 sm:px-6 lg:px-8 reveal-fade-up ${
            comparisonVisible ? 'visible' : ''
          }`}
        >
          <h2 className="font-display text-2xl font-bold text-center mb-8">
            Bundle Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-display">Feature</th>
                  <th className="text-center p-4 font-display">Starter</th>
                  <th className="text-center p-4 font-display text-primary">
                    Digital Presence
                  </th>
                  <th className="text-center p-4 font-display">Full-Service</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-4">Website Pages</td>
                  <td className="text-center p-4">5</td>
                  <td className="text-center p-4 font-medium text-primary">
                    10
                  </td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Social Platforms</td>
                  <td className="text-center p-4">2</td>
                  <td className="text-center p-4 font-medium text-primary">
                    3
                  </td>
                  <td className="text-center p-4">4+</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Monthly Posts</td>
                  <td className="text-center p-4">Setup only</td>
                  <td className="text-center p-4 font-medium text-primary">
                    12
                  </td>
                  <td className="text-center p-4">20</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">SEO</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4 font-medium text-primary">
                    Advanced
                  </td>
                  <td className="text-center p-4">Comprehensive</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Email Marketing</td>
                  <td className="text-center p-4">
                    <span className="text-muted-foreground">—</span>
                  </td>
                  <td className="text-center p-4 font-medium text-primary">
                    ✓
                  </td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">PR Services</td>
                  <td className="text-center p-4">
                    <span className="text-muted-foreground">—</span>
                  </td>
                  <td className="text-center p-4">
                    <span className="text-muted-foreground">—</span>
                  </td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr>
                  <td className="p-4">Support</td>
                  <td className="text-center p-4">Email</td>
                  <td className="text-center p-4 font-medium text-primary">
                    Email + Phone
                  </td>
                  <td className="text-center p-4">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-16">
        <div
          ref={ctaRef}
          className={`container mx-auto px-4 sm:px-6 lg:px-8 reveal-fade-up ${
            ctaVisible ? 'visible' : ''
          }`}
        >
          <Card className="bg-foreground text-background">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Need a Custom Package?
              </h2>
              <p className="text-background/70 max-w-xl mx-auto mb-6">
                Every business is unique. Let's create a custom solution that
                fits your specific needs and budget.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => handleNavClick('/contact')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Request Custom Quote
                </Button>
                <Button
                  onClick={() => handleNavClick('/services')}
                  variant="outline"
                  size="lg"
                  className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
                >
                  View Individual Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bundles;
