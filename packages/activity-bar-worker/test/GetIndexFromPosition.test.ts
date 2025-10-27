import { expect, test } from '@jest/globals'
import { getIndexFromPosition } from '../src/parts/GetIndexFromPosition/GetIndexFromPosition.ts'

test('getIndexFromPosition returns correct index within bounds', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 5

  expect(getIndexFromPosition(y, 200, 120, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 149, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(y, 200, 180, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(y, 200, 199, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(y, 200, 200, itemHeight, itemCount)).toBe(2)
})

test('getIndexFromPosition returns -1 when index is negative', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 5

  expect(getIndexFromPosition(y, 200, 99, itemHeight, itemCount)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 50, itemHeight, itemCount)).toBe(-1)
})

test('getIndexFromPosition returns -1 when index exceeds count', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 3

  expect(getIndexFromPosition(y, 200, 250, itemHeight, itemCount)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 300, itemHeight, itemCount)).toBe(-1)
})

test('getIndexFromPosition handles exact boundaries', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 3

  expect(getIndexFromPosition(y, 200, 100, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 149, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(y, 200, 199, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(y, 200, 200, itemHeight, itemCount)).toBe(2)
  expect(getIndexFromPosition(y, 200, 249, itemHeight, itemCount)).toBe(2)
  expect(getIndexFromPosition(y, 200, 250, itemHeight, itemCount)).toBe(-1)
})

test('getIndexFromPosition handles single item', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 1

  expect(getIndexFromPosition(y, 200, 100, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 149, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount)).toBe(-1)
})

test('getIndexFromPosition handles empty count', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 0

  expect(getIndexFromPosition(y, 200, 100, itemHeight, itemCount)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount)).toBe(-1)
})

test('getIndexFromPosition handles fractional calculations', () => {
  const y = 0
  const itemHeight = 30
  const itemCount = 10

  expect(getIndexFromPosition(y, 200, 0, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 29, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(y, 200, 30, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(y, 200, 45, itemHeight, itemCount)).toBe(1)
})

test('getIndexFromPosition handles different container positions', () => {
  const itemHeight = 50
  const itemCount = 3

  expect(getIndexFromPosition(0, 200, 0, itemHeight, itemCount)).toBe(0)
  expect(getIndexFromPosition(0, 200, 50, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(50, 200, 100, itemHeight, itemCount)).toBe(1)
  expect(getIndexFromPosition(200, 200, 250, itemHeight, itemCount)).toBe(1)
})
