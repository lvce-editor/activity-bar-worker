import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: import.meta.resolve('../icons/icon.png'),
  id: 'test.views.customIconTinyPng',
  title: 'Custom Tiny PNG Icon',
})
