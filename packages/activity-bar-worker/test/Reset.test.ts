import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'
import { reset } from '../src/parts/Reset/Reset.ts'

test('default-to-default reset produces no renderer command', async () => {
  const uid = 1
  const loadedState = await loadContent({ ...createDefaultState(), focusedIndex: -1, uid })
  ActivityBarStates.set(uid, loadedState, loadedState)

  await commandMap['ActivityBar.reset'](uid)
  const diffResult = diff2(uid)
  const commands = render2(uid, diffResult)

  expect(commands).toEqual([])
})

test('dirty focus and selection reset with incremental patches', async () => {
  const uid = 2
  const loadedState = await loadContent({ ...createDefaultState(), uid })
  const dirtyItems = loadedState.activityBarItems.map((item, index) => ({
    ...item,
    flags: index === 1 ? item.flags | ActivityBarItemFlags.Selected : item.flags & ~ActivityBarItemFlags.Selected,
  }))
  const dirtyState: ActivityBarState = {
    ...loadedState,
    activityBarItems: dirtyItems,
    filteredItems: dirtyItems,
    focus: 1,
    focused: true,
    focusedIndex: 1,
    selectedIndex: 1,
  }
  ActivityBarStates.set(uid, dirtyState, dirtyState)

  await commandMap['ActivityBar.reset'](uid)
  const commands = render2(uid, diff2(uid))

  expect(commands.length).toBeGreaterThan(0)
  expect(commands.flat()).toContain('Viewlet.setPatches')
  expect(commands.flat()).not.toContain('Viewlet.setDom2')
  const { newState } = ActivityBarStates.get(uid)
  expect(newState.focus).toBe(0)
  expect(newState.focused).toBe(false)
  expect(newState.focusedIndex).toBe(-1)
  expect(newState.selectedIndex).toBe(0)
})

test.each([
  [false, -1],
  [true, 0],
])('reset reloads sidebar visibility %s', async (sideBarVisible, selectedIndex) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getSideBarVisible'() {
      return sideBarVisible
    },
  })

  const result = await reset(createDefaultState())

  expect(mockRpc.invocations).toContainEqual(['Layout.getSideBarVisible'])
  expect(result.sideBarVisible).toBe(sideBarVisible)
  expect(result.selectedIndex).toBe(selectedIndex)
})

test('reset preserves bounds, platform, and authentication state', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    accountEnabled: true,
    height: 640,
    itemHeight: 52,
    platform: 2,
    uid: 99,
    userLoginProvider: 'GitHub',
    userLoginState: 'logged in',
    userName: 'test-user',
    width: 64,
    x: 12,
    y: 34,
  }

  const result = await reset(state)

  expect(result).toMatchObject({
    height: 640,
    itemHeight: 52,
    platform: 2,
    uid: 99,
    userLoginProvider: 'GitHub',
    userLoginState: 'logged in',
    userName: 'test-user',
    width: 64,
    x: 12,
    y: 34,
  })
})

test('reset preserves disabled account configuration', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get'() {
      return undefined
    },
  })
  const state = {
    ...createDefaultState(),
    accountEnabled: false,
  }

  const result = await reset(state)

  expect(mockRpc.invocations).toContainEqual(['Preferences.get', 'activityBar.accountEnabled'])
  expect(result.accountEnabled).toBe(false)
  expect(result.activityBarItems.find((item) => item.id === 'Account')).toBeUndefined()
})

test('reset reloads contributed views and retains overflow behavior', async () => {
  using extensionManagementMockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return [
        {
          icon: 'Beaker',
          id: 'Custom View',
          title: 'Custom View',
        },
      ]
    },
  })
  const state = {
    ...createDefaultState(),
    height: 192,
    platform: 3,
  }

  const result = await reset(state)

  expect(extensionManagementMockRpc.invocations).toContainEqual(['Extensions.getViews', '', 3])
  expect(result.activityBarItems.find((item) => item.id === 'Custom View')).toBeDefined()
  expect(result.filteredItems.find((item) => item.id === 'Additional Views')).toBeDefined()
})

test('reset reloads badges and clears update presentation', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        'Source Control': 5,
      }
    },
  })
  const state: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: [
      {
        badgeIcon: 'clock',
        badgeText: '1',
        flags: ActivityBarItemFlags.Button | ActivityBarItemFlags.Progress,
        icon: 'SettingsGear',
        id: 'Settings',
        keyShortcuts: '',
        title: 'Settings',
      },
    ],
    updateProgress: 50,
    updateState: 1,
  }

  const result = await reset(state)

  expect(mockRpc.invocations).toContainEqual(['Layout.getBadgeCounts'])
  expect(result.updateProgress).toBe(0)
  expect(result.updateState).toBe('')
  expect(result.activityBarItems.find((item) => item.id === 'Source Control')?.badgeText).toBe('5')
  const settings = result.activityBarItems.find((item) => item.id === 'Settings')
  expect(settings?.badgeIcon).toBeUndefined()
  expect(settings?.badgeText).toBe('')
  expect(settings!.flags & ActivityBarItemFlags.Progress).toBeFalsy()
})
