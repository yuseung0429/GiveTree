import { useEffect, useState } from 'react';

const useIsScrolled = (ref: React.RefObject<HTMLElement>) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(
    ref.current?.parentElement?.scrollTop !== 0
  );

  useEffect(() => {
    const parent = ref.current?.parentElement;

    if (!parent) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(parent.scrollTop !== 0);
    };

    parent.addEventListener('scroll', handleScroll);

    return () => {
      parent.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isScrolled;
};

export default useIsScrolled;
