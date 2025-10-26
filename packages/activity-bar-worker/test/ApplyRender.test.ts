import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { applyRender } from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as FocusId from '../src/parts/FocusId/FocusId.ts'

test('applyRender returns empty array when diffResult is empty', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = []

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result).toEqual([])
})

test('applyRender returns empty array when diffResult contains RenderCss', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = [DiffType.RenderCss]

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result).toEqual([])
})

test('applyRender returns empty array when diffResult contains RenderFocusContext with focus not List', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 123,
    focus: 0,
  }
  const diffResult: readonly number[] = [DiffType.RenderFocusContext]

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result).toEqual([])
})

test('applyRender returns commands when diffResult contains RenderFocusContext with focus List', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 456,
    focus: FocusId.List,
  }
  const diffResult: readonly number[] = [DiffType.RenderFocusContext]

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result.length).toBe(1)
  expect(result[0].length).toBe(3)
  expect(result[0][0]).toBe(ViewletCommand.SetFocusContext)
  expect(result[0][1]).toBe(456)
})

test('applyRender returns commands when diffResult contains RenderItems', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 789,
    activityBarItems: [],
  }
  const diffResult: readonly number[] = [DiffType.RenderItems]

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result.length).toBe(1)
  expect(result[0].length).toBe(3)
  expect(result[0][0]).toBe(ViewletCommand.SetDom2)
  expect(result[0][1]).toBe(789)
})

test('applyRender filters out empty results', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 123,
    focus: FocusId.List,
  }
  const diffResult: readonly number[] = [DiffType.RenderCss, DiffType.RenderFocusContext, DiffType.RenderCss]

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result.length).toBe(1)
  expect(result[0][0]).toBe(ViewletCommand.SetFocusContext)
})

test('applyRender collects multiple non-empty results', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 456,
    focus: FocusId.List,
    activityBarItems: [],
  }
  const diffResult: readonly number[] = [DiffType.RenderItems, DiffType.RenderFocusContext]

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result.length).toBe(2)
  expect(result[0][0]).toBe(ViewletCommand.SetDom2)
  expect(result[1][0]).toBe(ViewletCommand.SetFocusContext)
})

test('applyRender returns new array each time', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = []

  const result1: readonly any[] = applyRender(oldState, newState, diffResult)
  const result2: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result1).not.toBe(result2)
  expect(result1).toEqual(result2)
})

test('applyRender throws error for unknown diffType', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()
  const diffResult: readonly number[] = [999]

  expect(() => {
    applyRender(oldState, newState, diffResult)
  }).toThrow('unknown renderer')
})

test('applyRender handles RenderFocus with focus List', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    uid: 111,
    focus: FocusId.List,
  }
  const diffResult: readonly number[] = [DiffType.RenderFocus]

  const result: readonly any[] = applyRender(oldState, newState, diffResult)

  expect(result.length).toBe(1)
  expect(result[0][0]).toBe(ViewletCommand.SetFocusContext)
})
