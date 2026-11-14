import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync(new URL('../src/utils/pansouRouter.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
let revision = 0;
const freshRouter = () => import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}#${revision++}`);

async function withFetch(mock, run) {
  const original = globalThis.fetch;
  globalThis.fetch = mock;
  try { await run(await freshRouter()); }
  finally { globalThis.fetch = original; }
}

test('only the two HTTPS routes remain', async () => {
  const { PANSOU_NODES } = await freshRouter();
  assert.deepEqual(PANSOU_NODES.map(n => n.url), ['https://so.252035.xyz', 'https://pansou.app/']);
});

test('probes in parallel and selects the faster reachable backup', async () => {
  let active = 0, maxActive = 0;
  await withFetch(async url => {
    maxActive = Math.max(maxActive, ++active);
    await new Promise(resolve => setTimeout(resolve, url.includes('252035') ? 35 : 5));
    active--;
    return { type: 'opaque' };
  }, async router => {
    const result = await router.resolveBestPansouNode();
    assert.equal(result.node.id, 'backup1');
    assert.equal(result.isFallback, true);
    assert.equal(maxActive, 2);
  });
});

test('a failed primary cannot defeat a reachable backup', async () => {
  await withFetch(async url => {
    if (url.includes('252035')) throw new TypeError('Network failure');
    return { type: 'opaque' };
  }, async router => assert.equal((await router.resolveBestPansouNode()).node.id, 'backup1'));
});

test('rejects when both routes fail instead of navigating to a dead fallback', async () => {
  await withFetch(async () => { throw new TypeError('Network failure'); }, async router => {
    await assert.rejects(router.resolveBestPansouNode(), /No reachable/);
  });
});

test('deduplicates concurrent probes and reuses a fresh cache result', async () => {
  let calls = 0;
  await withFetch(async () => {
    calls++;
    await new Promise(resolve => setTimeout(resolve, 5));
    return { type: 'opaque' };
  }, async router => {
    await Promise.all([router.probeNodeHealth('https://example.test'), router.probeNodeHealth('https://example.test')]);
    await router.probeNodeHealth('https://example.test');
    assert.equal(calls, 1);
  });
});

test('aborts a hanging probe and records a failure', async () => {
  await withFetch((url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
  }), async router => {
    assert.equal((await router.probeNodeHealth('https://timeout.test', 5)).healthy, false);
  });
});

test('repeated launch clicks share one probe batch and one navigation', async () => {
  const originalWindow = globalThis.window;
  const navigations = [];
  let calls = 0;
  globalThis.window = { location: { assign: url => navigations.push(url) } };
  try {
    await withFetch(async () => {
      calls++;
      await new Promise(resolve => setTimeout(resolve, 5));
      return { type: 'opaque' };
    }, async router => {
      await Promise.all([router.openBestPansouNode(), router.openBestPansouNode(), router.openBestPansouNode()]);
      assert.equal(calls, 2);
      assert.equal(navigations.length, 1);
    });
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
