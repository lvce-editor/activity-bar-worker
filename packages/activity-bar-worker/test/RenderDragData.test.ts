import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderDragData } from '../src/parts/RenderDragData/RenderDragData.ts'

test('renders internal drag data for a dragged item', () => {
  const state = {
    ...createDefaultState(),
    draggedItemId: 'Explorer',
    filteredItems: [{ id: 'Explorer', title: 'Explorer' } as any],
  }

  expect(renderDragData(createDefaultState(), state)).toEqual([
    'Viewlet.setDragData',
    0,
    {
      items: [{ data: 'application/x-lvce-editor-activity-bar-item:Explorer', type: 'application/x-lvce-editor-activity-bar-item' }],
      label: 'Explorer',
    },
  ])
})

test('renders internal drag data using the configured type', () => {
  const state = {
    ...createDefaultState(),
    dragAndDropMimeType: 'application/x-custom-activity-bar-item',
    draggedItemId: 'Explorer',
    filteredItems: [{ id: 'Explorer', title: 'Explorer' } as any],
  }

  expect(renderDragData(createDefaultState(), state)).toEqual([
    'Viewlet.setDragData',
    0,
    {
      items: [{ data: 'application/x-custom-activity-bar-item:Explorer', type: 'application/x-custom-activity-bar-item' }],
      label: 'Explorer',
    },
  ])
})

test('does not render drag data without a visible dragged item', () => {
  expect(renderDragData(createDefaultState(), createDefaultState())).toEqual([])
})
