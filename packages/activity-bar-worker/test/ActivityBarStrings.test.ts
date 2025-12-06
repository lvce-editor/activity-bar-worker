import { test, expect } from '@jest/globals'
import * as ActivityBarStrings from '../src/parts/ActivityBarStrings/ActivityBarStrings.ts'

test('ActivityBarStrings.explorer should return correct string', () => {
  expect(ActivityBarStrings.explorer()).toBe('Explorer')
})

test('ActivityBarStrings.search should return correct string', () => {
  expect(ActivityBarStrings.search()).toBe('Search')
})

test('ActivityBarStrings.sourceControl should return correct string', () => {
  expect(ActivityBarStrings.sourceControl()).toBe('Source Control')
})

test('ActivityBarStrings.runAndDebug should return correct string', () => {
  expect(ActivityBarStrings.runAndDebug()).toBe('Run and Debug')
})

test('ActivityBarStrings.extensions should return correct string', () => {
  expect(ActivityBarStrings.extensions()).toBe('Extensions')
})

test('ActivityBarStrings.settings should return correct string', () => {
  expect(ActivityBarStrings.settings()).toBe('Settings')
})

test('ActivityBarStrings.additionalViews should return correct string', () => {
  expect(ActivityBarStrings.additionalViews()).toBe('Additional Views')
})

test('ActivityBarStrings.activityBar should return correct string', () => {
  expect(ActivityBarStrings.activityBar()).toBe('Activity Bar')
})

test('ActivityBarStrings.moveSideBarRight should return correct string', () => {
  expect(ActivityBarStrings.moveSideBarRight()).toBe('Move Side Bar Right')
})

test('ActivityBarStrings.moveSideBarLeft should return correct string', () => {
  expect(ActivityBarStrings.moveSideBarLeft()).toBe('Move Side Bar Left')
})

test('ActivityBarStrings.hideActivityBar should return correct string', () => {
  expect(ActivityBarStrings.hideActivityBar()).toBe('Hide Activity Bar')
})

test('ActivityBarStrings.checkForUpdates should return correct string', () => {
  expect(ActivityBarStrings.checkForUpdates()).toBe('Check For Updates')
})

test('ActivityBarStrings.commandPalette should return correct string', () => {
  expect(ActivityBarStrings.commandPalette()).toBe('Command Palette')
})

test('ActivityBarStrings.keyboardShortcuts should return correct string', () => {
  expect(ActivityBarStrings.keyboardShortcuts()).toBe('Keyboard Shortcuts')
})

test('ActivityBarStrings.colorTheme should return correct string', () => {
  expect(ActivityBarStrings.colorTheme()).toBe('Color Theme')
})
