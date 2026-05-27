import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import useRouter from '@/hooks/useRouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { navigate } = useRouter();

  const footerLinks = {
    services: [
      { name: 'Websites', path: '/services' },
      { name: 'Social Media', path: '/services' },
      { name: 'Content & Marketing', path: '/services' },
      { name: 'Spanish Services', path: '/services' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Bundles', path: '/bundles' },
      { name: 'Student Services', path: '/student-services' },
      { name: 'Contact', path: '/contact' },
    ],
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <button
              onClick={() => handleNavClick('/')}
              className="inline-flex items-baseline gap-0.5 mb-5"
            >
              <span className="font-display text-xl font-semibold tracking-tight text-foreground">
                Jones
              </span>
              <span className="font-hero text-2xl text-primary leading-[1]">&</span>
              <span className="font-display text-xl font-light tracking-wide text-foreground/60">
                Co. Media
              </span>
            </button>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Big-agency quality. Small-town service. Professional marketing support for Arkansas businesses.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="tel:8705770389"
                className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <IconPhone className="h-4 w-4" strokeWidth={1.5} />
                + 870 577 0389
              </a>
              <a
                href="mailto:jonescopr@gmail.com"
                className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <IconMail className="h-4 w-4" strokeWidth={1.5} />
                jonescopr@gmail.com
              </a>
              <span className="flex items-center gap-2.5 text-muted-foreground">
                <IconMapPin className="h-4 w-4" strokeWidth={1.5} />
                Harrison & Fayetteville, AR
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="editorial-label mb-4">Services</p>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="editorial-label mb-4">Company</p>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="editorial-label mb-4">Start a Project</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Ready to grow your business? Let's discuss how we can help.
            </p>
            <button
              onClick={() => handleNavClick('/contact')}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border/60">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-muted-foreground text-xs tracking-wide">
              {currentYear} Jones & Co. Media. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs tracking-wide">
              Serving Arkansas businesses with pride.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
