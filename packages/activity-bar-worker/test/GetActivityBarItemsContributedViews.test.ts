import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getActivityBarItems } from '../src/parts/GetActivityBarItems/GetActivityBarItems.ts'

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
        flags: 9,
        icon: 'symbol-beaker',
        id: 'sample.views.testing',
        keyShortcuts: '',
        title: 'Testing',
      },
    ]),
  )
})

test('getActivityBarItems stores custom icon metadata for url-like contributed view icon', () => {
  const icon = 'https://example.com/icon.svg'
  const expectedItem = expect.objectContaining({
    customIconClass: expect.stringMatching(/^MaskIconCustomView[a-z0-9]+$/),
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
    customIconClass: expect.stringMatching(/^MaskIconCustomView[a-z0-9]+$/),
    customIconUrl: icon,
    flags: 9,
    icon,
    id: 'hetzner.views.cloud',
    keyShortcuts: '',
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

  expect(item?.customIconClass).toBeUndefined()
  expect(item?.customIconUrl).toBeUndefined()
  expect(item?.icon).toBe('symbol-beaker')
})
