import { useState, useEffect, useCallback } from 'react';

export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash.slice(1) || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    if ((window.location.hash.slice(1) || '/') === path) {
      return;
    }
    window.location.hash = path;
  }, []);

  return { currentPath, navigate };
};

export default useRouter;
