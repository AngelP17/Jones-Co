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
    <footer className="border-t border-[#f2ab62]/15 bg-[#10131c] text-white">
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
            <p className="text-sm mb-6 max-w-xs text-white/70">
              Premium digital identity, strategic content, and measurable
              marketing execution for Arkansas businesses.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="tel:8705770389"
                className="flex items-center gap-2 text-white/70 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                + 870 577 0389
              </a>
              <a
                href="mailto:jonescopr@gmail.com"
                className="flex items-center gap-2 text-white/70 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                jonescopr@gmail.com
              </a>
              <span className="flex items-center gap-2 text-white/70">
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
                    className="text-sm text-white/70 transition-colors hover:text-primary"
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
                    className="text-sm text-white/70 transition-colors hover:text-primary"
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
            <p className="mb-4 text-sm text-white/70">
              Let&apos;s build a sharper digital presence for your next stage of
              growth.
            </p>
            <button
              onClick={() => handleNavClick('/contact')}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Book a Consultation
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              {currentYear} Jones & Co. Media. All rights reserved.
            </p>
            <p className="text-sm text-white/50">
              Strategic design, clear messaging, and conversion-first execution.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
