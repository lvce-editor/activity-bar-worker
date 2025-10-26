import { cp, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'packages', 'server', 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/activity-bar-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

// @ts-ignore
const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/activityBarWorkerMain.js')
// @ts-ignore
const remoteUrl = getRemoteUrl(workerPath)

// const occurrence = `// const explorerWorkerUrl = \`\${assetDir}/packages/explorer-worker/dist/activityBarWorkerMain.js\`
// const explorerWorkerUrl = \`${remoteUrl}\``
// const replacement = `const explorerWorkerUrl = \`\${assetDir}/packages/explorer-worker/dist/activityBarWorkerMain.js\``
// if (!content.includes(occurrence)) {
//   throw new Error('occurrence not found')
// }
// const newContent = content.replace(occurrence, replacement)
// await writeFile(rendererWorkerPath, newContent)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
