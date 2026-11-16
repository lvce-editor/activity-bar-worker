import { activate, registerView } from '@lvce-editor/api'

const main = async (): Promise<void> => {
  await activate()
  registerView({
    create: () => ({}),
    icon: import.meta.resolve('../icons/invalid.png'),
    id: 'test.views.customIconInvalidImage',
    title: 'Custom Invalid Image Icon',
  })
}

main()
