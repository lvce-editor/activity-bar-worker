import { measureMemory } from '@lvce-editor/measure-memory'
import { join } from 'node:path'
import { root } from './root.ts'

const threshold = 480_000

const instantiations = 200_000

const instantiationsPath = join(root, 'packages', 'activity-bar-worker')

const workerPath = join(root, '.tmp/dist/dist/activityBarWorkerMain.js')

const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()

const main = async () => {
  await measureMemory({
    playwrightPath,
    workerPath,
    threshold,
    instantiations,
    instantiationsPath,
  })
}

main()
