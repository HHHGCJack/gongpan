
export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export interface NavChild {
  title: string;
  desc: string;
  href: string;
  tag?: string;
}

export interface ProductCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  gradient?: string;
  href: string;
  tag?: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'wide';
  isExternal?: boolean;
  onToast?: () => void;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export type ThemeMode = 'light' | 'dark';
export type Language = 'zh' | 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'el';

export interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  showToast: (message: string) => void;
  handleCardToast: () => void;
  pansouEnabled: boolean;
  setPansouEnabled: (enabled: boolean) => void;
  openWelcomeModal?: (tab?: 'intro' | 'support') => void;
  openSupportModal?: () => void;
  openProductNotice?: (title: string, message?: string, productId?: string) => void;
  welcomeModalEnabled: boolean;
  setWelcomeModalEnabled: (enabled: boolean) => void;
  productsEnabled: Record<string, boolean>;
  setProductEnabled: (key: string, enabled: boolean) => void;
  isProductEnabled: (key: string) => boolean;
}
