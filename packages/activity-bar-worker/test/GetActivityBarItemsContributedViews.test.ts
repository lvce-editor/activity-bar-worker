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
