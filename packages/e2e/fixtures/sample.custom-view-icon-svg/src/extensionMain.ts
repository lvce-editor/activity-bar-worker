import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: import.meta.resolve('../icons/icon.svg'),
  id: 'test.views.customIconSvg',
  title: 'Custom SVG Icon',
})
