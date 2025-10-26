import { test, expect } from '@jest/globals'
import * as GetActivityBarItems from '../src/parts/GetActivityBarItems/GetActivityBarItems.ts'

test('GetActivityBarItems.getActivityBarItems should return array of ActivityBarItem', () => {
  const result = GetActivityBarItems.getActivityBarItems()

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('GetActivityBarItems.getActivityBarItems should return array with correct structure', () => {
  const result = GetActivityBarItems.getActivityBarItems()

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('GetActivityBarItems.getActivityBarItems should return items with correct structure', () => {
  const result = GetActivityBarItems.getActivityBarItems()

  for (const item of result) {
    expect(item).toHaveProperty('id')
    expect(item).toHaveProperty('title')
    expect(item).toHaveProperty('icon')
    expect(item).toHaveProperty('flags')
    expect(item).toHaveProperty('keyShortcuts')

    expect(typeof item.id).toBe('string')
    expect(typeof item.title).toBe('string')
    expect(typeof item.icon).toBe('string')
    expect(typeof item.flags).toBe('number')
    expect(typeof item.keyShortcuts).toBe('string')
  }
})

test('GetActivityBarItems.getActivityBarItems should return expected number of items', () => {
  const result = GetActivityBarItems.getActivityBarItems()

  // Based on the source code, there should be 6 items
  expect(result.length).toBe(6)
})

test('GetActivityBarItems.getActivityBarItems should have unique IDs', () => {
  const result = GetActivityBarItems.getActivityBarItems()
  const ids = result.map((item) => item.id)
  const uniqueIds = new Set(ids)

  expect(uniqueIds.size).toBe(ids.length)
})

test('GetActivityBarItems.getActivityBarItems should have non-empty titles', () => {
  const result = GetActivityBarItems.getActivityBarItems()

  for (const item of result) {
    expect(item.title.length).toBeGreaterThan(0)
  }
})
