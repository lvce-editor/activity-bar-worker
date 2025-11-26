import { execa } from 'execa'
import { root } from './root.ts'

const main = async () => {
  const isWindows = process.platform === 'win32'
  const arg0 = isWindows ? 'node' : `packages/build/node_modules/esbuild/bin/esbuild`
  const arg1 = isWindows ? [`packages/build/node_modules/esbuild/bin/esbuild`] : []

  execa(
    arg0,
    [
      ...arg1,
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
