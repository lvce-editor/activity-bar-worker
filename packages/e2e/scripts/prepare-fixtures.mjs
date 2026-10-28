import { build } from 'esbuild'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const e2eDirectory = dirname(dirname(fileURLToPath(import.meta.url)))

const entryPoints = [
  'fixtures/sample.activity-bar-duplicate-view-ids/src/extensionMain.ts',
  'fixtures/sample.activity-bar-invalid-snapshot/src/extensionMain.ts',
  'fixtures/sample.activity-bar-invalid-view-entries/src/extensionMain.ts',
  'fixtures/sample.activity-bar-long-view-title/src/extensionMain.ts',
  'fixtures/sample.activity-bar-many-views/src/extensionMain.ts',
  'fixtures/sample.custom-view-icon-invalid-image/src/extensionMain.ts',
  'fixtures/sample.custom-view-icon-missing-image/src/extensionMain.ts',
  'fixtures/sample.custom-view-icon-png/src/extensionMain.ts',
  'fixtures/sample.custom-view-icon-svg/src/extensionMain.ts',
  'fixtures/sample.custom-view-icon-tiny-png/src/extensionMain.ts',
  'fixtures/sample.source-control-save-badge/main.js',
]

for (const entryPoint of entryPoints) {
  const extension = entryPoint.endsWith('.ts') ? '.ts' : '.js'
  const outputPath = entryPoint.slice(0, -extension.length) + '.bundle.js'
  await build({
    bundle: true,
    entryPoints: [join(e2eDirectory, entryPoint)],
    external: ['electron', 'node:*'],
    format: 'esm',
    outfile: join(e2eDirectory, outputPath),
    platform: 'browser',
  })
}
