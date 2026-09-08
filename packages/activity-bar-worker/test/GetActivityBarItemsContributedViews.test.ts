import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getActivityBarItems } from '../src/parts/GetActivityBarItems/GetActivityBarItems.ts'

const customIconClassRegex = /^MaskIconCustomView[a-z0-9]+$/

test('getActivityBarItems includes contributed views', () => {
  const items = getActivityBarItems(createDefaultState(), [
    {
      icon: 'symbol-beaker',
      id: 'sample.views.testing',
      title: 'Testing',
    },
  ])

  expect(items).toEqual(
    expect.arrayContaining([
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: false,
        flags: 9,
        hasPopup: false,
        icon: 'symbol-beaker',
        id: 'sample.views.testing',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Testing',
      },
    ]),
  )
})

test.each([
  [undefined, 0],
  ['preview', 1],
  ['sideBar', 2],
] as const)('getActivityBarItems converts contributed view location %s to %i', (preferredLocation, expectedLocation) => {
  const items = getActivityBarItems(createDefaultState(), [
    {
      icon: 'comment-discussion',
      id: 'chat.views.voice',
      ...(preferredLocation && { preferredLocation }),
      title: 'Voice Chat',
    },
  ])

  expect(items.find((item) => item.id === 'chat.views.voice')).toEqual({
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 9,
    hasPopup: false,
    icon: 'comment-discussion',
    id: 'chat.views.voice',
    keyShortcuts: '',
    preferredLocation: expectedLocation,
    title: 'Voice Chat',
  })
})

test('getActivityBarItems stores custom icon metadata for url-like contributed view icon', () => {
  const icon = 'https://example.com/icon.svg'
  const expectedItem = expect.objectContaining({
    customIconClass: expect.stringMatching(customIconClassRegex),
    customIconUrl: icon,
    icon,
    id: 'sample.views.customIcon',
    title: 'Custom Icon',
  })
  const items = getActivityBarItems(createDefaultState(), [
    {
      icon,
      id: 'sample.views.customIcon',
      title: 'Custom Icon',
    },
  ])

  expect(items).toEqual(expect.arrayContaining([expectedItem]))
})

test('getActivityBarItems stores custom icon metadata for lvce contributed view icon', () => {
  const icon = 'lvce://-/remote/home/test/.local/share/lvce/extensions/hetzner/hetzner.svg'
  const items = getActivityBarItems(createDefaultState(), [
    {
      icon,
      id: 'hetzner.views.cloud',
      title: 'Hetzner Cloud',
    },
  ])
  const item = items.find((item) => item.id === 'hetzner.views.cloud')

  expect(item).toEqual({
    badgeIcon: '',
    badgeText: '',
    customIconClass: expect.stringMatching(customIconClassRegex),
    customIconUrl: icon,
    enabled: false,
    flags: 9,
    hasPopup: false,
    icon,
    id: 'hetzner.views.cloud',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Hetzner Cloud',
  })
  expect(item?.customIconClass).not.toContain(icon)
})

test('getActivityBarItems preserves builtin symbolic contributed view icon behavior', () => {
  const items = getActivityBarItems(createDefaultState(), [
    {
      icon: 'symbol-beaker',
      id: 'sample.views.symbol',
      title: 'Symbol',
    },
  ])

  const item = items.find((item) => item.id === 'sample.views.symbol')

  expect(item?.customIconClass).toBe('')
  expect(item?.customIconUrl).toBe('')
  expect(item?.icon).toBe('symbol-beaker')
})

test('getActivityBarItems uses fallback values for missing contributed view metadata', () => {
  const items = getActivityBarItems(createDefaultState(), [
    {
      icon: '',
      id: 'sample.views.fallback',
      title: '',
    },
  ])

  const item = items.find((item) => item.id === 'sample.views.fallback')

  expect(item).toEqual({
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: 9,
    hasPopup: false,
    icon: 'Extensions',
    id: 'sample.views.fallback',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'sample.views.fallback',
  })
})
