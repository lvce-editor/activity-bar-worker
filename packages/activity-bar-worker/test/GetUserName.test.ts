import { expect, test } from '@jest/globals'
import { getUserName } from '../src/parts/GetUserName/GetUserName.ts'

test('getUserName returns an empty string for a non-string user name', () => {
  expect(getUserName({ userName: 42 })).toBe('')
})
