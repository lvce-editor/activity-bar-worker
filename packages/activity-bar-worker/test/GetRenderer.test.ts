import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import { getRenderer } from '../src/parts/GetRenderer/GetRenderer.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import * as RenderFocusContext from '../src/parts/RenderFocusContext/RenderFocusContext.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('getRenderer returns renderItems for RenderItems diff type', () => {
  const renderer = getRenderer(DiffType.RenderItems)

  expect(renderer).toBe(RenderItems.renderItems)
})

test('getRenderer returns renderFocusContext for RenderFocusContext diff type', () => {
  const renderer = getRenderer(DiffType.RenderFocusContext)

  expect(renderer).toBe(RenderFocusContext.renderFocusContext)
})

test('getRenderer returns renderFocusContext for RenderFocus diff type', () => {
  const renderer = getRenderer(DiffType.RenderFocus)

  expect(renderer).toBe(RenderFocusContext.renderFocusContext)
})

test('getRenderer returns renderCss for RenderCss diff type', () => {
  const renderer = getRenderer(DiffType.RenderCss)

  expect(renderer).toBe(renderCss)
})

test('getRenderer throws error for unknown diff type', () => {
  expect(() => getRenderer(999)).toThrow('unknown renderer')
})

test('getRenderer throws error for negative diff type', () => {
  expect(() => getRenderer(-1)).toThrow('unknown renderer')
})

test('getRenderer throws error for zero diff type', () => {
  expect(() => getRenderer(0)).toThrow('unknown renderer')
})
