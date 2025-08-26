"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationOptions {
  delay?: number;
  duration?: number;
  yOffset?: number;
  stagger?: number;
  trigger?: string;
  start?: string;
  end?: string;
  once?: boolean;
}

export const useScrollAnimation = (
  selector: string,
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const {
      delay = 0,
      duration = 0.5,
      yOffset = 30,
      stagger = 0,
      trigger,
      start = "top 85%",
      end = "bottom 15%",
      once = true
    } = options;

    const elements = ref.current.querySelectorAll(selector);
    
    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: yOffset,
      willChange: "opacity, transform"
    });

    // Create timeline for smooth animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || ref.current,
        start,
        end,
        once,
        toggleActions: once ? "play none none none" : "play none none reverse"
      },
      onComplete: () => {
        // Clean up will-change for performance
        gsap.set(elements, { willChange: "auto" });
      }
    });

    // Add animation to timeline
    if (stagger > 0) {
      tl.to(elements, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        stagger: stagger,
        delay
      });
    } else {
      tl.to(elements, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        delay
      });
    }

    // Cleanup function
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [selector, options]);

  return ref;
};

// Hook for multiple elements with different animations
export const useStaggeredScrollAnimation = (
  animations: Array<{
    selector: string;
    options?: ScrollAnimationOptions;
  }>
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const cleanupFunctions: (() => void)[] = [];

    animations.forEach(({ selector, options = {} }) => {
      const {
        delay = 0,
        duration = 0.5,
        yOffset = 30,
        stagger = 0,
        trigger,
        start = "top 85%",
        end = "bottom 15%",
        once = true
      } = options;

      const elements = ref.current!.querySelectorAll(selector);
      
      if (elements.length === 0) return;

      // Set initial state
      gsap.set(elements, {
        opacity: 0,
        y: yOffset,
        willChange: "opacity, transform"
      });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger || ref.current,
          start,
          end,
          once,
          toggleActions: once ? "play none none none" : "play none none reverse"
        },
        onComplete: () => {
          gsap.set(elements, { willChange: "auto" });
        }
      });

      // Add animation
      if (stagger > 0) {
        tl.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          ease: "power2.out",
          stagger: stagger,
          delay
        });
      } else {
        tl.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          ease: "power2.out",
          delay
        });
      }

      // Store cleanup function
      cleanupFunctions.push(() => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      });
    });

    // Return cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [animations]);

  return ref;
};

// Simple fade-in hook for single elements
export const useFadeInAnimation = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;

    const {
      delay = 0,
      duration = 0.5,
      yOffset = 25,
      start = "top 85%",
      once = true
    } = options;

    const element = ref.current;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: yOffset,
      willChange: "opacity, transform"
    });

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        once,
        toggleActions: once ? "play none none none" : "play none none reverse"
      },
      onComplete: () => {
        gsap.set(element, { willChange: "auto" });
      }
    });

    tl.to(element, {
      opacity: 1,
      y: 0,
      duration,
      ease: "power2.out",
      delay
    });

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [options]);

  return ref;
};
