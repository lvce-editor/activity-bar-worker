import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('createDefaultState should return default state', () => {
  const result = CreateDefaultState.createDefaultState()
  expect(result).toBeDefined()
  expect(result.accountEnabled).toBe(true)
  expect(result.dragAndDropMimeType).toBe('application/x-lvce-editor-activity-bar-item')
})
