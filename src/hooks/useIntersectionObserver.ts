import { useEffect, useMemo } from 'react';

interface IntersectionParams {
  root: {
    current: HTMLElement;
  };
  target: {
    current: HTMLElement;
  };
  onIntersect: () => void;
  threshold: number;
  rootMargin: string;
  enabled: boolean;
}

export const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: IntersectionParams): void => {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => entry.isIntersecting && onIntersect()),
        {
          root: root && root.current,
          rootMargin,
          threshold,
        },
      ),
    [onIntersect, root, rootMargin, threshold],
  );

  const el = target && target.current;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, el, observer]);
};
