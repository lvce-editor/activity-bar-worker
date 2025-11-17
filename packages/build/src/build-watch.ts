import { execa } from 'execa'
import { root } from './root.ts'

const main = async () => {
  execa(
    'node',
    [
      `packages/build/node_modules/esbuild/bin/esbuild`,
      '--format=esm',
      '--bundle',
      '--external:node:buffer',
      '--external:electron',
      '--external:ws',
      '--external:node:worker_threads',
      '--watch',
      'packages/activity-bar-worker/src/activityBarWorkerMain.ts',
      '--outfile=.tmp/dist/dist/activityBarWorkerMain.js',
    ],
    {
      cwd: root,
      stdio: 'inherit',
    },
  )
}

main()
