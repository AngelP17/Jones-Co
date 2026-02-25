import { lazy, Suspense, useEffect, useState } from 'react';
import useRouter from './hooks/useRouter';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Bundles = lazy(() => import('./pages/Bundles'));
const StudentServices = lazy(() => import('./pages/StudentServices'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

function App() {
  const { currentPath } = useRouter();
  const [displayPath, setDisplayPath] = useState(currentPath);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentPath === displayPath) return;

    setIsVisible(false);

    const timeoutId = window.setTimeout(() => {
      setDisplayPath(currentPath);
      window.requestAnimationFrame(() => setIsVisible(true));
    }, 170);

    return () => window.clearTimeout(timeoutId);
  }, [currentPath, displayPath]);

  const renderPage = (path: string) => {
    switch (path) {
      case '/':
      case '#/':
        return <Home />;
      case '/services':
        return <Services />;
      case '/bundles':
        return <Bundles />;
      case '/student-services':
        return <StudentServices />;
      case '/about':
        return <About />;
      case '/contact':
        return <Contact />;
      case '/thank-you':
        return <ThankYou />;
      default:
        return <Home />;
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          Loading...
        </div>
      }
    >
      <div
        key={displayPath}
        className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        {renderPage(displayPath)}
      </div>
    </Suspense>
  );
}

export default App;
