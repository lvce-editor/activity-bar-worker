import { activate, registerView } from '@lvce-editor/api'

const main = async (): Promise<void> => {
  await activate()
  registerView({
    create: () => ({}),
    icon: import.meta.resolve('../icons/icon.png'),
    id: 'test.views.customIconPng',
    title: 'Custom PNG Icon',
  })
}

main()
