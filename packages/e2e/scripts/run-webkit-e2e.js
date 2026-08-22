import { runBatchedE2E } from './run-batched-e2e.js'

// These tests exercise editor-shell UI that is not available when WebKit tests
// run in isolated pages. Chromium and Firefox continue to cover them.
const excludedTests = new Set([
  'activity-bar.account-menu-preserves-selection.ts',
  'activity-bar.account.context-menu.logging-in.ts',
  'activity-bar.account.context-menu.logging-out.ts',
  'activity-bar.account.context-menu.signed-in.ts',
  'activity-bar.account.context-menu.ts',
  'activity-bar.additional-views-menu-account-submenu.ts',
  'activity-bar.additional-views-menu-updates-after-toggle.ts',
  'activity-bar.command-select-current-account.ts',
  'activity-bar.context-menu.toggle.explorer.ts',
  'activity-bar.context-menu.toggle.extensions.ts',
  'activity-bar.context-menu.toggle.run-and-debug.ts',
  'activity-bar.context-menu.toggle.search.ts',
  'activity-bar.context-menu.toggle.source-control.ts',
  'activity-bar.hidden-sidebar.opens-clicked-viewlet.explorer.ts',
  'activity-bar.open-color-theme-quickpick.closes-menu.ts',
  'activity-bar.open-color-theme-quickpick.ts',
  'activity-bar.references-not-duplicated.ts',
  'activity-bar.references-shown-after-find-all.ts',
  'activity-bar.references-switch-away-and-back.ts',
  'activity-bar.settings-menu-preserves-selection.ts',
  'activity-bar.settings.context-menu.closes.ts',
  'activity-bar.settings.context-menu.command-palette.closes.ts',
  'activity-bar.settings.context-menu.command-palette.ts',
  'activity-bar.settings.context-menu.ts',
  'activity-bar.settings.keyboard-shortcuts.closes.ts',
  'activity-bar.settings.keyboard-shortcuts.ts',
  'activity-bar.toggle-sidebar.explorer.repeated.ts',
  'activity-bar.toggle-sidebar.explorer.ts',
])

process.exitCode = await runBatchedE2E({
  browser: 'webkit',
  excludedTests,
  forwardedArgs: process.argv.slice(2),
  testBatchSize: 10,
})
