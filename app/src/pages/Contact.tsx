import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    icon: Phone,
    title: 'Call or Text',
    value: '+ 870 577 0389',
    href: 'tel:8705770389',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'jonescopr@gmail.com',
    href: 'mailto:jonescopr@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Locations',
    value: 'Harrison & Fayetteville, AR',
    href: null,
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const thankYouUrl = `${window.location.origin}${window.location.pathname}#/thank-you`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#10131c] pb-16 pt-32 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(242,171,98,0.22),transparent_45%),radial-gradient(circle_at_88%_76%,rgba(137,208,197,0.14),transparent_45%)]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-white/80">
              Ready to grow your business? Let's talk about what you need. Free
              consultation, no pressure.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item) => (
              <Card key={item.title} className="bg-white">
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.title}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-foreground">{item.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <Card className="border-[#e8dccf] bg-white">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Send a Message
                </h2>
                <form
                  action={FORMSPREE_ENDPOINT}
                  method="POST"
                  className="space-y-6"
                >
                <input
                  type="hidden"
                  name="_subject"
                  value="New message from Jones & Co website"
                />
                <input type="hidden" name="_next" value={thankYouUrl} />
                <input type="hidden" name="service" value={formData.service} />
                <input type="text" name="_gotcha" className="hidden" />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
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
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+ 870 577 0389"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                    >
                      <SelectTrigger>
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
                  />
                </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="rounded-2xl border border-[#dfcfbd] bg-white p-8 shadow-[0_16px_38px_rgba(33,27,18,0.08)]">
              <h2 className="font-display text-2xl font-bold mb-6">
                Schedule a Call
              </h2>
              <Card className="mb-6 border-[#f2ab62]/25 bg-[#f7f2ec]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Prefer to talk? Schedule a free 30-minute consultation to
                    discuss your needs.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <a href="tel:8705770389">Call + 870 577 0389</a>
                  </Button>
                </CardContent>
              </Card>

              <h3 className="font-display text-lg font-bold mb-4">
                What to Expect
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">
                      Free consultation
                    </strong>{' '}
                    — No obligation, just a conversation about your goals.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">
                      Custom proposal
                    </strong>{' '}
                    — Tailored solutions based on your specific needs and budget.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">
                      Clear timeline
                    </strong>{' '}
                    — Know exactly what to expect and when.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Ongoing support</strong>{' '}
                    — I'm here for you even after the project is complete.
                  </span>
                </li>
              </ul>

              <div className="mt-8 rounded-xl border border-[#dfcfbd] bg-[#f7f2ec] p-6">
                <p className="text-sm text-muted-foreground italic">
                  "Addie was incredibly responsive and understood exactly what I
                  needed. She made the whole process easy and stress-free."
                </p>
                <p className="text-sm font-medium mt-2">
                  — Local Business Owner, Harrison AR
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-[#f2eae0] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-center mb-8">
            Serving Arkansas
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display text-lg font-bold mb-1">
                  Harrison
                </h3>
                <p className="text-muted-foreground text-sm">
                  North Arkansas hub serving Boone, Marion, and Newton counties.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display text-lg font-bold mb-1">
                  Fayetteville
                </h3>
                <p className="text-muted-foreground text-sm">
                  NWA location serving Washington and Benton counties.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-muted-foreground mt-6">
            Don't see your area? I work with businesses anywhere — let's connect!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
