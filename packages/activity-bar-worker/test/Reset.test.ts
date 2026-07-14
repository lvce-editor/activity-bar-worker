import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { reset } from '../src/parts/Reset/Reset.ts'

test('reset restores the initial state with the current layout bounds', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getActiveSideBarView'() {
      return 'Explorer'
    },
    'Layout.getSideBarPosition'() {
      return 2
    },
    'Layout.getSideBarVisible'() {
      return true
    },
    'Preferences.get'() {
      return undefined
    },
  })
  const state = {
    ...createDefaultState(),
    accountEnabled: false,
    activityBarItems: [],
    focused: true,
    height: 100,
    platform: 1,
    uid: 42,
    updateProgress: 50,
    updateState: 1,
  }

  const result = await reset(state, {
    height: 720,
    width: 48,
    x: 976,
    y: 30,
  })

  expect(result).toMatchObject({
    accountEnabled: true,
    currentViewletId: 'Explorer',
    focused: false,
    height: 720,
    platform: 1,
    selectedIndex: 0,
    sideBarLocation: 2,
    sideBarVisible: true,
    uid: 42,
    updateProgress: 0,
    updateState: '',
    width: 48,
    x: 976,
    y: 30,
  })
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBeTruthy()
  expect(result.activityBarItems.every((item) => item.flags & ActivityBarItemFlags.Enabled)).toBeTruthy()
  expect(mockRpc.invocations).toEqual(
    expect.arrayContaining([
      ['Layout.getActiveSideBarView'],
      ['Layout.getSideBarPosition'],
      ['Layout.getSideBarVisible'],
      ['Preferences.get', 'activityBar.accountEnabled'],
    ]),
  )
})
