import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: import.meta.resolve('./missing.png'),
  id: 'test.views.customIconMissingImage',
  title: 'Custom Missing Image Icon',
})
