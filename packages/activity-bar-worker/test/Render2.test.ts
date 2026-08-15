import { expect, jest, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as FocusId from '../src/parts/FocusId/FocusId.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

test('render2 updates states in registry and returns commands', async () => {
  const uid = 123
  const oldState: ActivityBarState = { ...createDefaultState(), focusedIndex: 0, uid }
  const newState: ActivityBarState = { ...createDefaultState(), focusedIndex: 1, uid }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderItems]

  const commands = await Render2.render2(uid, diffResult)

  expect(commands).toBeDefined()
  expect(Array.isArray(commands)).toBe(true)
  const { newState: storedNewState, oldState: storedOldState } = ActivityBarStates.get(uid)
  expect(storedOldState).toEqual(storedNewState)
})

test('render2 returns empty commands array for empty diffResult', async () => {
  const uid = 456
  const oldState: ActivityBarState = { ...createDefaultState(), focusedIndex: 0, uid }
  const newState: ActivityBarState = { ...createDefaultState(), focusedIndex: 1, uid }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = []

  const commands = await Render2.render2(uid, diffResult)

  expect(commands).toEqual([])
})

test('render2 handles multiple diff types', async () => {
  const uid = 789
  const oldState: ActivityBarState = { ...createDefaultState(), focusedIndex: 0, uid }
  const newState: ActivityBarState = { ...createDefaultState(), focusedIndex: 1, uid }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderItems, DiffType.RenderCss]

  const commands = await Render2.render2(uid, diffResult)

  expect(commands.length).toBeGreaterThan(0)
})

test('render2 updates registry states correctly', async () => {
  const uid = 111
  const oldState: ActivityBarState = { ...createDefaultState(), focusedIndex: 0, uid }
  const newState: ActivityBarState = { ...createDefaultState(), focusedIndex: 1, uid }
  ActivityBarStates.set(uid, oldState, newState)
  const diffResult: readonly number[] = [DiffType.RenderFocusContext]

  await Render2.render2(uid, diffResult)

  const { newState: storedNewState, oldState: storedOldState } = ActivityBarStates.get(uid)
  expect(storedOldState.focusedIndex).toBe(1)
  expect(storedNewState.focusedIndex).toBe(1)
  expect(storedOldState).toEqual(storedNewState)
})

test('render2 queues renderer commands and returns a lightweight commit marker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 17)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const uid = 222
  const oldState: ActivityBarState = { ...createDefaultState(), uid }
  const newState: ActivityBarState = { ...oldState, activityBarItems: [] }
  ActivityBarStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, [DiffType.RenderItems])

  expect(queueCommands).toHaveBeenCalledWith(uid, [['Viewlet.setDom2', uid, []]])
  expect(result).toEqual([['Viewlet.commitPending', uid, 17]])
})

test('render2 leaves focus context management with the renderer worker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 23)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const uid = 333
  const oldState: ActivityBarState = { ...createDefaultState(), uid }
  const newState: ActivityBarState = { ...oldState, focus: FocusId.List }
  ActivityBarStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, [DiffType.RenderFocusContext])

  expect(queueCommands).toHaveBeenCalledWith(uid, [])
  expect(result).toEqual([
    ['Viewlet.setFocusContext', uid, WhenExpression.FocusActivityBar],
    ['Viewlet.commitPending', uid, 23],
  ])
})
