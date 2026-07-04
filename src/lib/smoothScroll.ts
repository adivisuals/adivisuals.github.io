import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function startSmoothScroll(): () => void {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReduced) {
    return () => {};
  }

  const lenis = new Lenis({
    // Duration-based easing gives that long, premium "glide" effect
    duration: 1.4, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    prevent: (node) => {
      const el = node as HTMLElement;
      if (!el || el === document.body) return false;
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const isScrollable = (overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight;
      return isScrollable;
    },
  });

  lenisInstance = lenis;

  let rafId: number;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
    lenisInstance = null;
  };
}

export function scrollToTop(immediate = false): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}