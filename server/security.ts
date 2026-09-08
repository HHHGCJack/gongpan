import { Request, Response, NextFunction } from "express";

/**
 * In-Memory Rate Limiting & Anti-Scraping / Security Shield
 * Designed to provide enterprise-grade protection with zero external dependencies.
 */

interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
}

// Memory stores
const ipRequestCounts = new Map<string, RateLimitRecord>();
const apiRequestCounts = new Map<string, RateLimitRecord>();
const bannedIps = new Map<string, number>(); // ip -> banExpiresTimestamp

// Regular expressions for detecting malicious bots and scanners
const MALICIOUS_BOT_PATTERN = new RegExp(
  "(" +
  "python-requests|python-urllib|aiohttp|httpx|scrapy|curl\\/|wget\\/|" +
  "httpclient|libwww-perl|guzzlehttp|java\\/|go-http-client|" +
  "apache-httpclient|okhttp|phantomjs|headlesschrome|selenium|" +
  "puppeteer|playwright|sqlmap|nikto|masscan|zgrab|nmap|" +
  "censys|shodan|gobuster|dirbuster|wpscan|bytespider|mj12bot" +
  ")",
  "i"
);

// Known legitimate search engines to always allow
const LEGITIMATE_BOT_PATTERN = new RegExp(
  "(" +
  "googlebot|bingbot|baiduspider|yandexbot|duckduckbot|applebot|" +
  "sogou|360spider|slurp|facebookexternalhit|twitterbot" +
  ")",
  "i"
);

// High-risk exploit and fingerprint probing patterns
const PROBE_PATTERNS = new RegExp(
  "(" +
  "\\.(env|git|svn|hg|bzr|htaccess|htpasswd|aws|ssh|ds_store)|" +
  "/(wp-admin|wp-login|xmlrpc\\.php|wp-content|wp-includes)|" +
  "/(phpmyadmin|pma|adminer|mysqladmin)|" +
  "/(actuator|eval-stdin|solr|cgi-bin)|" +
  "\\.(php|asp|aspx|jsp|cgi)$" +
  ")",
  "i"
);

// Private/Internal IP ranges for SSRF prevention
const PRIVATE_IP_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\.0\.0\.0/,
  /^::1$/,
  /^169\.254\./, // Cloud Metadata IP (AWS, GCP, Azure)
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./, // CGNAT
  /\.local$/i,
  /\.internal$/i
];

/**
 * Extracts the real client IP address considering reverse proxies.
 */
export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (typeof xForwardedFor === "string") {
    return xForwardedFor.split(",")[0].trim();
  }
  if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
    return xForwardedFor[0].trim();
  }
  return req.socket.remoteAddress || "127.0.0.1";
}

/**
 * Periodically purge stale rate limit records and expired IP bans.
 */
setInterval(() => {
  const now = Date.now();
  // Clear general rate limiter records older than 2 minutes
  for (const [ip, record] of ipRequestCounts.entries()) {
    if (now - record.firstRequestTime > 120000) {
      ipRequestCounts.delete(ip);
    }
  }
  // Clear API rate limiter records older than 2 minutes
  for (const [ip, record] of apiRequestCounts.entries()) {
    if (now - record.firstRequestTime > 120000) {
      apiRequestCounts.delete(ip);
    }
  }
  // Unban IPs whose ban period has expired
  for (const [ip, expires] of bannedIps.entries()) {
    if (now > expires) {
      bannedIps.delete(ip);
    }
  }
}, 60000);

/**
 * Security Headers Middleware
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  next();
}

/**
 * Anti-Bot & Probe Blocker Middleware
 */
export function antiBotShield(req: Request, res: Response, next: NextFunction) {
  const path = req.path;

  // Always allow robots.txt and health checks regardless of ban
  if (path === "/robots.txt" || path === "/api/health" || path.startsWith("/.well-known/")) {
    return next();
  }

  const clientIp = getClientIp(req);
  const now = Date.now();

  // 1. Check if IP is currently banned
  const banExpires = bannedIps.get(clientIp);
  if (banExpires && now < banExpires) {
    const remainingSec = Math.ceil((banExpires - now) / 1000);
    res.setHeader("Retry-After", remainingSec);
    return res.status(403).json({
      error: "Access Forbidden: Temporarily blocked due to suspicious activity",
      code: "SECURITY_BLOCK",
      retryAfterSeconds: remainingSec
    });
  }

  const userAgent = req.headers["user-agent"] || "";

  // 2. Exploit Probing & Scanner Honeypot Protection
  if (PROBE_PATTERNS.test(path)) {
    // Ban aggressive scanning IP for 10 minutes (except loopback in local dev)
    if (clientIp !== "127.0.0.1" && clientIp !== "::1") {
      bannedIps.set(clientIp, now + 10 * 60 * 1000);
    }
    console.warn(`[SECURITY] Blocked exploit probe from ${clientIp}: ${path}`);
    return res.status(404).send("Not found");
  }

  // 3. User-Agent Detection
  // Check if it's an unauthorized or malicious automated scraping tool
  if (!LEGITIMATE_BOT_PATTERN.test(userAgent)) {
    // Empty User-Agent on API request is typically an automated script
    if ((!userAgent || userAgent.trim().length < 4) && path.startsWith("/api/")) {
      console.warn(`[SECURITY] Blocked empty UA request to ${path} from ${clientIp}`);
      return res.status(403).json({ error: "Access denied: Missing valid user agent" });
    }

    // Malicious scraping tool match
    if (MALICIOUS_BOT_PATTERN.test(userAgent)) {
      console.warn(`[SECURITY] Blocked scraper (${userAgent}) from ${clientIp} to ${path}`);
      return res.status(403).json({
        error: "Access denied: Automated scraping or script access is disallowed by policy",
        code: "ANTI_SCRAPING_TRIGGERED"
      });
    }
  }

  next();
}

/**
 * Sliding Window Rate Limiter Middleware
 * @param maxRequests Maximum requests allowed within windowMs
 * @param windowMs Window duration in milliseconds (default 60000ms = 1 minute)
 */
export function rateLimiter(maxRequests: number = 180, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = getClientIp(req);
    const now = Date.now();

    // Skip rate limiting for static health checks
    if (req.path === "/api/health") {
      return next();
    }

    const store = req.path.startsWith("/api/") ? apiRequestCounts : ipRequestCounts;
    const limit = req.path.startsWith("/api/") ? Math.min(maxRequests, 60) : maxRequests;

    let record = store.get(clientIp);

    if (!record || now - record.firstRequestTime > windowMs) {
      record = { count: 1, firstRequestTime: now };
      store.set(clientIp, record);
      return next();
    }

    record.count++;

    if (record.count > limit) {
      const resetInSeconds = Math.ceil((record.firstRequestTime + windowMs - now) / 1000);
      res.setHeader("Retry-After", resetInSeconds);
      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader("X-RateLimit-Remaining", 0);
      res.setHeader("X-RateLimit-Reset", Math.floor((record.firstRequestTime + windowMs) / 1000));

      // If severely exceeding limits (e.g. 2.5x), apply a temporary ban
      if (record.count > limit * 2.5) {
        bannedIps.set(clientIp, now + 5 * 60 * 1000); // 5 minutes ban
        console.warn(`[SECURITY] High frequency DDoS/Spam attempt from ${clientIp}, banned for 5 minutes.`);
      }

      return res.status(429).json({
        error: "Too Many Requests",
        message: "You have exceeded the request rate limit. Please slow down.",
        retryAfter: resetInSeconds
      });
    }

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, limit - record.count));
    next();
  };
}

/**
 * Validate SSRF safety for proxy requests
 * Rejects private, local, and metadata IP ranges.
 */
export function isSafeExternalUrl(targetUrlStr: string): { safe: boolean; reason?: string } {
  try {
    const parsed = new URL(targetUrlStr);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { safe: false, reason: "Invalid protocol: Only HTTP and HTTPS are permitted" };
    }

    const hostname = parsed.hostname.toLowerCase();

    for (const pattern of PRIVATE_IP_PATTERNS) {
      if (pattern.test(hostname)) {
        return { safe: false, reason: "Access to private or metadata IP addresses is forbidden" };
      }
    }

    // Check for unusual ports
    if (parsed.port && parsed.port !== "80" && parsed.port !== "443") {
      // Allow standard dev or common web ports if needed, otherwise restrict
      const portNum = parseInt(parsed.port, 10);
      if (portNum < 80 || portNum > 65535) {
        return { safe: false, reason: "Invalid port number" };
      }
    }

    return { safe: true };
  } catch {
    return { safe: false, reason: "Malformed URL" };
  }
}

/**
 * Validates whether binary buffer belongs to a valid image (JPEG, PNG, WebP)
 */
export function isValidImageBuffer(buffer: Buffer): boolean {
  if (!buffer || buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return true;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return true;
  }

  // WebP: RIFF ... WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return true;
  }

  return false;
}
