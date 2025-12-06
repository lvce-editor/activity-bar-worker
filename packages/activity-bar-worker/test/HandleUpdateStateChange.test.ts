import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleUpdateStateChange } from '../src/parts/HandleUpdateStateChange/HandleUpdateStateChange.ts'
import * as UpdateState from '../src/parts/UpdateState/UpdateState.ts'

test('handleUpdateStateChange should set badgeIcon to clock and Progress flag when CheckingForUpdate', async () => {
  const settingsItem: ActivityBarItem = {
    flags: 0,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem],
  }
  const config = {
    progress: 0,
    state: UpdateState.CheckingForUpdate,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0].badgeIcon).toBe('clock')
  expect(result.filteredItems[0].flags & ActivityBarItemFlags.Progress).toBe(ActivityBarItemFlags.Progress)
  expect(result.updateProgress).toBe(0)
  expect(result.updateState).toBe(UpdateState.CheckingForUpdate)
})

test('handleUpdateStateChange should set badgeIcon to empty and badgeText to 1 when WaitingForRestart', async () => {
  const settingsItem: ActivityBarItem = {
    flags: 0,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem],
  }
  const config = {
    progress: 0,
    state: UpdateState.WaitingForRestart,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0].badgeIcon).toBe('')
  expect(result.filteredItems[0].badgeText).toBe('1')
  expect(result.updateProgress).toBe(0)
  expect(result.updateState).toBe(UpdateState.WaitingForRestart)
})

test('handleUpdateStateChange should not modify Settings item for other states', async () => {
  const settingsItem: ActivityBarItem = {
    flags: 0,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem],
  }
  const config = {
    progress: 50,
    state: UpdateState.DownloadingUpdate,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0]).toEqual(settingsItem)
  expect(result.updateProgress).toBe(50)
  expect(result.updateState).toBe(UpdateState.DownloadingUpdate)
})

test('handleUpdateStateChange should update updateProgress and updateState', async () => {
  const settingsItem: ActivityBarItem = {
    flags: 0,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem],
    updateProgress: 0,
    updateState: UpdateState.None,
  }
  const config = {
    progress: 75,
    state: UpdateState.DownloadedUpdate,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.updateProgress).toBe(75)
  expect(result.updateState).toBe(UpdateState.DownloadedUpdate)
})

test('handleUpdateStateChange should preserve other state properties', async () => {
  const settingsItem: ActivityBarItem = {
    flags: 0,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'viewlet1',
    filteredItems: [settingsItem],
    focus: 5,
    height: 200,
    uid: 123,
    width: 100,
  }
  const config = {
    progress: 25,
    state: UpdateState.CheckingForUpdate,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.currentViewletId).toBe('viewlet1')
  expect(result.focus).toBe(5)
  expect(result.uid).toBe(123)
  expect(result.width).toBe(100)
  expect(result.height).toBe(200)
})

test('handleUpdateStateChange should only modify Settings item, not other items', async () => {
  const settingsItem: ActivityBarItem = {
    flags: 0,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const otherItem: ActivityBarItem = {
    flags: 0,
    icon: 'explorer',
    id: 'Explorer',
    keyShortcuts: '',
    title: 'Explorer',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem, otherItem],
  }
  const config = {
    progress: 0,
    state: UpdateState.CheckingForUpdate,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0].badgeIcon).toBe('clock')
  expect(result.filteredItems[0].flags & ActivityBarItemFlags.Progress).toBe(ActivityBarItemFlags.Progress)
  expect(result.filteredItems[1]).toEqual(otherItem)
})

test('handleUpdateStateChange should handle Settings item with existing flags', async () => {
  const settingsItem: ActivityBarItem = {
    flags: ActivityBarItemFlags.Selected,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem],
  }
  const config = {
    progress: 0,
    state: UpdateState.CheckingForUpdate,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0].badgeIcon).toBe('clock')
  expect(result.filteredItems[0].flags & ActivityBarItemFlags.Progress).toBe(ActivityBarItemFlags.Progress)
  expect(result.filteredItems[0].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
})

test('handleUpdateStateChange should handle state without Settings item', async () => {
  const otherItem: ActivityBarItem = {
    flags: 0,
    icon: 'explorer',
    id: 'Explorer',
    keyShortcuts: '',
    title: 'Explorer',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [otherItem],
  }
  const config = {
    progress: 50,
    state: UpdateState.CheckingForUpdate,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0]).toEqual(otherItem)
  expect(result.updateProgress).toBe(50)
  expect(result.updateState).toBe(UpdateState.CheckingForUpdate)
})

test('handleUpdateStateChange should handle WaitingForRestart with existing badgeIcon', async () => {
  const settingsItem: ActivityBarItem = {
    badgeIcon: 'clock',
    flags: ActivityBarItemFlags.Progress,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem],
  }
  const config = {
    progress: 0,
    state: UpdateState.WaitingForRestart,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0].badgeIcon).toBe('')
  expect(result.filteredItems[0].badgeText).toBe('1')
})

test('handleUpdateStateChange should handle InstallingUpdated state', async () => {
  const settingsItem: ActivityBarItem = {
    flags: 0,
    icon: 'settings',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [settingsItem],
  }
  const config = {
    progress: 90,
    state: UpdateState.InstallingUpdated,
  }

  const result = await handleUpdateStateChange(state, config)

  expect(result.filteredItems[0]).toEqual(settingsItem)
  expect(result.updateProgress).toBe(90)
  expect(result.updateState).toBe(UpdateState.InstallingUpdated)
})
