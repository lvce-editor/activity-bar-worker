import { expect, test } from '@jest/globals'
import * as ActivityBarDragData from '../src/parts/ActivityBarDragData/ActivityBarDragData.ts'

test('round trips an activity bar item id', () => {
  const data = ActivityBarDragData.getData('application/x-lvce-editor-activity-bar-item', 'Source Control')

  expect(ActivityBarDragData.getId('application/x-lvce-editor-activity-bar-item', data)).toBe('Source Control')
})

test('rejects other drag data', () => {
  expect(ActivityBarDragData.getId('application/x-lvce-editor-activity-bar-item', 'text/uri-list:file:///tmp/test.txt')).toBeUndefined()
})

test('round trips an activity bar item id with a custom type', () => {
  const data = ActivityBarDragData.getData('application/x-custom-activity-bar-item', 'Source Control')

  expect(ActivityBarDragData.getId('application/x-custom-activity-bar-item', data)).toBe('Source Control')
  expect(ActivityBarDragData.getId('application/x-lvce-editor-activity-bar-item', data)).toBeUndefined()
})
