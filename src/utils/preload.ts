import { ComponentType, lazy, LazyExoticComponent } from 'react';

// Enhanced Lazy loader with instant prefetch/preload capability
export interface PreloadableComponent<T extends ComponentType<any>>
  extends LazyExoticComponent<T> {
  preload: () => Promise<{ default: T }>;
  isLoaded: () => boolean;
}

export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): PreloadableComponent<T> {
  let loadedModule: { default: T } | null = null;
  let factoryPromise: Promise<{ default: T }> | null = null;

  const preload = (): Promise<{ default: T }> => {
    if (loadedModule) {
      return Promise.resolve(loadedModule);
    }
    if (!factoryPromise) {
      factoryPromise = factory()
        .then((module) => {
          loadedModule = module;
          return module;
        })
        .catch((err) => {
          // Allow retry on subsequent calls if network temporarily fails
          factoryPromise = null;
          throw err;
        });
    }
    return factoryPromise;
  };

  const isLoaded = () => loadedModule !== null;

  const LazyComponent = lazy(() => {
    if (loadedModule) {
      return Promise.resolve(loadedModule);
    }
    return preload();
  });

  (LazyComponent as any).preload = preload;
  (LazyComponent as any).isLoaded = isLoaded;
  return LazyComponent as PreloadableComponent<T>;
}

// -------------------------------------------------------------
// Preloadable Application Routes & Heavy Components
// -------------------------------------------------------------

export const ProductShowcase = lazyWithPreload(() =>
  import('../../components/ProductShowcase').then((m) => ({ default: m.ProductShowcase }))
);

export const ReadingPro = lazyWithPreload(() =>
  import('../../components/ReadingPro').then((m) => ({ default: m.ReadingPro }))
);

export const Laboratory = lazyWithPreload(() =>
  import('../../components/Laboratory').then((m) => ({ default: m.Laboratory }))
);

export const Admin = lazyWithPreload(() =>
  import('../../components/Admin').then((m) => ({ default: m.Admin }))
);

export { WelcomeModal } from '../../components/WelcomeModal';
export { SupportModal } from '../../components/SupportModal';

export const preloadProductShowcase = () => ProductShowcase.preload().catch(() => {});
export const preloadReadingPro = () => ReadingPro.preload().catch(() => {});
export const preloadLaboratory = () => Laboratory.preload().catch(() => {});
export const preloadAdmin = () => Admin.preload().catch(() => {});
export const preloadWelcomeModal = () => {};
export const preloadSupportModal = () => {};

// -------------------------------------------------------------
// Image & Asset Preloader Cache
// -------------------------------------------------------------

const preloadedImages = new Set<string>();

export function preloadImage(url: string | undefined): void {
  if (!url || typeof window === 'undefined') return;
  if (preloadedImages.has(url)) return;

  preloadedImages.add(url);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  } catch (e) {
    // Ignore prefetch failures
  }
}

// Key showcase hero images and critical payment assets to warm up browser disk/memory cache
export const SHOWCASE_HERO_IMAGES = [
  '/support-qr.webp',
  '/support-qr.jpg',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1550592704-6c76defa9985?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=960&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=960&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=960&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=960&q=75&auto=format&fit=crop'
];

export function preloadAllShowcaseImages(): void {
  SHOWCASE_HERO_IMAGES.forEach((url) => preloadImage(url));
}

// -------------------------------------------------------------
// Smart Route Preloader
// -------------------------------------------------------------

export function preloadRoute(pathOrKey: string | undefined): void {
  if (!pathOrKey || typeof window === 'undefined') return;

  const target = pathOrKey.toLowerCase().trim();

  // 1. Showcase routes (/showcase/:id or direct product keys)
  if (
    target.startsWith('/showcase') ||
    target.includes('pansou') ||
    target.includes('reading-pro') ||
    target.includes('ai-agent') ||
    target.includes('chat')
  ) {
    ProductShowcase.preload();

    // Also warm up hero image for the specific showcase
    if (target.includes('pansou')) {
      preloadImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=960&q=75&auto=format&fit=crop');
    } else if (target.includes('reading-pro')) {
      preloadImage('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=960&q=75&auto=format&fit=crop');
      ReadingPro.preload(); // Preload ReadingPro workstation / reader as well
    } else if (target.includes('ai-agent') || target.includes('ai')) {
      preloadImage('https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=960&q=75&auto=format&fit=crop');
    } else if (target.includes('chat')) {
      preloadImage('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=960&q=75&auto=format&fit=crop');
    }
    return;
  }

  // 2. Reading Pro standalone reader
  if (target.startsWith('/reading-pro') || target === 'readingpro') {
    ReadingPro.preload();
    return;
  }

  // 3. Laboratory sandbox
  if (target.startsWith('/laboratory') || target === 'lab') {
    Laboratory.preload();
    return;
  }

  // 4. Admin control panel
  if (target.startsWith('/admin')) {
    Admin.preload();
    return;
  }

  // 5. Support modal
  if (target.includes('support')) {
    return;
  }
}

// -------------------------------------------------------------
// Background Idle Preloader - Runs when browser is not busy
// -------------------------------------------------------------

let idlePreloadScheduled = false;

export function startIdlePreload(): void {
  if (idlePreloadScheduled || typeof window === 'undefined') return;
  idlePreloadScheduled = true;

  const runIdle = (callback: () => void, timeout = 2000) => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback, { timeout });
    } else {
      setTimeout(callback, 200);
    }
  };

  // Phase 1: High priority - ProductShowcase (serves all 4 main cards on Home)
  runIdle(() => {
    ProductShowcase.preload().catch(() => {});
  }, 1000);

  // Phase 2: Medium priority - ReadingPro
  setTimeout(() => {
    runIdle(() => {
      ReadingPro.preload().catch(() => {});
    }, 2000);
  }, 400);

  // Phase 3: Secondary priority - Laboratory, Admin and showcase images
  setTimeout(() => {
    runIdle(() => {
      Laboratory.preload();
      preloadAllShowcaseImages();
    }, 3000);
  }, 1000);
}
