import { activate, registerView } from '@lvce-editor/api'

const main = async (): Promise<void> => {
  await activate()
  registerView({
    create: () => ({}),
    icon: import.meta.resolve('./missing.png'),
    id: 'test.views.customIconMissingImage',
    title: 'Custom Missing Image Icon',
  })
}

main()
