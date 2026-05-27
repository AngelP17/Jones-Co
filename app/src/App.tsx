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
        <div aria-label="Loading page" className="min-h-[100dvh] bg-background">
          <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
            <div className="h-3 w-24 rounded-full bg-accent" />
            <div className="mt-5 h-12 max-w-md rounded-xl bg-accent" />
            <div className="mt-4 h-5 max-w-xl rounded-full bg-accent" />
          </div>
        </div>
      }
    >
      {renderPage(currentPath)}
    </Suspense>
  );
}

export default App;
