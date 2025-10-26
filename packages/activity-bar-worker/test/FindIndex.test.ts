import { expect, test } from '@jest/globals'
import { findIndex } from '../src/parts/FindIndex/FindIndex.ts'

test('findIndex returns correct index when item exists', () => {
  const items = [{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }]

  expect(findIndex(items, 'item1')).toBe(0)
  expect(findIndex(items, 'item2')).toBe(1)
  expect(findIndex(items, 'item3')).toBe(2)
})

test('findIndex returns -1 when item does not exist', () => {
  const items = [{ id: 'item1' }, { id: 'item2' }]

  expect(findIndex(items, 'nonexistent')).toBe(-1)
})

test('findIndex returns -1 for empty array', () => {
  const items: any[] = []

  expect(findIndex(items, 'any')).toBe(-1)
})

test('findIndex returns first match when duplicates exist', () => {
  const items = [{ id: 'duplicate' }, { id: 'other' }, { id: 'duplicate' }]

  expect(findIndex(items, 'duplicate')).toBe(0)
})

test('findIndex handles single item array', () => {
  const items = [{ id: 'single' }]

  expect(findIndex(items, 'single')).toBe(0)
  expect(findIndex(items, 'other')).toBe(-1)
})
