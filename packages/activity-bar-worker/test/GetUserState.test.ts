import { expect, test } from '@jest/globals'
import { getUserState } from '../src/parts/GetUserState/GetUserState.ts'

test('getUserState returns userState from object', () => {
  expect(getUserState({ userState: 'loggedIn' })).toBe('loggedIn')
})

test('getUserState returns undefined for non-object input', () => {
  expect(getUserState(undefined)).toBeUndefined()
  expect(getUserState(null)).toBeUndefined()
  expect(getUserState('test')).toBeUndefined()
})

test('getUserState returns undefined when property is missing', () => {
  expect(getUserState({})).toBeUndefined()
})
