import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { IconMenu2 } from '@tabler/icons-react';
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
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  const isActive = (path: string) => currentPath === path;

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/98 backdrop-blur-sm pt-[env(safe-area-inset-top)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-baseline gap-0.5"
          >
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Jones
            </span>
            <span className="font-hero text-xl text-primary leading-[1]">&</span>
            <span className="font-display text-lg font-light tracking-wide text-foreground/60">
              Co. Media
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`relative text-[13px] font-medium tracking-[0.01em] transition-colors py-1 ${
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-primary" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={() => handleNavClick('/contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 h-9 text-[13px] font-medium tracking-wide"
            >
              Get Started
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-11 w-11 text-foreground">
                <IconMenu2 className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-[360px] bg-background border-border">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <button
                    onClick={() => handleNavClick('/')}
                    className="flex items-baseline gap-0.5"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                      Jones
                    </span>
                    <span className="font-hero text-xl text-primary leading-[1]">&</span>
                    <span className="font-display text-lg font-light tracking-wide text-foreground/60">
                      Co. Media
                    </span>
                  </button>
                </div>
                <nav className="flex flex-col gap-1 py-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.path)}
                      className={`px-4 py-3 rounded-lg text-base font-medium text-left transition-colors ${
                        isActive(link.path)
                          ? 'bg-primary/8 text-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pb-6">
                  <Button
                    onClick={() => handleNavClick('/contact')}
                    className="w-full bg-primary hover:bg-primary/90 rounded-full"
                  >
                    Get Started
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
