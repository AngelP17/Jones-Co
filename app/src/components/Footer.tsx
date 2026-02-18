import { Phone, Mail, MapPin } from 'lucide-react';
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
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button 
              onClick={() => handleNavClick('/')}
              className="inline-block mb-4"
            >
              <span className="font-display text-2xl font-bold">
                Jones<span className="text-primary">&</span>Co. Media
              </span>
            </button>
            <p className="text-background/70 text-sm mb-6 max-w-xs">
              Big-Agency Quality. Small-Town Service. Professional marketing support for Arkansas businesses.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="tel:8705770389"
                className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                + 870 577 0389
              </a>
              <a
                href="mailto:jonescopr@gmail.com"
                className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                jonescopr@gmail.com
              </a>
              <span className="flex items-center gap-2 text-background/70">
                <MapPin className="h-4 w-4" />
                Harrison & Fayetteville, AR
              </span>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Ready to Grow?</h3>
            <p className="text-background/70 text-sm mb-4">
              Let's discuss how we can help your business thrive.
            </p>
            <button
              onClick={() => handleNavClick('/contact')}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              {currentYear} Jones & Co. Media. All rights reserved.
            </p>
            <p className="text-background/50 text-sm">
              Serving Arkansas businesses with pride.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
