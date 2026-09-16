import { expect, test } from '@jest/globals'
import { getActivityBarVirtualDom } from '../src/parts/GetActivityBarVirtualDom/GetActivityBarVirtualDom.ts'

test('renders activity bar drag listeners and draggable items', () => {
  const [root, item] = getActivityBarVirtualDom([{ id: 'Explorer', title: 'Explorer', flags: 9 } as any], true, {
    id: 'Explorer',
    position: 'before',
  })

  expect(root).toMatchObject({ onDragLeave: 6, onDragOver: 5, onDrop: 7 })
  expect(item).toMatchObject({ draggable: true })
})

test('uses the default drag and drop state', () => {
  const [root] = getActivityBarVirtualDom([])

  expect(root.onDragOver).toBe(5)
})
