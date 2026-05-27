import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconSend,
  IconCircleCheck,
  IconAlertCircle,
} from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgeovnd';

const serviceOptions = [
  'Website Design',
  'Social Media Management',
  'Content & Marketing',
  'Spanish Services',
  'Resume/Student Services',
  'Other',
];

const contactInfo = [
  {
    icon: IconPhone,
    title: 'Call or Text',
    value: '+ 870 577 0389',
    href: 'tel:8705770389',
  },
  {
    icon: IconMail,
    title: 'Email',
    value: 'jonescopr@gmail.com',
    href: 'mailto:jonescopr@gmail.com',
  },
  {
    icon: IconMapPin,
    title: 'Locations',
    value: 'Harrison & Fayetteville, AR',
    href: null,
  },
  {
    icon: IconClock,
    title: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

const expectations = [
  {
    title: 'Free consultation',
    body: 'No obligation, just a conversation about your goals.',
  },
  {
    title: 'Custom proposal',
    body: 'Tailored solutions based on your specific needs and budget.',
  },
  {
    title: 'Clear timeline',
    body: 'Know exactly what to expect and when.',
  },
  {
    title: 'Ongoing support',
    body: "I'm here for you even after the project is complete.",
  },
];

type FormState = 'idle' | 'submitting' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { navigate } = useRouter();
  const thankYouUrl = `${window.location.origin}${window.location.pathname}#/thank-you`;

  const { ref: formRef, isVisible: formVisible } = useIntersectionObserver();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const formDataObj = new FormData(e.currentTarget);
    formDataObj.set('service', formData.service);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formDataObj,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        navigate('/thank-you');
        window.scrollTo(0, 0);
      } else {
        setFormState('error');
        setErrorMessage('Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />

      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="editorial-label mb-3">Contact</p>
            <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ready to grow your business? Let's talk about what you need. Free consultation, no pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-accent p-5"
              >
                <item.icon className="h-5 w-5 text-primary mb-3" strokeWidth={1.5} />
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                  {item.title}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={formRef} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-7 reveal-fade-left ${formVisible ? 'visible' : ''}`}>
              <h2 className="font-display text-2xl font-semibold tracking-tight mb-6">
                Send a Message
              </h2>
              <form
                action={FORMSPREE_ENDPOINT}
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="_subject" value="New message from Jones & Co website" />
                <input type="hidden" name="_next" value={thankYouUrl} />
                <input type="hidden" name="service" value={formData.service} />
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={formState === 'submitting'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={formState === 'submitting'}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+ 870 577 0389"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={formState === 'submitting'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                      disabled={formState === 'submitting'}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or question..."
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formState === 'submitting'}
                  />
                </div>

                {formState === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-3"
                  >
                    <IconAlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="text-sm">
                      <p className="font-medium text-destructive mb-1">Submission failed</p>
                      <p className="text-muted-foreground">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 rounded-full"
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? (
                    <span aria-live="polite">Sending message...</span>
                  ) : (
                    <>
                      <IconSend className="h-4 w-4 mr-2" strokeWidth={1.5} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className={`lg:col-span-5 reveal-fade-right stagger-1 ${formVisible ? 'visible' : ''}`}>
              <h2 className="font-display text-2xl font-semibold tracking-tight mb-6">
                Schedule a Call
              </h2>
              <div className="rounded-xl border border-border bg-accent p-6 mb-8">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Prefer to talk? Schedule a free 30-minute consultation to discuss your needs.
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-full">
                  <a href="tel:8705770389">Call + 870 577 0389</a>
                </Button>
              </div>

              <h3 className="font-display text-lg font-semibold mb-5">
                What to Expect
              </h3>
              <ul className="space-y-4">
                {expectations.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <IconCircleCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.title}.</span>
                      <span className="text-sm text-muted-foreground ml-1">{item.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-8">
            Serving Arkansas
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <IconMapPin className="h-6 w-6 text-primary mb-3 mx-auto" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold mb-1">Harrison</h3>
              <p className="text-sm text-muted-foreground">
                North Arkansas hub serving Boone, Marion, and Newton counties.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <IconMapPin className="h-6 w-6 text-primary mb-3 mx-auto" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold mb-1">Fayetteville</h3>
              <p className="text-sm text-muted-foreground">
                NWA location serving Washington and Benton counties.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Don't see your area? I work with businesses anywhere in Arkansas.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
