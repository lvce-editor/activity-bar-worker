import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: new URL('./invalid.png', import.meta.url).href,
  id: 'test.views.customIconInvalidImage',
  title: 'Custom Invalid Image Icon',
})
