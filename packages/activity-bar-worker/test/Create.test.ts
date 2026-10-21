import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'

test('Create.create should create a new ActivityBarState', () => {
  const result = Create.create(123, 'test-uri', 10, 20, 200, 300, {}, null, 1)

  expect(result).toBeDefined()
  expect(result.accountEnabled).toBe(true)
  expect(result.dragAndDropMimeType).toBe('application/x-lvce-editor-activity-bar-item')
  expect(result.userLoginState).toBe('logged out')
})
