import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: import.meta.resolve('../icons/invalid.png'),
  id: 'test.views.customIconInvalidImage',
  title: 'Custom Invalid Image Icon',
})
