/**
 * Responsive smooth scroll interpolator
 * Uses Cubic Ease-In-Out curve for an elegant, steady, and comfortable scroll glide
 */

let activeAnimFrame: number | null = null;

export const ultraSmoothScrollTo = (targetY: number, duration: number = 880): void => {
  if (activeAnimFrame !== null) {
    cancelAnimationFrame(activeAnimFrame);
    activeAnimFrame = null;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;

  const html = document.documentElement;
  const prevScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';

  const startTime = performance.now();

  // Smooth Cubic Ease-in-out: starts gently, glides steadily, and settles smoothly
  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(startY + diff * ease));

    if (progress < 1) {
      activeAnimFrame = requestAnimationFrame(step);
    } else {
      activeAnimFrame = null;
      html.style.scrollBehavior = prevScrollBehavior;
    }
  };

  activeAnimFrame = requestAnimationFrame(step);
};

export const scrollToElementSmoothly = (elementIdOrElement: string | HTMLElement, offset: number = 72, duration: number = 880): void => {
  const element = typeof elementIdOrElement === 'string' 
    ? document.getElementById(elementIdOrElement) 
    : elementIdOrElement;

  if (!element) return;

  const nav = document.querySelector('nav');
  const navHeight = nav ? nav.offsetHeight : offset;
  const elementPosition = element.getBoundingClientRect().top;
  const targetY = Math.max(0, elementPosition + window.pageYOffset - navHeight + 8);

  ultraSmoothScrollTo(targetY, duration);
};
