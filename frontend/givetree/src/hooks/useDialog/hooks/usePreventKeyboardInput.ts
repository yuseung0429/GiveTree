import { useEffect } from 'react';

const usePreventKeyboardInput = () => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);
};

export default usePreventKeyboardInput;
