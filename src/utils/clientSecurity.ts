/**
 * Client-Side Security & Anti-Scraping Initialization
 * Runs silently in the background to guard against scraping, tampering and automated bots.
 */

export function initClientSecurity() {
  if (typeof window === "undefined") return;

  // 1. Console Security Warning (Anti-Tampering / Copyright Protection)
  const isDev = import.meta.env.DEV;
  if (!isDev) {
    try {
      console.log(
        "%c🛡️ GongPan Security System%c\n本网站受自动化反爬虫及请求安全保护机制监控。\n未经授权的脚本抓取、批量采集或逆向分析将被记录并限制访问。\nAll rights reserved.",
        "color: #3b82f6; font-size: 16px; font-weight: bold; padding: 4px 0;",
        "color: #94a3b8; font-size: 12px; line-height: 1.5;"
      );
    } catch {
      // Ignore console logging errors
    }
  }

  // 2. Headless & Automated Browser Passive Detection
  try {
    const isWebDriver = !!(
      navigator.webdriver ||
      (window as any).__nightmare ||
      (window as any)._phantom ||
      (window as any).callPhantom
    );

    if (isWebDriver) {
      // Mark session as automated to throttle background actions silently
      (window as any).__isAutomatedEnvironment = true;
    }
  } catch {
    // Ignore detection errors
  }
}
