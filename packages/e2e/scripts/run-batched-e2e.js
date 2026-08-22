import { spawn } from 'node:child_process'
import { cp, mkdir, readdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const cwd = process.cwd()
const sourcePath = join(cwd, 'src')
const fixturesPath = join(cwd, 'fixtures')
const temporaryRoot = join(cwd, '.tmp')
const testWithPlaywrightPackagePath = fileURLToPath(import.meta.resolve('@lvce-editor/test-with-playwright/package.json'))
const testWithPlaywrightPath = join(dirname(testWithPlaywrightPackagePath), 'bin', 'test-with-playwright.js')

const copyTests = async (entries, browser, batchIndex) => {
  const relativeTestPath = join('.tmp', `e2e-${browser}`, String(batchIndex))
  const absoluteTestPath = join(cwd, relativeTestPath)
  const temporarySourcePath = join(absoluteTestPath, 'src')
  const temporaryFixturesPath = join(absoluteTestPath, 'fixtures')
  await mkdir(temporarySourcePath, { recursive: true })

  for (const entry of entries) {
    await cp(join(sourcePath, entry.name), join(temporarySourcePath, entry.name))
  }

  await cp(fixturesPath, temporaryFixturesPath, { recursive: true })
  return relativeTestPath
}

const getTests = async (excludedTests) => {
  const entries = await readdir(sourcePath, { withFileTypes: true })
  return entries.filter((entry) => entry.isFile() && !excludedTests.has(entry.name)).toSorted((a, b) => a.name.localeCompare(b.name))
}

const run = async (browser, testPath, forwardedArgs) => {
  const args = [testWithPlaywrightPath, '--only-extension=.', `--test-path=${testPath}`, `--browser=${browser}`, ...forwardedArgs]

  const child = spawn(process.execPath, args, {
    cwd,
    stdio: 'inherit',
  })

  return new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('exit', resolve)
  })
}

export const runBatchedE2E = async ({ browser, excludedTests = new Set(), forwardedArgs, testBatchSize }) => {
  const temporaryTestPath = join(temporaryRoot, `e2e-${browser}`)
  try {
    await rm(temporaryTestPath, { force: true, recursive: true })
    const tests = await getTests(excludedTests)
    for (let index = 0; index < tests.length; index += testBatchSize) {
      const batch = tests.slice(index, index + testBatchSize)
      const testPath = await copyTests(batch, browser, index / testBatchSize)
      const code = await run(browser, testPath, forwardedArgs)
      if (code !== 0) {
        return code ?? 1
      }
    }
    return 0
  } finally {
    await rm(temporaryTestPath, { force: true, recursive: true })
  }
}
