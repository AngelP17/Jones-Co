import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  IconBrandInstagram,
  IconCheck,
  IconDeviceDesktop,
  IconFileDescription,
  IconNews,
  IconSettings,
  IconWriting,
  IconArrowRight,
} from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type ServicePackage = {
  name: string;
  price: string;
  features: string[];
  perfectFor: string;
  popular?: boolean;
  note?: string;
  ctaLabel?: string;
};

type ServiceCategory = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  description: string;
  packages: ServicePackage[];
};

const serviceCategories: ServiceCategory[] = [
  {
    id: 'social-media',
    name: 'Social Media',
    icon: IconBrandInstagram,
    description: 'Professional social media management to grow your audience and engagement.',
    packages: [
      {
        name: 'Starter',
        price: '$300/month',
        features: ['1-2 platforms', '12 posts/month (3/week)', 'Basic engagement'],
        perfectFor: 'Businesses getting started with consistent social presence.',
      },
      {
        name: 'Growth',
        price: '$500/month',
        features: ['2-3 platforms', '20 posts/month (5/week)', 'Active engagement'],
        perfectFor: 'Businesses that want stronger momentum and faster audience growth.',
        popular: true,
      },
      {
        name: 'Premium',
        price: '$750/month',
        features: ['3+ platforms', 'Daily content (25-30 posts/month)', 'Full management'],
        perfectFor: 'Teams that need full-service execution across channels.',
      },
    ],
  },
  {
    id: 'websites',
    name: 'Websites',
    icon: IconDeviceDesktop,
    description: 'Custom-built websites that look professional and convert visitors.',
    packages: [
      {
        name: 'Starter Site',
        price: '$700',
        features: ['Up to 5 pages', 'Mobile responsive design', 'Contact form setup', 'Basic SEO foundations'],
        perfectFor: 'Small businesses launching a polished online presence.',
      },
      {
        name: 'Professional Site',
        price: '$1,200',
        features: ['Up to 10 pages', 'Custom design direction', 'Blog/news section', 'Analytics integration'],
        perfectFor: 'Businesses wanting a stronger brand and content-ready website.',
        popular: true,
      },
      {
        name: 'E-Commerce',
        price: '$2,500+',
        features: ['Online store setup', 'Payment integration', 'Product and inventory structure', 'Checkout experience optimization'],
        perfectFor: 'Businesses ready to sell products online.',
      },
    ],
  },
  {
    id: 'marketing-materials',
    name: 'Marketing Materials',
    icon: IconFileDescription,
    description: 'Professional print and digital materials that make an impact.',
    packages: [
      {
        name: 'A La Carte Design',
        price: '$50-150',
        features: ['Business cards, flyers, brochures', 'Social media graphics', 'Email templates and web banners', 'Print and digital materials'],
        perfectFor: 'One-off projects',
        note: 'Quick turnaround. Professional design. Print-ready files.',
        ctaLabel: 'View All Design Services',
      },
      {
        name: 'Brand Essentials',
        price: '$400',
        features: ['Color palette and font system', 'Brand style guide (PDF)', 'Social media templates', 'Email signature design'],
        perfectFor: 'New businesses needing visual consistency',
        note: 'Everything you need for consistent branding',
        ctaLabel: 'Learn More',
        popular: true,
      },
      {
        name: 'Complete Brand Kit',
        price: '$750',
        features: ['Everything in Brand Essentials', 'Logo refinement', 'Business cards and letterhead', '10 social templates', 'Brand voice guide'],
        perfectFor: 'Businesses wanting a full brand system',
        note: 'Your complete visual identity, ready to use',
        ctaLabel: 'Learn More',
      },
    ],
  },
  {
    id: 'content',
    name: 'Content & Communications',
    icon: IconWriting,
    description: 'Compelling written content that helps customers trust your brand.',
    packages: [
      {
        name: 'Blog Writing',
        price: '$150/post',
        features: ['SEO-informed content', 'Research and structure', 'Two revision rounds'],
        perfectFor: 'Businesses building authority online.',
      },
      {
        name: 'Newsletter',
        price: '$250/month',
        features: ['Monthly newsletter draft', 'Content planning support', 'Template polish'],
        perfectFor: 'Brands that want consistent customer communication.',
      },
      {
        name: 'Press Release',
        price: '$125',
        features: ['Professional press release writing', 'Headline and angle optimization', 'Distribution-ready format'],
        perfectFor: 'Announcements, milestones, and launches.',
      },
    ],
  },
  {
    id: 'media-pr',
    name: 'Media & PR',
    icon: IconNews,
    description: 'Get your business in front of the right outlets and audiences.',
    packages: [
      {
        name: 'Media List',
        price: '$200',
        features: ['Curated contact list', 'Arkansas and industry-relevant outlets', 'Organized outreach sheet'],
        perfectFor: 'Businesses preparing for media outreach.',
      },
      {
        name: 'Press Kit',
        price: '$400',
        features: ['Company backgrounder', 'Executive bios and fact sheet', 'Core media assets package'],
        perfectFor: 'Businesses needing polished media-ready materials.',
        popular: true,
      },
    ],
  },
  {
    id: 'digital-setup',
    name: 'Digital Setup',
    icon: IconSettings,
    description: 'Technical setup services that strengthen your marketing foundation.',
    packages: [
      {
        name: 'SEO Setup (One-time)',
        price: '$200',
        features: ['Google Business setup/optimization', 'Google Analytics setup', 'Basic website optimization'],
        perfectFor: 'Businesses establishing search visibility basics.',
      },
      {
        name: 'Email Marketing Setup',
        price: '$250',
        features: ['Platform setup', 'List import and segmentation', 'Template setup and send readiness'],
        perfectFor: 'Businesses launching email marketing the right way.',
      },
    ],
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('social-media');
  const { navigate } = useRouter();

  const { ref: tabsRef, isVisible: tabsVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const handleContact = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />

      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="editorial-label mb-3">Services & Pricing</p>
            <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Clear packages, straightforward pricing, and practical support for Arkansas businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={tabsRef} className={`reveal-fade-up ${tabsVisible ? 'visible' : ''}`}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-10 flex h-auto max-w-full justify-start gap-2 overflow-x-auto bg-transparent p-0 pb-2">
                {serviceCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="shrink-0 rounded-full border border-border px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                  >
                    <category.icon className="mr-2 h-4 w-4" strokeWidth={1.5} />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {serviceCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="mb-8">
                    <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight text-foreground">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.packages.map((pkg) => (
                      <Card
                        key={pkg.name}
                        className={`relative flex flex-col ${
                          pkg.popular
                            ? 'border-primary/40 shadow-sm bg-background'
                            : 'border-border bg-background'
                        }`}
                      >
                        {pkg.popular && (
                          <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground rounded-full px-3 py-0.5 text-xs">
                            Most Popular
                          </Badge>
                        )}
                        <CardHeader className="pb-3">
                          <CardTitle className="font-display text-lg font-semibold">
                            {pkg.name}
                          </CardTitle>
                          <p className="text-2xl font-semibold text-primary tracking-tight">
                            {pkg.price}
                          </p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                            <span className="font-medium text-foreground">Perfect for:</span>{' '}
                            {pkg.perfectFor}
                          </p>
                          <ul className="space-y-2 flex-1">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          {pkg.note && (
                            <p className="mt-4 text-sm font-medium text-foreground/80">
                              {pkg.note}
                            </p>
                          )}
                          {pkg.ctaLabel ? (
                            <Button
                              variant="link"
                              className="mt-3 px-0 text-primary h-auto"
                              onClick={handleContact}
                            >
                              {pkg.ctaLabel}
                              <IconArrowRight className="ml-1 h-3.5 w-3.5" strokeWidth={1.5} />
                            </Button>
                          ) : (
                            <Button
                              onClick={handleContact}
                              className={`mt-6 w-full rounded-full ${
                                pkg.popular
                                  ? 'bg-primary hover:bg-primary/90'
                                  : 'bg-foreground hover:bg-foreground/90 text-background'
                              }`}
                            >
                              Get Started
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8 reveal-fade-up ${ctaVisible ? 'visible' : ''}`}
        >
          <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight text-foreground">
            Not sure what you need?
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-muted-foreground leading-relaxed">
            Let's talk about your goals and put together the right mix of services for your business.
          </p>
          <Button
            onClick={handleContact}
            size="lg"
            className="bg-primary hover:bg-primary/90 rounded-full px-7"
          >
            Let's Talk
            <IconArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
