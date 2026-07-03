import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook. Returns a ref to attach to an element and an
 * `inView` boolean that flips true (once) when the element enters the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
