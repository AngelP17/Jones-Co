import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  PenTool,
  Globe,
  MapPin,
  Award,
  Users,
  TrendingUp,
  Heart,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';

const stats = [
  { icon: Users, value: '17,000+', label: 'Weekly Readers Reached' },
  { icon: Globe, value: '30,000+', label: 'Publication Reach' },
  { icon: TrendingUp, value: '3+', label: 'Years Experience' },
  { icon: Award, value: 'Local', label: 'Project Focus' },
];

const credentials = [
  {
    icon: BarChart3,
    title: 'Content Management',
    description:
      'Managing communications for organizations reaching over 17,000 weekly readers with consistent engagement and growth.',
  },
  {
    icon: PenTool,
    title: 'Published Writer',
    description:
      'Published in outlets reaching 30,000+ people, with experience in both digital and print media.',
  },
  {
    icon: Globe,
    title: 'Agency Experience',
    description:
      'Stone Ward Advertising Agency experience in Little Rock, working with diverse clients and campaigns.',
  },
  {
    icon: Heart,
    title: 'Local Focus',
    description:
      'Arkansas native and University of Arkansas student, deeply connected to the local business community.',
  },
];

const values = [
  {
    title: 'Accessibility',
    description:
      'Every business deserves professional marketing, regardless of budget size.',
  },
  {
    title: 'Authenticity',
    description:
      'Real connections, real results. No cookie-cutter solutions.',
  },
  {
    title: 'Quality',
    description:
      'Big-agency expertise with small-town personal service.',
  },
  {
    title: 'Community',
    description:
      'Supporting Arkansas businesses and helping them thrive.',
  },
];

const About = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-foreground pt-32 pb-16 text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              About <span className="text-primary">Addie Jones</span>
            </h1>
            <p className="text-lg text-background/80">
              Marketing professional, Arkansas native, and passionate advocate
              for local businesses. Bringing big-agency experience to
              small-town prices.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <stat.icon className="mx-auto h-8 w-8 text-primary mb-3" />
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-6">
                My Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I started Jones & Co. Media because I believe every Arkansas
                  business deserves professional marketing — not just the ones
                  with big budgets.
                </p>
                <p>
                  Growing up in Arkansas, I saw how hard local business owners
                  work. I also saw how often they struggle to compete online
                  against bigger companies with dedicated marketing teams. That
                  didn't seem fair.
                </p>
                <p>
                  For the past three years, I've been building my skills in
                  communications and marketing. I've managed content for
                  organizations reaching tens of thousands of readers. I've
                  worked at Stone Ward, one of Arkansas's top advertising
                  agencies. I've learned what works — and what doesn't.
                </p>
                <p>
                  Now I'm bringing that experience home to help local businesses
                  thrive. Whether it's a new website, social media management,
                  or a complete marketing strategy, I'm here to help Arkansas
                  businesses succeed.
                </p>
                <p className="text-foreground font-medium">
                  Coffee's on me — let's talk about what your business needs.
                </p>
              </div>
            </div>
            <div className="bg-accent rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold mb-6">
                Credentials & Experience
              </h3>
              <div className="space-y-6">
                {credentials.map((cred) => (
                  <div key={cred.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <cred.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {cred.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cred.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Our Values
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            The principles that guide everything we do at Jones & Co. Media.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-center mb-8">
              Education & Background
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">
                        University of Arkansas
                      </h3>
                      <p className="text-muted-foreground">
                        Currently pursuing degree with focus on communications
                        and marketing. Active in campus organizations and
                        community initiatives.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">
                        Stone Ward Advertising Agency
                      </h3>
                      <p className="text-muted-foreground">
                        Professional experience at one of Arkansas's leading
                        advertising agencies, working with diverse clients
                        across multiple industries.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">
                        Arkansas Native
                      </h3>
                      <p className="text-muted-foreground">
                        Born and raised in Arkansas with deep roots in both
                        Harrison and Fayetteville communities. Understanding of
                        local culture and business landscape.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground py-16 text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-background/70 max-w-xl mx-auto mb-6">
            Ready to take your business to the next level? I'd love to hear
            about your goals and how I can help.
          </p>
          <button
            onClick={() => {
              navigate('/contact');
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
