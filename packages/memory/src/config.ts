import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 440_000

export const instantiations = 7000

export const instantiationsPath = join(root, 'packages', 'activity-bar-worker')

export const workerPath = join(root, '.tmp/dist/dist/activityBarWorkerMain.js')

export const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()
