import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IconCheck, IconHome, IconMail } from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useRouter from '@/hooks/useRouter';

const ThankYou = () => {
  const { navigate } = useRouter();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#10131c] pb-16 pt-32 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(242,171,98,0.22),transparent_45%),radial-gradient(circle_at_88%_76%,rgba(137,208,197,0.14),transparent_45%)]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/85">
              <IconCheck className="h-4 w-4 text-primary" />
              Message Received
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Thank You, Your Message Was Sent
            </h1>
            <p className="text-lg text-white/80">
              Addie Jones will follow up soon. If your request is urgent, call or
              email directly below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-2xl border-primary/20 bg-white">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <IconCheck className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
                We got it.
              </h2>
              <p className="mb-6 text-muted-foreground">
                Expect a response within 24 hours.
              </p>
              <div className="mb-6 space-y-2 text-sm text-foreground">
                <p>
                  Phone: <a href="tel:8705770389" className="text-primary">+ 870 577 0389</a>
                </p>
                <p>
                  Email:{' '}
                  <a href="mailto:jonescopr@gmail.com" className="text-primary">
                    jonescopr@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => handleNavigate('/')}
                  className="bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  <IconHome className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
                <Button
                  onClick={() => handleNavigate('/contact')}
                  variant="outline"
                  className="transition-all duration-300 hover:-translate-y-0.5"
                >
                  <IconMail className="mr-2 h-4 w-4" />
                  Send Another Message
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

export default ThankYou;
