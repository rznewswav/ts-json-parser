import * as esbuild from 'esbuild';
import { glob } from 'glob';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

const requestedEntryPoints = process.argv.slice(2);
const entryPoints = requestedEntryPoints.length
  ? requestedEntryPoints
  : await glob('src/**/*.ts');

await esbuild.build({
  entryPoints: entryPoints.filter(e => !e.endsWith('test.ts')),
  outdir: 'dist/src',
  sourcemap: true,
  platform: 'node',
  format: 'cjs',
  plugins: [esbuildPluginTsc()],
  target: 'es2022',
});
