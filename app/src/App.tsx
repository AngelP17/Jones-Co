import useRouter from './hooks/useRouter';
import Home from './pages/Home';
import Services from './pages/Services';
import Bundles from './pages/Bundles';
import StudentServices from './pages/StudentServices';
import About from './pages/About';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';

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

  return renderPage();
}

export default App;
