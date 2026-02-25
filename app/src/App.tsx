import { lazy, Suspense } from 'react';
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

  const renderPage = () => {
    switch (currentPath) {
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
        key={currentPath}
        className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500 motion-safe:ease-out motion-reduce:animate-none"
      >
        {renderPage()}
      </div>
    </Suspense>
  );
}

export default App;
