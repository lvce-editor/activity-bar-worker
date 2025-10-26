import { KeyCode } from '@lvce-editor/constants'
import { WhenExpression } from '@lvce-editor/constants'
import { KeyBinding } from '../KeyBinding/KeyBinding.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      key: KeyCode.DownArrow,
      command: 'ActivityBar.focusNext',
      when: WhenExpression.FocusActivityBar,
    },
    {
      key: KeyCode.UpArrow,
      command: 'ActivityBar.focusPrevious',
      when: WhenExpression.FocusActivityBar,
    },
    {
      key: KeyCode.Home,
      command: 'ActivityBar.focusFirst',
      when: WhenExpression.FocusActivityBar,
    },
    {
      key: KeyCode.PageUp,
      command: 'ActivityBar.focusFirst',
      when: WhenExpression.FocusActivityBar,
    },
    {
      key: KeyCode.PageDown,
      command: 'ActivityBar.focusLast',
      when: WhenExpression.FocusActivityBar,
    },
    {
      key: KeyCode.End,
      command: 'ActivityBar.focusLast',
      when: WhenExpression.FocusActivityBar,
    },
    {
      key: KeyCode.Space,
      command: 'ActivityBar.selectCurrent',
      when: WhenExpression.FocusActivityBar,
    },
    {
      key: KeyCode.Enter,
      command: 'ActivityBar.selectCurrent',
      when: WhenExpression.FocusActivityBar,
    },
  ]
}
