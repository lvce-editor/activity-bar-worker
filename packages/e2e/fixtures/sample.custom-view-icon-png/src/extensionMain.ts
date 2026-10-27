import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: new URL('./icon.png', import.meta.url).href,
  id: 'test.views.customIconPng',
  title: 'Custom PNG Icon',
})
