import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { DragAndDropWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import * as ActivityBarDragData from '../src/parts/ActivityBarDragData/ActivityBarDragData.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleDrop } from '../src/parts/HandleDrop/HandleDrop.ts'

const run = async (state: ActivityBarState, dropId = 1): Promise<ActivityBarState> => {
  ActivityBarStates.set(state.uid, state, state)
  const command = ActivityBarStates.wrapAsyncCommand(handleDrop)
  await command(state.uid, dropId)
  return ActivityBarStates.get(state.uid).newState
}

const item = (id: string, flags = ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled): any => ({ id, flags })

test('clears an incomplete drag', async () => {
  const state = { ...createDefaultState(), draggedItemId: 'Explorer' }

  await expect(run(state)).resolves.toEqual(createDefaultState())
})

test('ignores an unrelated drop', async () => {
  using mockRpc = DragAndDropWorker.registerMockRpc({
    'DragAndDrop.getDroppedItemsByDropId'() {
      return { strings: ['file:///tmp/test.txt'] }
    },
  })
  const state = {
    ...createDefaultState(),
    activityBarItems: [item('Explorer'), item('Search')],
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    dropIndicator: { id: 'Search', position: 'after' as const },
  }

  await expect(run(state)).resolves.toMatchObject({ activityBarItems: state.activityBarItems })
  expect(mockRpc.invocations).toEqual([['DragAndDrop.getDroppedItemsByDropId', 1, false]])
})

test('ignores a drop with no retained strings', async () => {
  using mockRpc = DragAndDropWorker.registerMockRpc({
    'DragAndDrop.getDroppedItemsByDropId'() {
      return {}
    },
  })
  const items = [item('Explorer'), item('Search')]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    dropIndicator: { id: 'Search', position: 'after' as const },
  }

  await expect(run(state)).resolves.toMatchObject({ activityBarItems: items })
  expect(mockRpc.invocations).toHaveLength(1)
})

test('reorders an activity bar item and clears transient state', async () => {
  using mockRpc = DragAndDropWorker.registerMockRpc({
    'DragAndDrop.getDroppedItemsByDropId'() {
      return { strings: [ActivityBarDragData.getData('Explorer')] }
    },
  })
  const items = [
    item('Explorer', ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected),
    item('Search'),
    item('Source Control'),
  ]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    dropIndicator: { id: 'Source Control', position: 'after' as const },
    filteredItems: items,
    focused: true,
    focusedIndex: 0,
    platform: PlatformType.Electron,
  }

  const result = await run(state)

  expect(result.activityBarItems.map((entry) => entry.id)).toEqual(['Search', 'Source Control', 'Explorer'])
  expect(result.draggedItemId).toBeUndefined()
  expect(result.dropIndicator).toBeUndefined()
  expect(result.selectedIndex).toBe(2)
  expect(result.focusedIndex).toBe(2)
  expect(mockRpc.invocations).toEqual([['DragAndDrop.getDroppedItemsByDropId', 1, true]])
})

test('keeps selection and focus indexes when they have no matching item', async () => {
  using mockRpc = DragAndDropWorker.registerMockRpc({
    'DragAndDrop.getDroppedItemsByDropId'() {
      return { strings: [ActivityBarDragData.getData('Explorer')] }
    },
  })
  const items = [item('Explorer'), item('Search'), item('Source Control')]
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    dragAndDropEnabled: true,
    draggedItemId: 'Explorer',
    dropIndicator: { id: 'Source Control', position: 'after' as const },
    filteredItems: items,
    focusedIndex: -1,
    selectedIndex: -1,
  }

  const result = await run(state)

  expect(result.selectedIndex).toBe(-1)
  expect(result.focusedIndex).toBe(-1)
  expect(mockRpc.invocations).toHaveLength(1)
})
