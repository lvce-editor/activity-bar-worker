import { expect, test } from '@jest/globals'
import { getIndexFromPosition } from '../src/parts/GetIndexFromPosition/GetIndexFromPosition.ts'

test('getIndexFromPosition returns correct index within bounds', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 5
  const height = 400

  expect(getIndexFromPosition(y, 200, 120, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 149, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 200, 180, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 200, 199, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 200, 200, itemHeight, itemCount, height)).toBe(2)
})

test('getIndexFromPosition returns -1 when index is negative', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 5
  const height = 400

  expect(getIndexFromPosition(y, 200, 99, itemHeight, itemCount, height)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 50, itemHeight, itemCount, height)).toBe(-1)
})

test('getIndexFromPosition returns -1 when index exceeds count', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 3
  const height = 400

  expect(getIndexFromPosition(y, 200, 250, itemHeight, itemCount, height)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 300, itemHeight, itemCount, height)).toBe(-1)
})

test('getIndexFromPosition handles exact boundaries', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 3
  const height = 400
  // Top items: indices 0, 1 (at y, y+itemHeight)
  // Settings: index 2 (at y+height-itemHeight)

  expect(getIndexFromPosition(y, 200, 100, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 149, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 200, 199, itemHeight, itemCount, height)).toBe(1)
  // Gap area (should return -1)
  expect(getIndexFromPosition(y, 200, 200, itemHeight, itemCount, height)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 249, itemHeight, itemCount, height)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 250, itemHeight, itemCount, height)).toBe(-1)
  // Settings at bottom (index 2)
  expect(getIndexFromPosition(y, 200, 450, itemHeight, itemCount, height)).toBe(2)
  expect(getIndexFromPosition(y, 200, 499, itemHeight, itemCount, height)).toBe(2)
})

test('getIndexFromPosition handles single item', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 1
  const height = 400

  expect(getIndexFromPosition(y, 200, 100, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 149, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount, height)).toBe(-1)
  // Settings at bottom
  expect(getIndexFromPosition(y, 200, 450, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 499, itemHeight, itemCount, height)).toBe(0)
})

test('getIndexFromPosition handles empty count', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 0
  const height = 400

  expect(getIndexFromPosition(y, 200, 100, itemHeight, itemCount, height)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount, height)).toBe(-1)
})

test('getIndexFromPosition handles fractional calculations', () => {
  const y = 0
  const itemHeight = 30
  const itemCount = 10
  const height = 400

  expect(getIndexFromPosition(y, 200, 0, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 29, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 30, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 200, 45, itemHeight, itemCount, height)).toBe(1)
})

test('getIndexFromPosition handles different container positions', () => {
  const itemHeight = 50
  const itemCount = 3
  const height = 400

  expect(getIndexFromPosition(0, 200, 0, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(0, 200, 50, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(50, 200, 100, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(200, 200, 250, itemHeight, itemCount, height)).toBe(1)
})

test('getIndexFromPosition returns Settings index for bottom positions', () => {
  const y = 100
  const itemHeight = 50
  const itemCount = 3
  const height = 400
  // Settings is at the bottom: y + height - itemHeight to y + height
  const settingsTopY = y + height - itemHeight // 100 + 400 - 50 = 450
  const settingsBottomY = y + height // 100 + 400 = 500

  // Top items
  expect(getIndexFromPosition(y, 200, 100, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 149, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 200, 150, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 200, 199, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 200, 200, itemHeight, itemCount, height)).toBe(2)
  expect(getIndexFromPosition(y, 200, 249, itemHeight, itemCount, height)).toBe(2)
  // Gap area (should return -1)
  expect(getIndexFromPosition(y, 200, 250, itemHeight, itemCount, height)).toBe(-1)
  expect(getIndexFromPosition(y, 200, 449, itemHeight, itemCount, height)).toBe(-1)
  // Settings at bottom
  expect(getIndexFromPosition(y, 200, settingsTopY, itemHeight, itemCount, height)).toBe(2)
  expect(getIndexFromPosition(y, 200, settingsTopY + 10, itemHeight, itemCount, height)).toBe(2)
  expect(getIndexFromPosition(y, 200, settingsBottomY - 1, itemHeight, itemCount, height)).toBe(2)
})

test('getIndexFromPosition handles Settings at bottom with gap', () => {
  const y = 0
  const itemHeight = 48
  const itemCount = 2
  const height = 400
  // Settings is at the bottom: height - itemHeight to height
  const settingsTopY = height - itemHeight // 400 - 48 = 352
  const settingsBottomY = height // 400

  // Top item (index 0)
  expect(getIndexFromPosition(y, 0, 0, itemHeight, itemCount, height)).toBe(0)
  expect(getIndexFromPosition(y, 0, 47, itemHeight, itemCount, height)).toBe(0)
  // Gap area (should return -1)
  expect(getIndexFromPosition(y, 0, 48, itemHeight, itemCount, height)).toBe(-1)
  expect(getIndexFromPosition(y, 0, settingsTopY - 1, itemHeight, itemCount, height)).toBe(-1)
  // Settings at bottom (index 1)
  expect(getIndexFromPosition(y, 0, settingsTopY, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 0, settingsTopY + 10, itemHeight, itemCount, height)).toBe(1)
  expect(getIndexFromPosition(y, 0, settingsBottomY - 1, itemHeight, itemCount, height)).toBe(1)
})
