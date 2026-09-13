import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cors from "cors";
import compression from "compression";
import { 
  securityHeaders, 
  antiBotShield, 
  rateLimiter, 
  isSafeExternalUrl, 
  isValidImageBuffer 
} from "./server/security";

const app = express();
const PORT = 3000;

// Security: Disable Express signature header
app.disable("x-powered-by");

// Trust proxy for accurate client IP resolution behind reverse proxy
app.set("trust proxy", 1);

// Apply fundamental security headers
app.use(securityHeaders);

// Anti-bot & automated crawler filter + exploit probe shield
app.use(antiBotShield);

// Global & API Rate Limiting (Protects from scraping & brute-force)
app.use(rateLimiter(200, 60000));

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

const QR_STORAGE_FILE = path.join(process.cwd(), "public", "support-qr.jpg");
const SETTINGS_STORAGE_FILE = path.join(process.cwd(), "public", "site-settings.json");

async function startServer() {
  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get dynamic site settings (welcome modal switch & product switches)
  app.get("/api/settings", (req, res) => {
    try {
      if (fs.existsSync(SETTINGS_STORAGE_FILE)) {
        const content = fs.readFileSync(SETTINGS_STORAGE_FILE, "utf-8");
        res.setHeader("Cache-Control", "no-cache");
        return res.json(JSON.parse(content));
      }
    } catch (err) {
      console.error("Read settings error:", err);
    }
    res.json({
      welcomeModalEnabled: true,
      productsEnabled: {
        'pansou': true,
        'reading-pro': true,
        'ai-agent': true,
        'chat': true,
      }
    });
  });

  // Update dynamic site settings
  app.post("/api/settings", (req, res) => {
    try {
      const newSettings = req.body;
      if (!newSettings || typeof newSettings !== "object") {
        return res.status(400).json({ error: "Invalid settings payload" });
      }
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(SETTINGS_STORAGE_FILE, JSON.stringify(newSettings, null, 2), "utf-8");
      res.json({ success: true, settings: newSettings });
    } catch (err: any) {
      console.error("Save settings error:", err);
      res.status(500).json({ error: "Failed to persist site settings" });
    }
  });

  // Get uploaded support QR code
  app.get("/api/support-qr", (req, res) => {
    if (fs.existsSync(QR_STORAGE_FILE)) {
      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.sendFile(QR_STORAGE_FILE);
    }
    res.status(404).send("Not found");
  });

  // Upload exact original support QR code (With payload and magic byte verification)
  app.post("/api/support-qr", (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64 || typeof imageBase64 !== "string") {
        return res.status(400).json({ error: "Missing or invalid imageBase64 payload" });
      }

      // Security: Check string length sanity (Max ~10MB)
      if (imageBase64.length > 15 * 1024 * 1024) {
        return res.status(413).json({ error: "Payload exceeds maximum allowed size" });
      }

      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Security: Verify buffer magic bytes belong to real image data
      if (!isValidImageBuffer(buffer)) {
        return res.status(400).json({ error: "Invalid image format: Must be genuine JPEG, PNG or WebP" });
      }
      
      // Ensure public dir exists
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(QR_STORAGE_FILE, buffer);

      // Also update src/assets/support_qr_base64.ts for bundled fallback
      const assetsDir = path.join(process.cwd(), "src", "assets");
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(assetsDir, "support_qr_base64.ts"),
        `export const SUPPORT_QR_IMGDB = "https://pic1.imgdb.cn/i/034BLlXycinjzppzDQlRoC.jpg";\n` +
        `export const SUPPORT_QR_FREEIMAGE = "https://iili.io/CZNy2mF.jpg";\n` +
        `export const SUPPORT_QR_LOCAL = "/support-qr.jpg";\n` +
        `export const SUPPORT_QR_API = "/api/support-qr";\n` +
        `export const SUPPORT_QR_BASE64 = "data:image/jpeg;base64,${base64Data}";\n` +
        `export const SUPPORT_QR_SOURCES = [\n` +
        `  "/support-qr.jpg",\n` +
        `  "https://pic1.imgdb.cn/i/034BLlXycinjzppzDQlRoC.jpg",\n` +
        `  "https://iili.io/CZNy2mF.jpg",\n` +
        `  "/api/support-qr",\n` +
        `  "data:image/jpeg;base64,${base64Data}"\n` +
        `];\n` +
        `export const DEFAULT_SUPPORT_QR = "/support-qr.jpg";\n`
      );

      res.json({ success: true, url: "/support-qr.jpg?t=" + Date.now() });
    } catch (err: any) {
      console.error("Save QR error:", err);
      res.status(500).json({ error: "Internal server error processing QR image" });
    }
  });

  // Proxy PDF with comprehensive SSRF protection, timeout, and size limits
  app.get("/api/proxy-pdf", async (req, res) => {
    let url = req.query.url as string;
    if (!url || typeof url !== "string") {
      return res.status(400).send("Missing url parameter");
    }
    
    // Normalize relative URLs to local server origin
    const isRelative = !url.startsWith("http://") && !url.startsWith("https://");
    const targetUrl = isRelative 
      ? `http://127.0.0.1:${PORT}${url.startsWith("/") ? "" : "/"}${url}` 
      : url;

    // Security: Strict SSRF & Private IP Address Inspection for external targets
    if (!isRelative) {
      const safetyCheck = isSafeExternalUrl(targetUrl);
      if (!safetyCheck.safe) {
        console.warn(`[SECURITY] Blocked SSRF attempt: ${targetUrl} (${safetyCheck.reason})`);
        return res.status(403).json({ error: "Forbidden target URL: " + safetyCheck.reason });
      }
    }
    
    // Abort controller with 12s timeout to prevent Slowloris attacks
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) GongPan-PDFProxy/1.0"
        }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("pdf") && !contentType.includes("octet-stream")) {
        const previewText = await response.text();
        console.error(`Proxy fetched non-PDF content (${contentType}):`, previewText.substring(0, 150));
        return res.status(400).send(`Target URL did not return a valid PDF.`);
      }

      // Security: Check Content-Length to avoid Out-Of-Memory DoS (Max 35MB)
      const contentLengthHeader = response.headers.get("content-length");
      if (contentLengthHeader && parseInt(contentLengthHeader, 10) > 35 * 1024 * 1024) {
        return res.status(413).send("PDF file size exceeds maximum proxy limit (35MB)");
      }
      
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength > 35 * 1024 * 1024) {
        return res.status(413).send("PDF file size exceeds maximum proxy limit (35MB)");
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.end(Buffer.from(buffer));
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("Proxy PDF error:", error?.message || error);
      res.status(500).send("Failed to proxy PDF");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Enable Gzip/deflate compression for production static files
    app.use(compression({
      level: 6,
      threshold: 1024
    }));

    const distPath = path.join(process.cwd(), "dist");
    // Serve static hashed assets with 1 year cache
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      setHeaders: (res, filePath) => {
        // HTML entry files should always be revalidated
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, must-revalidate');
        }
      }
    }));
    app.use((req, res) => {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
