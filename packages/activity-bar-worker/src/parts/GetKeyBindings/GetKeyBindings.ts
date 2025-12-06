import { KeyCode } from '@lvce-editor/constants'
import { WhenExpression } from '@lvce-editor/constants'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'ActivityBar.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusActivityBar,
    },
    {
      command: 'ActivityBar.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusActivityBar,
    },
    {
      command: 'ActivityBar.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusActivityBar,
    },
    {
      command: 'ActivityBar.focusFirst',
      key: KeyCode.PageUp,
      when: WhenExpression.FocusActivityBar,
    },
    {
      command: 'ActivityBar.focusLast',
      key: KeyCode.PageDown,
      when: WhenExpression.FocusActivityBar,
    },
    {
      command: 'ActivityBar.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusActivityBar,
    },
    {
      command: 'ActivityBar.selectCurrent',
      key: KeyCode.Space,
      when: WhenExpression.FocusActivityBar,
    },
    {
      command: 'ActivityBar.selectCurrent',
      key: KeyCode.Enter,
      when: WhenExpression.FocusActivityBar,
    },
  ]
}
