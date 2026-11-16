import { activate, registerView } from '@lvce-editor/api'

const main = async (): Promise<void> => {
  await activate()

  for (let index = 0; index < 500; index++) {
    registerView({
      create: () => ({}),
      icon: 'symbol-beaker',
      id: `test.activityBar.manyViews.${index}`,
      title: `Stress View ${index}`,
    })
  }
}

main()
