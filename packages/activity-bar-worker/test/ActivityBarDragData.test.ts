import { expect, test } from '@jest/globals'
import * as ActivityBarDragData from '../src/parts/ActivityBarDragData/ActivityBarDragData.ts'

test('round trips an activity bar item id', () => {
  const data = ActivityBarDragData.getData('Source Control')

  expect(ActivityBarDragData.getId(data)).toBe('Source Control')
})

test('rejects other drag data', () => {
  expect(ActivityBarDragData.getId('text/uri-list:file:///tmp/test.txt')).toBeUndefined()
})
