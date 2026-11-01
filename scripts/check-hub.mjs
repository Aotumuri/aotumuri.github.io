import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/hub.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { matchesPath, readProjects } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const project = { name: 'isekai-sim', description: '', url: 'https://aotumuri.github.io/isekai-sim/', github_url: 'https://github.com/Aotumuri/isekai-sim' };
assert.equal(matchesPath(project, 'https://aotumuri.github.io/isekai-sim/old-page'), true);
assert.equal(matchesPath(project, 'https://aotumuri.github.io/ISEKAI-SIM'), true);
assert.equal(matchesPath(project, 'https://aotumuri.github.io/isekai-simulator/'), false);
assert.equal(matchesPath(project, 'https://example.com/isekai-sim/'), false);
assert.equal(matchesPath(project, 'https://aotumuri.github.io/%E0%A4%A'), false);
assert.equal(matchesPath({ ...project, url: 'https://aotumuri.github.io/' }, 'https://aotumuri.github.io/missing'), false);
assert.deepEqual(readProjects([null, project, { ...project, url: 'javascript:alert(1)' }, { ...project, github_url: 'https://example.com/repo' }]), [project]);
assert.throws(() => readProjects({}));
console.log('Hub checks passed: matching, path boundaries, malformed URLs and safe links.');
