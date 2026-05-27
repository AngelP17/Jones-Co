import { Button } from '@/components/ui/button';
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
    <div className="min-h-[100dvh] bg-background">
      <Navbar />

      <section className="min-h-[100dvh] flex items-center justify-center pt-16 lg:pt-[72px]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <IconCheck className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </div>

          <p className="editorial-label mb-4">Message Received</p>
          <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Thank You
          </h1>
          <p className="mb-2 text-lg text-muted-foreground">
            Your message was sent successfully.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            Addie Jones will follow up within 24 hours. If your request is urgent, call or email directly.
          </p>

          <div className="mb-8 space-y-2 text-sm">
            <p className="text-foreground">
              Phone:{' '}
              <a href="tel:8705770389" className="text-primary hover:underline">
                + 870 577 0389
              </a>
            </p>
            <p className="text-foreground">
              Email:{' '}
              <a href="mailto:jonescopr@gmail.com" className="text-primary hover:underline">
                jonescopr@gmail.com
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => handleNavigate('/')}
              className="bg-primary hover:bg-primary/90 rounded-full px-6"
            >
              <IconHome className="mr-2 h-4 w-4" strokeWidth={1.5} />
              Back to Home
            </Button>
            <Button
              onClick={() => handleNavigate('/contact')}
              variant="outline"
              className="rounded-full px-6 border-foreground/15"
            >
              <IconMail className="mr-2 h-4 w-4" strokeWidth={1.5} />
              Send Another Message
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYou;
