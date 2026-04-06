import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setUserLoginState } from '../src/parts/SetUserLoginState/SetUserLoginState.ts'

test('setUserLoginState updates the user login state', () => {
  const state = createDefaultState()

  const result = setUserLoginState(state, 'logged in')

  expect(result).not.toBe(state)
  expect(result.userLoginState).toBe('logged in')
})

test('setUserLoginState preserves other activity bar state properties', () => {
  const state = {
    ...createDefaultState(),
    accountEnabled: true,
    height: 120,
    width: 48,
  }

  const result = setUserLoginState(state, 'logging out')

  expect(result).toEqual({
    ...state,
    userLoginState: 'logging out',
  })
})
