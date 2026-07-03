import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const runner = join(root, 'node_modules', '@lvce-editor', 'test-with-playwright', 'bin', 'test-with-playwright.js')

const fixtures = ['png', 'svg', 'tiny-png', 'invalid-image', 'missing-image']

const runFixture = (fixture) => {
  const fixtureRoot = join(root, 'fixtures', 'custom-view-icons', fixture)
  const extensionPath = join(fixtureRoot, 'extension')
  const testPath = join(fixtureRoot, 'test')
  const args = [runner, `--only-extension=${extensionPath}`, `--test-path=${testPath}`, ...process.argv.slice(2)]
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      stdio: 'inherit',
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`custom view icon fixture ${fixture} failed with exit code ${code}`))
    })
  })
}

for (const fixture of fixtures) {
  await runFixture(fixture)
}
