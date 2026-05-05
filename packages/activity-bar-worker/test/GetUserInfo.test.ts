import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getUserInfo } from '../src/parts/GetUserInfo/GetUserInfo.ts'

test('getUserInfo returns value from Layout.getUserInfo', async () => {
  const userInfo = {
    userState: 'loggedIn',
  }
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getUserInfo'() {
      return userInfo
    },
  })

  const result = await getUserInfo()

  expect(mockRpc.invocations).toEqual([['Layout.getUserInfo']])
  expect(result).toBe(userInfo)
})

test('getUserInfo returns undefined when invoke fails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getUserInfo'() {
      throw new Error('failed to get user info')
    },
  })

  const result = await getUserInfo()

  expect(mockRpc.invocations).toEqual([['Layout.getUserInfo']])
  expect(result).toBeUndefined()
})