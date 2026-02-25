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
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true); // Start visible on initial load

  useEffect(() => {
    if (currentPath === displayPath) return;

    // Start exit animation
    setIsExiting(true);
    setIsEntering(false);

    // After exit completes, switch content
    const exitTimeout = window.setTimeout(() => {
      setDisplayPath(currentPath);
      setIsExiting(false);

      // Trigger enter animation on next frame
      window.requestAnimationFrame(() => {
        setIsEntering(true);
      });
    }, 180);

    return () => window.clearTimeout(exitTimeout);
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
        className={`transition-opacity duration-300 ease-out ${
          isExiting
            ? 'opacity-0'
            : isEntering
            ? 'opacity-100'
            : 'opacity-0'
        }`}
      >
        {renderPage(displayPath)}
      </div>
    </Suspense>
  );
}

export default App;
