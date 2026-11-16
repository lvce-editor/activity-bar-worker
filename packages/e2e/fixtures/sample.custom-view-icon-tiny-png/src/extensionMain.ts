import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: new URL('../icons/icon.png', import.meta.url).href,
  id: 'test.views.customIconTinyPng',
  title: 'Custom Tiny PNG Icon',
})
