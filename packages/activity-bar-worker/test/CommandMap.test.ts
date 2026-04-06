import { expect, test } from '@jest/globals'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'

test('commandMap registers account sign-in and sign-out commands', () => {
  expect(commandMap['ActivityBar.handleClickSignIn']).toBeDefined()
  expect(commandMap['ActivityBar.handleClickSignOut']).toBeDefined()
})
