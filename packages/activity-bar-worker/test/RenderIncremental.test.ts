import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderIncremental } from '../src/parts/RenderIncremental/RenderIncremental.ts'

const getItem = (id: string, icon: string, title: string) => {
  return {
    flags: 0,
    icon,
    id,
    keyShortcuts: '',
    title,
  }
}

test('renderIncremental returns SetPatches command with uid', () => {
  const items = [getItem('explorer', 'Explorer', 'Explorer')]
  const oldState = {
    ...createDefaultState(),
    filteredItems: items,
    initial: false,
    uid: 1,
  }
  const newState = {
    ...createDefaultState(),
    filteredItems: items,
    initial: false,
    uid: 1,
  }

  const result = renderIncremental(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetPatches)
  expect(result[1]).toBe(1)
  expect(Array.isArray(result[2])).toBe(true)
})

test('renderIncremental returns empty patches for identical rendered dom', () => {
  const items = [getItem('explorer', 'Explorer', 'Explorer')]
  const oldState = {
    ...createDefaultState(),
    filteredItems: items,
    initial: false,
    uid: 2,
  }
  const newState = {
    ...createDefaultState(),
    filteredItems: items,
    initial: false,
    uid: 2,
  }

  const result = renderIncremental(oldState, newState)

  expect(result[2]).toEqual([])
})

test('renderIncremental returns patches when rendered dom changes', () => {
  const oldState = {
    ...createDefaultState(),
    filteredItems: [getItem('explorer', 'Explorer', 'Explorer')],
    initial: false,
    uid: 3,
  }
  const newState = {
    ...createDefaultState(),
    filteredItems: [getItem('search', 'Search', 'Search')],
    initial: false,
    uid: 3,
  }

  const result = renderIncremental(oldState, newState)

  expect(result[2].length).toBeGreaterThan(0)
})
