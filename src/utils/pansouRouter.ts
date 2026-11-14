import { Language } from '../../types';

export interface PansouNode {
  id: string;
  url: string;
  labels: Record<Language, { name: string; tag: string; desc: string }>;
  isPrimary?: boolean;
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

];

// Reachability probes cannot inspect cross-origin page content without CORS.
// Only a completed network request counts; image errors are never treated as success.
interface ProbeResult { healthy: boolean; latency: number }
const probeCache = new Map<string, ProbeResult & { expires: number }>();
const pendingProbes = new Map<string, Promise<ProbeResult>>();

export async function probeNodeHealth(url: string, timeoutMs = 2400): Promise<ProbeResult> {
  const cached = probeCache.get(url);
  if (cached && cached.expires > Date.now()) return cached;
  const pending = pendingProbes.get(url);
  if (pending) return pending;

  const probe = (async () => {
    const started = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let result: ProbeResult;
    try {
      const response = await fetch(url, {
        method: 'GET', mode: 'no-cors', cache: 'no-store',
        credentials: 'omit', referrerPolicy: 'no-referrer', signal: controller.signal,
      });
      result = { healthy: response.type === 'opaque' || response.ok, latency: Math.round(performance.now() - started) };
    } catch {
      result = { healthy: false, latency: Infinity };
    } finally {
      clearTimeout(timer);
    }
    probeCache.set(url, { ...result, expires: Date.now() + (result.healthy ? 30000 : 5000) });
    return result;
  })();
  pendingProbes.set(url, probe);
  try { return await probe; }
  finally { pendingProbes.delete(url); }
}

// Probe both HTTPS routes concurrently, then choose the fastest reachable route.
export async function resolveBestPansouNode(): Promise<{ node: PansouNode; isFallback: boolean; latency: number }> {
  const results = await Promise.all(PANSOU_NODES.map(async (node) => ({ node, ...await probeNodeHealth(node.url) })));
  const best = results.filter(result => result.healthy).sort((a, b) => a.latency - b.latency)[0];
  if (!best) throw new Error('No reachable Pansou routes');
  return { node: best.node, isFallback: !best.node.isPrimary, latency: best.latency };
}

let pendingLaunch: Promise<void> | null = null;
export function openBestPansouNode(): Promise<void> {
  if (pendingLaunch) return pendingLaunch;
  pendingLaunch = resolveBestPansouNode()
    .then(({ node }) => { window.location.assign(node.url); })
    .finally(() => { pendingLaunch = null; });
  return pendingLaunch;
}
