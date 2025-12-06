import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  About: 'About',
  CheckForUpdates: 'Check For Updates',
  ColorTheme: 'Color Theme',
  CommandPalette: 'Command Palette',
  KeyboardShortcuts: 'Keyboard Shortcuts',
  OpenProcessExplorer: 'Open Process Explorer',
  Settings: 'Settings',
  ToggleDeveloperTools: 'Toggle Developer Tools',
}

export const checkForUpdates = (): string => {
  return I18nString.i18nString(UiStrings.CheckForUpdates)
}

export const commandPalette = (): string => {
  return I18nString.i18nString(UiStrings.CommandPalette)
}

export const settings = (): string => {
  return I18nString.i18nString(UiStrings.Settings)
}

export const keyboardShortcuts = (): string => {
  return I18nString.i18nString(UiStrings.KeyboardShortcuts)
}

export const colorTheme = (): string => {
  return I18nString.i18nString(UiStrings.ColorTheme)
}
