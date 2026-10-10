import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = import.meta.dirname

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const workerPath = join(root, '.tmp', 'dist', 'dist', 'activityBarWorkerMain.js')

const staticServerPackagePath = fileURLToPath(new URL('.', import.meta.resolve('@lvce-editor/static-server/package.json')))
const serverStaticPath = join(staticServerPackagePath, 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerDistPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist')
const remoteUrl = getRemoteUrl(workerPath)
const occurrence = '${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/activity-bar-worker/dist/activityBarWorkerMain.js'
let found = false
for (const name of await readdir(rendererWorkerDistPath)) {
  if (!name.endsWith('.js')) {
    continue
  }
  const filePath = join(rendererWorkerDistPath, name)
  const content = await readFile(filePath, 'utf8')
  if (content.includes(remoteUrl)) {
    found = true
  } else if (content.includes(occurrence)) {
    found = true
    await writeFile(filePath, content.replaceAll(occurrence, remoteUrl))
  }
}
if (!found) {
  throw new Error('Could not find the activity bar worker URL')
}
