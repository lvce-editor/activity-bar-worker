import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSettingsChanged } from '../src/parts/HandleSettingsChanged/HandleSettingsChanged.ts'

test('handleSettingsChanged updates activityBarItems and sidebar location', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 5,
        item2: 0,
        item3: 12,
      }
    },
    'SideBar.getSideBarPosition'() {
      return 1
    },
    'ViewletRegistry.getActivityBarItems'() {
      return [
        { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
        { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
        { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
      ]
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    height: 300,
    itemHeight: 50,
    selectedIndex: 1,
  }

  const result: ActivityBarState = await handleSettingsChanged(state)

  expect(result.activityBarItems.length).toBe(3)
  expect(result.activityBarItems[0].id).toBe('item1')
  expect(result.activityBarItems[1].id).toBe('item2')
  expect(result.activityBarItems[2].id).toBe('item3')
  expect(result.sideBarLocation).toBe(1)
  expect(result).not.toBe(state)
})

test('handleSettingsChanged preserves selected index', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 0,
        item2: 0,
      }
    },
    'SideBar.getSideBarPosition'() {
      return 0
    },
    'ViewletRegistry.getActivityBarItems'() {
      return [
        { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
        { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
      ]
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    height: 300,
    itemHeight: 50,
    selectedIndex: 1,
  }

  const result: ActivityBarState = await handleSettingsChanged(state)

  expect(result.activityBarItems[1].flags & 1).toBe(1)
})

test('handleSettingsChanged updates filteredItems with badge counts', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 7,
        item2: 3,
      }
    },
    'SideBar.getSideBarPosition'() {
      return 0
    },
    'ViewletRegistry.getActivityBarItems'() {
      return [
        { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
        { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
      ]
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    height: 300,
    itemHeight: 50,
    selectedIndex: 0,
  }

  const result: ActivityBarState = await handleSettingsChanged(state)

  expect(result.filteredItems[0].badgeText).toBe('7')
  expect(result.filteredItems[1].badgeText).toBe('3')
})

test('handleSettingsChanged preserves other state properties', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        item1: 0,
      }
    },
    'SideBar.getSideBarPosition'() {
      return 0
    },
    'ViewletRegistry.getActivityBarItems'() {
      return [
        { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
      ]
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    accountEnabled: true,
    focus: 1,
    focused: true,
    focusedIndex: 2,
    height: 300,
    itemHeight: 50,
    selectedIndex: 0,
    width: 400,
  }

  const result: ActivityBarState = await handleSettingsChanged(state)

  expect(result.focus).toBe(1)
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(2)
  expect(result.width).toBe(400)
  expect(result.accountEnabled).toBe(true)
})
