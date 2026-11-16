import { activate, registerView } from '@lvce-editor/api'

const main = async (): Promise<void> => {
  await activate()
  registerView({
    create: () => ({}),
    icon: import.meta.resolve('../icons/icon.svg'),
    id: 'test.views.customIconSvg',
    title: 'Custom SVG Icon',
  })
}

main()
