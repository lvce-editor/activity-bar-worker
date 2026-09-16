import { expect, test } from '@jest/globals'
import { readFile } from 'node:fs/promises'

test('contributes the account setting', async () => {
  const settingsUrl = new URL('../settings.json', import.meta.url)
  const settings = JSON.parse(await readFile(settingsUrl, 'utf8'))

  expect(settings).toContainEqual(
    expect.objectContaining({
      id: 'activityBar.accountEnabled',
      type: 'boolean',
      value: true,
    }),
  )
})

test('contributes the activity bar drag and drop setting', async () => {
  const settingsUrl = new URL('../settings.json', import.meta.url)
  const settings = JSON.parse(await readFile(settingsUrl, 'utf8'))

  expect(settings).toContainEqual(
    expect.objectContaining({
      id: 'activityBar.dragAndDropEnabled',
      type: 'boolean',
      value: false,
    }),
  )
})
