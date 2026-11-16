import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: import.meta.resolve('../icons/icon.png'),
  id: 'test.views.customIconPng',
  title: 'Custom PNG Icon',
})
