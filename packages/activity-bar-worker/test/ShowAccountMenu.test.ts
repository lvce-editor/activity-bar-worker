import { expect, test } from '@jest/globals'
import { SideBarLocationType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { ACCOUNT_MENU_ID, showAccountMenu } from '../src/parts/HandleClickAccount/HandleClickAccount.ts'

test('showAccountMenu opens the account menu without refreshing auth state', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state = {
    ...createDefaultState(),
    sideBarLocation: SideBarLocationType.Right,
    uid: 7,
  }

  const result = await showAccountMenu(state, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 7, ACCOUNT_MENU_ID, 100, 200, { menuId: ACCOUNT_MENU_ID, openSubMenuToLeft: true }]])
})
