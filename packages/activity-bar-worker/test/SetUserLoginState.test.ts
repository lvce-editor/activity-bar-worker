import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setUserLoginState } from '../src/parts/SetUserLoginState/SetUserLoginState.ts'

test('setUserLoginState updates the user login state and account info', () => {
  const state = createDefaultState()

  const result = setUserLoginState(
    state,
    'logged in',
    {
      provider: 'Google',
      userName: 'test-user',
    },
    'Custom Product',
  )

  expect(result).not.toBe(state)
  expect(result.userLoginState).toBe('logged in')
  expect(result.userName).toBe('test-user')
  expect(result.userLoginProvider).toBe('Google')
})

test('setUserLoginState preserves other activity bar state properties', () => {
  const state = {
    ...createDefaultState(),
    accountEnabled: true,
    height: 120,
    width: 48,
  }

  const result = setUserLoginState(state, 'logging out', undefined, 'Custom Product')

  expect(result).toEqual({
    ...state,
    productName: 'Custom Product',
    userLoginProvider: 'Custom Product',
    userLoginState: 'logging out',
    userName: '',
  })
})

test('setUserLoginState uses product name when provider information is missing or malformed', () => {
  const state = createDefaultState()

  expect(setUserLoginState(state, 'logged in', undefined, 'Custom Product').userLoginProvider).toBe('Custom Product')
  expect(setUserLoginState(state, 'logged in', { provider: 42 }, 'Custom Product').userLoginProvider).toBe('Custom Product')
})
