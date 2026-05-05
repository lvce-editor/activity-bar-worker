import { expect, test } from '@jest/globals'
import { toUserLoginState } from '../src/parts/ToUserLoginState/ToUserLoginState.ts'

test('toUserLoginState maps loggedIn state', () => {
  expect(toUserLoginState('loggedIn')).toBe('logged in')
})

test('toUserLoginState maps loggingIn state', () => {
  expect(toUserLoginState('loggingIn')).toBe('logging in')
})

test('toUserLoginState maps loggingOut state', () => {
  expect(toUserLoginState('loggingOut')).toBe('logging out')
})

test('toUserLoginState falls back to logged out', () => {
  expect(toUserLoginState(undefined)).toBe('logged out')
  expect(toUserLoginState('other')).toBe('logged out')
})