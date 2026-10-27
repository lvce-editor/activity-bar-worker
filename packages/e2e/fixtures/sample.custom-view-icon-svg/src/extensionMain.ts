import { activate, registerView } from '@lvce-editor/api'

await activate()
registerView({
  create: () => ({}),
  icon: new URL('./icon.svg', import.meta.url).href,
  id: 'test.views.customIconSvg',
  title: 'Custom SVG Icon',
})
