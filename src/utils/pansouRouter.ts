import { Language } from '../types';

export interface PansouNode {
  id: string;
  url: string;
  labels: Record<Language, { name: string; tag: string; desc: string }>;
  isPrimary?: boolean;
  isLastFallback?: boolean;
}

export const PANSOU_NODES: PansouNode[] = [
  {
    id: 'primary',
    url: 'https://so.252035.xyz',
    labels: {
      zh: { name: '主线路 · 极速节点', tag: '首选推荐', desc: '全网索引秒级直达' },
      en: { name: 'Primary · Fast Node', tag: 'Recommended', desc: 'Direct fast cloud index' },
      ja: { name: 'メイン回線 · 高速', tag: '推奨', desc: 'ミリ秒単位の高速直通' },
      ko: { name: '메인 노드 · 초고속', tag: '추천', desc: '밀리초 단위 직통' },
      es: { name: 'Línea Principal', tag: 'Recomendado', desc: 'Indexación rápida' },
      fr: { name: 'Ligne Principale', tag: 'Recommandé', desc: 'Indexation rapide' },
      de: { name: 'Hauptleitung', tag: 'Empfohlen', desc: 'Direkte Hochgeschwindigkeitsabfrage' },
      el: { name: 'Κύρια Γραμμή', tag: 'Προτεινόμενο', desc: 'Άμεση αναζήτηση' },
    },
    isPrimary: true,
  },
  {
    id: 'backup1',
    url: 'https://pansou.app/',
    labels: {
      zh: { name: '备用线路 1 · 镜像节点', tag: '高可用', desc: '云端多活容灾镜像' },
      en: { name: 'Backup 1 · Mirror Node', tag: 'High Availability', desc: 'Multi-region mirror' },
      ja: { name: '予備回線 1 · ミラー', tag: '高可用性', desc: 'クラウドミラー' },
      ko: { name: '보조 회선 1 · 미러', tag: '고가용성', desc: '안정적인 미러 서버' },
      es: { name: 'Línea de Respaldo 1', tag: 'Alta Disp.', desc: 'Servidor espejo' },
      fr: { name: 'Ligne de Secours 1', tag: 'Haute Dispo.', desc: 'Miroir cloud' },
      de: { name: 'Backup-Leitung 1', tag: 'Hochverfügbar', desc: 'Cloud-Spiegelserver' },
      el: { name: 'Εφεδρική Γραμμή 1', tag: 'Υψηλή Διαθ.', desc: 'Κατοπτρικός κόμβος' },
    },
  },
  {
    id: 'backup2',
    url: 'http://gongcheng.yyboxdns.com:12309',
    labels: {
      zh: { name: '备用线路 2 · 经典节点', tag: '终极兜底', desc: '经典自建直连通道' },
      en: { name: 'Backup 2 · Legacy Server', tag: 'Final Fallback', desc: 'Dedicated direct tunnel' },
      ja: { name: '予備回線 2 · クラシック', tag: '最終フォールバック', desc: '専用ダイレクトトンネル' },
      ko: { name: '보조 회선 2 · 레거시', tag: '최종 백업', desc: '전용 직통 터널' },
      es: { name: 'Línea de Respaldo 2', tag: 'Último Respaldo', desc: 'Túnel directo clásico' },
      fr: { name: 'Ligne de Secours 2', tag: 'Secours Ultime', desc: 'Tunnel direct classique' },
      de: { name: 'Backup-Leitung 2', tag: 'Letzter Rückfall', desc: 'Klassischer Direkt-Tunnel' },
      el: { name: 'Εφεδρική Γραμμή 2', tag: 'Τελικό Αντίγραφο', desc: 'Κλασικό κανάλι' },
    },
    isLastFallback: true,
  },
];

// Memory cache for node health probe results
const probeCache: Record<string, { healthy: boolean; latency: number; timestamp: number }> = {};
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

/**
 * Probe a URL to determine if it is reachable without triggering fatal CORS blocks.
 * In browser environment, a no-cors fetch to an existing web server returns an opaque response (resolves).
 * If the domain/server is down or connection refused/timeout, fetch throws an error (rejects).
 */
export async function probeNodeHealth(url: string, timeoutMs: number = 2200): Promise<{ healthy: boolean; latency: number }> {
  const cached = probeCache[url];
  const now = Date.now();
  if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
    return { healthy: cached.healthy, latency: cached.latency };
  }

  const startTime = performance.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Attempt no-cors fetch
    await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const latency = Math.round(performance.now() - startTime);
    probeCache[url] = { healthy: true, latency, timestamp: now };
    return { healthy: true, latency };
  } catch {
    clearTimeout(timeoutId);
    
    // As a secondary check for http/https mixed-content or restrictive environments,
    // if url is https://so.252035.xyz or https://pansou.app/, we can also test image ping with favicon/asset
    try {
      const imgPing = await new Promise<boolean>((resolve) => {
        const img = new Image();
        const imgTimeout = setTimeout(() => {
          img.src = '';
          resolve(false);
        }, 1500);
        
        img.onload = () => {
          clearTimeout(imgTimeout);
          resolve(true);
        };
        img.onerror = () => {
          // Even if image 404s, reaching the server means the host is up and responding!
          clearTimeout(imgTimeout);
          resolve(true);
        };
        img.src = `${url.replace(/\/$/, '')}/favicon.ico?_t=${Date.now()}`;
      });

      if (imgPing) {
        const latency = Math.round(performance.now() - startTime);
        probeCache[url] = { healthy: true, latency, timestamp: now };
        return { healthy: true, latency };
      }
    } catch {
      // Ignore
    }

    const latency = Math.round(performance.now() - startTime);
    probeCache[url] = { healthy: false, latency: 9999, timestamp: now };
    return { healthy: false, latency: 9999 };
  }
}

/**
 * Intelligent Node Resolver:
 * 1. Checks Node 1 (Primary: https://so.252035.xyz)
 * 2. If down, checks Node 2 (Backup 1: https://pansou.app/)
 * 3. If down, falls back to Node 3 (Backup 2: http://gongcheng.yyboxdns.com:12309)
 */
export async function resolveBestPansouNode(): Promise<{ node: PansouNode; isFallback: boolean; latency: number }> {
  // 1. Try Primary Node (https://so.252035.xyz)
  const primaryNode = PANSOU_NODES[0];
  const primaryResult = await probeNodeHealth(primaryNode.url, 2000);
  if (primaryResult.healthy) {
    return { node: primaryNode, isFallback: false, latency: primaryResult.latency };
  }

  // 2. Try Backup 1 Node (https://pansou.app/)
  const backup1Node = PANSOU_NODES[1];
  const backup1Result = await probeNodeHealth(backup1Node.url, 2000);
  if (backup1Result.healthy) {
    return { node: backup1Node, isFallback: true, latency: backup1Result.latency };
  }

  // 3. Guaranteed Last Fallback Node (http://gongcheng.yyboxdns.com:12309)
  const backup2Node = PANSOU_NODES[2];
  return { node: backup2Node, isFallback: true, latency: 0 };
}

/**
 * Direct launch with fallback notification
 */
export function openPansouUrl(url: string) {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
