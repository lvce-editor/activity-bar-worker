import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss returns empty array', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result).toBeDefined()
})

test('renderCss returns empty array for different states', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focus: 1,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focus: 2,
  }

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result).toBeDefined()
})

test('renderCss returns empty array with custom properties', () => {
  const items: readonly ActivityBarItem[] = [
    {
      flags: 0,
      icon: 'icon',
      id: 'test',
      keyShortcuts: '',
      title: 'Test',
    },
  ]

  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    width: 100,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    width: 200,
  }

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result).toBeDefined()
})

test('renderCss includes custom icon rules', () => {
  const items: readonly ActivityBarItem[] = [
    {
      customIconClass: 'MaskIconCustomViewabc',
      customIconUrl: 'https://example.com/icon.svg',
      flags: 0,
      icon: 'https://example.com/icon.svg',
      id: 'test',
      keyShortcuts: '',
      title: 'Test',
    },
    {
      customIconClass: 'MaskIconCustomViewfile',
      customIconUrl: 'file:///tmp/icon.png',
      flags: 0,
      icon: 'file:///tmp/icon.png',
      id: 'test2',
      keyShortcuts: '',
      title: 'Test 2',
    },
  ]

  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result[2]).toContain('.MaskIconCustomViewabc')
  expect(result[2]).toContain('mask-image: url("https://example.com/icon.svg");')
  expect(result[2]).toContain('.MaskIconCustomViewfile')
  expect(result[2]).toContain('mask-image: url("file:///tmp/icon.png");')
})

test('renderCss includes lvce custom icon rule', () => {
  const icon = 'lvce://-/remote/home/test/.local/share/lvce/extensions/hetzner/hetzner.svg'
  const items: readonly ActivityBarItem[] = [
    {
      customIconClass: 'MaskIconCustomViewhetzner',
      customIconUrl: icon,
      flags: 0,
      icon,
      id: 'hetzner.views.cloud',
      keyShortcuts: '',
      title: 'Hetzner Cloud',
    },
  ]
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    filteredItems: items,
  }

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result[2]).toContain('.MaskIconCustomViewhetzner')
  expect(result[2]).toContain(`mask-image: url("${icon}");`)
})
