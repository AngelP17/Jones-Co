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
} from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';

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
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  packages: ServicePackage[];
};

const serviceCategories: ServiceCategory[] = [
  {
    id: 'social-media',
    name: 'Social Media',
    icon: IconBrandInstagram,
    description:
      'Professional social media management to grow your audience and engagement.',
    packages: [
      {
        name: 'Starter',
        price: '$300/month',
        features: [
          '1-2 platforms',
          '12 posts/month (3/week)',
          'Basic engagement',
        ],
        perfectFor: 'Businesses getting started with consistent social presence.',
      },
      {
        name: 'Growth',
        price: '$500/month',
        features: [
          '2-3 platforms',
          '20 posts/month (5/week)',
          'Active engagement',
        ],
        perfectFor: 'Businesses that want stronger momentum and faster audience growth.',
        popular: true,
      },
      {
        name: 'Premium',
        price: '$750/month',
        features: [
          '3+ platforms',
          'Daily content (25-30 posts/month)',
          'Full management',
        ],
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
        features: [
          'Up to 5 pages',
          'Mobile responsive design',
          'Contact form setup',
          'Basic SEO foundations',
        ],
        perfectFor: 'Small businesses launching a polished online presence.',
      },
      {
        name: 'Professional Site',
        price: '$1,200',
        features: [
          'Up to 10 pages',
          'Custom design direction',
          'Blog/news section',
          'Analytics integration',
        ],
        perfectFor: 'Businesses wanting a stronger brand and content-ready website.',
        popular: true,
      },
      {
        name: 'E-Commerce',
        price: '$2,500+',
        features: [
          'Online store setup',
          'Payment integration',
          'Product and inventory structure',
          'Checkout experience optimization',
        ],
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
        name: 'À La Carte Design',
        price: '$50-150',
        features: [
          'Business cards, flyers, brochures',
          'Social media graphics',
          'Email templates and web banners',
          'Print and digital materials',
        ],
        perfectFor: 'One-off projects',
        note: 'Quick turnaround • Professional design • Print-ready files',
        ctaLabel: 'View All Design Services →',
      },
      {
        name: 'Brand Essentials',
        price: '$400',
        features: [
          'Color palette and font system',
          'Brand style guide (PDF)',
          'Social media templates',
          'Email signature design',
        ],
        perfectFor: 'New businesses needing visual consistency',
        note: 'Everything you need for consistent branding',
        ctaLabel: 'Learn More →',
        popular: true,
      },
      {
        name: 'Complete Brand Kit',
        price: '$750',
        features: [
          'Everything in Brand Essentials',
          'Logo refinement',
          'Business cards and letterhead',
          '10 social templates',
          'Brand voice guide',
        ],
        perfectFor: 'Businesses wanting a full brand system',
        note: 'Your complete visual identity, ready to use',
        ctaLabel: 'Learn More →',
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
        features: [
          'SEO-informed content',
          'Research and structure',
          'Two revision rounds',
        ],
        perfectFor: 'Businesses building authority online.',
      },
      {
        name: 'Newsletter',
        price: '$250/month',
        features: [
          'Monthly newsletter draft',
          'Content planning support',
          'Template polish',
        ],
        perfectFor: 'Brands that want consistent customer communication.',
      },
      {
        name: 'Press Release',
        price: '$125',
        features: [
          'Professional press release writing',
          'Headline and angle optimization',
          'Distribution-ready format',
        ],
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
        features: [
          'Curated contact list',
          'Arkansas and industry-relevant outlets',
          'Organized outreach sheet',
        ],
        perfectFor: 'Businesses preparing for media outreach.',
      },
      {
        name: 'Press Kit',
        price: '$400',
        features: [
          'Company backgrounder',
          'Executive bios and fact sheet',
          'Core media assets package',
        ],
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
        features: [
          'Google Business setup/optimization',
          'Google Analytics setup',
          'Basic website optimization',
        ],
        perfectFor: 'Businesses establishing search visibility basics.',
      },
      {
        name: 'Email Marketing Setup',
        price: '$250',
        features: [
          'Platform setup',
          'List import and segmentation',
          'Template setup and send readiness',
        ],
        perfectFor: 'Businesses launching email marketing the right way.',
      },
    ],
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('social-media');
  const { navigate } = useRouter();

  const handleContact = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#10131c] pb-16 pt-32 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(242,171,98,0.22),transparent_45%),radial-gradient(circle_at_88%_76%,rgba(137,208,197,0.14),transparent_45%)]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
              Services & Pricing
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Strategic services with
              <span className="font-hero block text-[#f2ab62]"> editorial polish.</span>
            </h1>
            <p className="text-lg text-white/80">
              Straightforward pricing, conversion-focused execution, and premium
              creative direction for Arkansas businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 flex h-auto max-w-full justify-start gap-2 overflow-x-auto rounded-full border border-[#dfcfbd] bg-white p-1">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="shrink-0 rounded-full border border-transparent px-4 py-2 text-foreground transition-all duration-300 data-[state=active]:border-[#f2ab62]/30 data-[state=active]:bg-[#10131c] data-[state=active]:text-white"
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-bottom-1"
              >
                <div className="mb-8">
                  <h2 className="mb-2 font-display text-3xl font-bold">
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.packages.map((servicePackage) => (
                    <Card
                      key={servicePackage.name}
                      className={`relative ${
                        servicePackage.popular
                          ? 'border-primary/45 shadow-[0_18px_42px_rgba(33,27,18,0.12)]'
                          : 'border-[#e8dccf]'
                      }`}
                    >
                      {servicePackage.popular ? (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                          Most Popular
                        </Badge>
                      ) : null}
                      <CardHeader>
                        <CardTitle className="font-display text-xl">
                          {servicePackage.name}
                        </CardTitle>
                        <p className="text-2xl font-bold text-primary">
                          {servicePackage.price}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Perfect for:
                          </span>{' '}
                          {servicePackage.perfectFor}
                        </p>
                        <ul className="space-y-2">
                          {servicePackage.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {servicePackage.note ? (
                          <p className="mt-4 text-sm font-medium text-foreground/90">
                            {servicePackage.note}
                          </p>
                        ) : null}
                        {servicePackage.ctaLabel ? (
                          <Button
                            variant="link"
                            className="mt-3 px-0 text-primary"
                            onClick={handleContact}
                          >
                            {servicePackage.ctaLabel}
                          </Button>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-[#f2ab62]/25 bg-[#10131c] text-white">
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">
                Not sure what you need?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-white/75">
                Let&apos;s map your goals and assemble the exact service mix for
                your next growth stage.
              </p>
              <Button
                onClick={handleContact}
                size="lg"
                className="bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Book a Strategy Call
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
