import { mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getClassName = (isFocused: boolean, marginTop: boolean, isSelected: boolean): string => {
  const classNames: string[] = [ClassNames.ActivityBarItem]
  if (isFocused) {
    classNames.push(ClassNames.FocusOutline)
  }
  if (marginTop) {
    classNames.push(ClassNames.MarginTopAuto)
  }
  if (isSelected) {
    classNames.push(ClassNames.ActivityBarItemSelected)
  }
  return mergeClassNames(...classNames)
}
