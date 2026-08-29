import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export interface CardRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface CardTransitionData {
  categoryId: string;
  originRect: CardRect;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
  accentColor?: string;
  gradient?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  theme?: 'light' | 'dark';
}

export type TransitionStatus = 'idle' | 'expanding' | 'expanded' | 'collapsing';

interface CardTransitionContextType {
  transitionData: CardTransitionData | null;
  status: TransitionStatus;
  homeScrollY: number;
  setHomeScrollY: (y: number) => void;
  registerCardRef: (categoryId: string, el: HTMLElement | null) => void;
  getCardRect: (categoryId: string) => CardRect | null;
  startExpand: (data: CardTransitionData, onNavigate: () => void) => void;
  startCollapse: (onComplete?: () => void) => void;
  completeTransition: () => void;
}

const CardTransitionContext = createContext<CardTransitionContextType>({
  transitionData: null,
  status: 'idle',
  homeScrollY: 0,
  setHomeScrollY: () => {},
  registerCardRef: () => {},
  getCardRect: () => null,
  startExpand: () => {},
  startCollapse: () => {},
  completeTransition: () => {},
});

export const CardTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transitionData, setTransitionData] = useState<CardTransitionData | null>(() => {
    try {
      const saved = sessionStorage.getItem('gongpan_transition_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [homeScrollY, setHomeScrollYState] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem('gongpan_home_scroll_y');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [status, setStatus] = useState<TransitionStatus>('idle');
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const collapseCallbackRef = useRef<(() => void) | null>(null);

  const setHomeScrollY = useCallback((y: number) => {
    setHomeScrollYState(y);
    try {
      sessionStorage.setItem('gongpan_home_scroll_y', String(y));
    } catch {}
  }, []);

  const registerCardRef = useCallback((categoryId: string, el: HTMLElement | null) => {
    if (el) {
      cardRefs.current.set(categoryId, el);
    } else {
      cardRefs.current.delete(categoryId);
    }
  }, []);

  const getCardRect = useCallback((categoryId: string): CardRect | null => {
    const el = cardRefs.current.get(categoryId);
    if (el && typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
    }
    return transitionData?.originRect || null;
  }, [transitionData]);

  const startExpand = useCallback((data: CardTransitionData, onNavigate: () => void) => {
    setTransitionData(data);
    setStatus('expanding');

    try {
      sessionStorage.setItem('gongpan_transition_data', JSON.stringify(data));
      sessionStorage.setItem('gongpan_home_scroll_y', String(window.scrollY));
    } catch (e) {
      console.warn('SessionStorage unavailable for transition', e);
    }
    setHomeScrollYState(window.scrollY);

    // Immediate navigation - 0ms delay for zero jank
    onNavigate();
  }, []);

  const startCollapse = useCallback((onComplete?: () => void) => {
    collapseCallbackRef.current = onComplete || null;
    setStatus('collapsing');
  }, []);

  const completeTransition = useCallback(() => {
    setStatus('idle');
    if (collapseCallbackRef.current) {
      const cb = collapseCallbackRef.current;
      collapseCallbackRef.current = null;
      cb();
    }
  }, []);

  return (
    <CardTransitionContext.Provider
      value={{
        transitionData,
        status,
        homeScrollY,
        setHomeScrollY,
        registerCardRef,
        getCardRect,
        startExpand,
        startCollapse,
        completeTransition,
      }}
    >
      {children}
    </CardTransitionContext.Provider>
  );
};

export const useCardTransition = () => useContext(CardTransitionContext);
