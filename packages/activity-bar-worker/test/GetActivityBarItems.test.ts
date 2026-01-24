import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetActivityBarItems from '../src/parts/GetActivityBarItems/GetActivityBarItems.ts'

test('GetActivityBarItems.getActivityBarItems should return array of ActivityBarItem', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = GetActivityBarItems.getActivityBarItems(state)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('GetActivityBarItems.getActivityBarItems should return array with correct structure', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = GetActivityBarItems.getActivityBarItems(state)

  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('GetActivityBarItems.getActivityBarItems should return items with correct structure', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = GetActivityBarItems.getActivityBarItems(state)

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

test('GetActivityBarItems.getActivityBarItems should return expected number of items when accountEnabled is false', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = GetActivityBarItems.getActivityBarItems(state)

  // Based on the source code, there should be 6 items (5 tabs + 1 settings button)
  expect(result.length).toBe(6)
})

test('GetActivityBarItems.getActivityBarItems should return expected number of items when accountEnabled is true', () => {
  const state = { ...CreateDefaultState.createDefaultState(), accountEnabled: true }
  const result = GetActivityBarItems.getActivityBarItems(state)

  // Based on the source code, there should be 7 items (5 tabs + 1 account button + 1 settings button)
  expect(result.length).toBe(7)
})

test('GetActivityBarItems.getActivityBarItems should have unique IDs', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = GetActivityBarItems.getActivityBarItems(state)
  const ids = result.map((item) => item.id)
  const uniqueIds = new Set(ids)

  expect(uniqueIds.size).toBe(ids.length)
})

test('GetActivityBarItems.getActivityBarItems should have non-empty titles', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = GetActivityBarItems.getActivityBarItems(state)

  for (const item of result) {
    expect(item.title.length).toBeGreaterThan(0)
  }
})

test('GetActivityBarItems.getActivityBarItems should include account button when accountEnabled is true', () => {
  const state = { ...CreateDefaultState.createDefaultState(), accountEnabled: true }
  const result = GetActivityBarItems.getActivityBarItems(state)

  const accountItem = result.find((item) => item.id === 'Account')
  expect(accountItem).toBeDefined()
  expect(accountItem?.icon).toBe('Account')
  expect(accountItem?.title).toBe('Account')
})

test('GetActivityBarItems.getActivityBarItems should not include account button when accountEnabled is false', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = GetActivityBarItems.getActivityBarItems(state)

  const accountItem = result.find((item) => item.id === 'Account')
  expect(accountItem).toBeUndefined()
})
