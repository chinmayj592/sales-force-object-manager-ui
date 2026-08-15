import { useEffect, useRef } from 'react';

export function useIntersectionObserver(callback, options = {}) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    }, { threshold: 0.1, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, [callback, options]);

  return sentinelRef;
}
