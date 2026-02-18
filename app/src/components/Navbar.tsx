import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import useRouter from '@/hooks/useRouter';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Bundles', path: '/bundles' },
  { name: 'Student Services', path: '/student-services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => currentPath === path;

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#d9c5ae]/70 bg-[#f7f2ec]/95 shadow-sm backdrop-blur-md'
          : 'border-b border-[#e9ddd0] bg-[#f7f2ec]/90 backdrop-blur'
      } pt-[env(safe-area-inset-top)]`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-1"
          >
            <span className="font-display text-xl font-bold text-foreground">
              Jones
            </span>
            <span className="font-display text-xl text-primary">&</span>
            <span className="font-display text-xl font-bold text-foreground">
              Co. Media
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 rounded-full border border-[#dfcfbd] bg-white/85 p-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-[#10131c] text-white shadow-sm'
                    : 'text-muted-foreground hover:bg-[#f4ebe0] hover:text-foreground'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => handleNavClick('/contact')}
              className="bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-[360px] bg-[#f7f2ec]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <button
                    onClick={() => handleNavClick('/')}
                    className="font-display text-xl font-bold"
                  >
                    Jones<span className="text-primary">&</span>Co. Media
                  </button>
                </div>
                <nav className="flex flex-col gap-2 py-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.path)}
                      className={`px-4 py-3 rounded-lg text-base font-medium text-left transition-colors ${
                        isActive(link.path)
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pb-6">
                  <Button
                    onClick={() => handleNavClick('/contact')}
                    className="w-full bg-primary transition-all duration-300 hover:bg-primary/90"
                  >
                    Book a Call
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
