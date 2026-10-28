import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: new URL('./missing.png', import.meta.url).href,
  id: 'test.views.customIconMissingImage',
  title: 'Custom Missing Image Icon',
})
