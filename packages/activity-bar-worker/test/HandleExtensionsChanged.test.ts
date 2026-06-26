import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleExtensionsChanged } from '../src/parts/HandleExtensionsChanged/HandleExtensionsChanged.ts'

test('handleExtensionsChanged includes contributed views from extension management worker', async () => {
  using rendererMockRpc = RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
  })
  using extensionManagementMockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return [
        {
          icon: 'symbol-beaker',
          id: 'sample.views.testing',
          title: 'Testing',
        },
      ]
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    platform: 7,
  }
  const result: ActivityBarState = await handleExtensionsChanged(state)

  expect(rendererMockRpc.invocations).toEqual([['Layout.getBadgeCounts']])
  expect(extensionManagementMockRpc.invocations).toEqual([['Extensions.getViews', '', 7]])
  expect(result.activityBarItems.some((item) => item.id === 'sample.views.testing' && item.title === 'Testing')).toBe(true)
  expect(result).not.toBe(state)
})

test('handleExtensionsChanged preserves selected index', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return []
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    selectedIndex: 1,
  }
  const result: ActivityBarState = await handleExtensionsChanged(state)

  expect(result.selectedIndex).toBe(1)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
})

test('handleExtensionsChanged recomputes filteredItems with badge counts', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {
        Explorer: 7,
        'sample.views.testing': 3,
      }
    },
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return [
        {
          icon: 'symbol-beaker',
          id: 'sample.views.testing',
          title: 'Testing',
        },
      ]
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    height: 1000,
    itemHeight: 50,
    selectedIndex: 0,
  }
  const result: ActivityBarState = await handleExtensionsChanged(state)

  expect(result.filteredItems.find((item) => item.id === 'Explorer')?.badgeText).toBe('7')
  expect(result.filteredItems.find((item) => item.id === 'sample.views.testing')?.badgeText).toBe('3')
})

test('handleExtensionsChanged preserves other state properties', async () => {
  RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
  })
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return []
    },
  })

  const state: ActivityBarState = {
    ...createDefaultState(),
    accountEnabled: false,
    focus: 1,
    focused: true,
    focusedIndex: 2,
    sideBarLocation: 1,
    uid: 123,
    width: 400,
  }
  const result: ActivityBarState = await handleExtensionsChanged(state)

  expect(result.accountEnabled).toBe(false)
  expect(result.focus).toBe(1)
  expect(result.focused).toBe(true)
  expect(result.focusedIndex).toBe(2)
  expect(result.sideBarLocation).toBe(1)
  expect(result.uid).toBe(123)
  expect(result.width).toBe(400)
})

test('handleExtensionsChanged does not query settings or sidebar position', async () => {
  using rendererMockRpc = RendererWorker.registerMockRpc({
    'Layout.getBadgeCounts'() {
      return {}
    },
    'Layout.getSideBarPosition'() {
      throw new Error('should not be called')
    },
    'Preferences.get'() {
      throw new Error('should not be called')
    },
  })
  using extensionManagementMockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getViews'() {
      return []
    },
  })

  const state: ActivityBarState = createDefaultState()
  await handleExtensionsChanged(state)

  expect(rendererMockRpc.invocations).toEqual([['Layout.getBadgeCounts']])
  expect(extensionManagementMockRpc.invocations).toEqual([['Extensions.getViews', '', 0]])
})

test('commandMap includes handleExtensionsChanged', () => {
  expect(commandMap['ActivityBar.handleExtensionsChanged']).toBeDefined()
})
