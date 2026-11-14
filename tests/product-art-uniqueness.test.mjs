import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import ts from 'typescript';

const source = await readFile(new URL('../src/data/productArt.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { PRODUCT_VISUALS } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const allocations = Object.entries(PRODUCT_VISUALS).flatMap(([product, slots]) => Object.entries(slots).map(([slot, src]) => ({ owner: `${product}.${slot}`, src })));

test('each visible image has one dedicated owner across all four product pages', () => {
  for (const product of ['pansou', 'reading-pro', 'ai-agent', 'chat']) {
    for (const slot of ['detail', 'heroPrimary', 'heroSecondary']) assert.ok(PRODUCT_VISUALS[product][slot], `${product}.${slot} must have its own art`);
  }
  const owners = new Map();
  for (const { owner, src } of allocations) {
    assert.ok(!owners.has(src), `${owner} reuses the image assigned to ${owners.get(src)}`);
    owners.set(src, owner);
  }
});

test('dedicated paths exist and do not hide byte-identical copies under different names', async () => {
  const hashes = new Map();
  for (const { owner, src } of allocations) {
    const bytes = await readFile(new URL(`../public${src}`, import.meta.url));
    const digest = createHash('sha256').update(bytes).digest('hex');
    assert.ok(!hashes.has(digest), `${owner} duplicates the file contents of ${hashes.get(digest)}`);
    hashes.set(digest, owner);
  }
});
