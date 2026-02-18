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
        <div className="flex min-h-screen items-center justify-center bg-[#f7f2ec] text-foreground">
          <div className="rounded-full border border-[#f2ab62]/30 bg-white px-5 py-2 text-sm font-medium text-foreground shadow-sm">
            Loading page...
          </div>
        </div>
      }
    >
      <main
        key={currentPath}
        className="duration-300 animate-in fade-in-50 slide-in-from-bottom-1"
      >
        {renderPage()}
      </main>
    </Suspense>
  );
}

export default App;
