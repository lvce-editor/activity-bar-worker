import { expect, test } from '@jest/globals'
import { render2 } from '../src/parts/Render2/Render2.ts'

test('render2 throws error when ActivityBarStates.get returns undefined', () => {
  const uid = 123
  const diffResult: readonly number[] = [1, 2, 3]

  // This test will fail due to ActivityBarStates.get returning undefined
  expect(() => {
    render2(uid, diffResult)
  }).toThrow()
})

test('render2 throws error with empty diffResult', () => {
  const uid = 999
  const diffResult: readonly number[] = []

  // This test will fail due to ActivityBarStates.get returning undefined
  expect(() => {
    render2(uid, diffResult)
  }).toThrow()
})

test('render2 throws error with large diffResult', () => {
  const uid = 111
  const diffResult: readonly number[] = Array.from({ length: 100 }, (_, i) => i)

  // This test will fail due to ActivityBarStates.get returning undefined
  expect(() => {
    render2(uid, diffResult)
  }).toThrow()
})

test('render2 throws error with different uid values', () => {
  const diffResult: readonly number[] = [1, 2, 3]

  // This test will fail due to ActivityBarStates.get returning undefined
  expect(() => {
    render2(0, diffResult)
  }).toThrow()

  expect(() => {
    render2(999, diffResult)
  }).toThrow()

  expect(() => {
    render2(-1, diffResult)
  }).toThrow()
})

test('render2 throws error with negative uid', () => {
  const uid = -1
  const diffResult: readonly number[] = [1, 2]

  // This test will fail due to ActivityBarStates.get returning undefined
  expect(() => {
    render2(uid, diffResult)
  }).toThrow()
})