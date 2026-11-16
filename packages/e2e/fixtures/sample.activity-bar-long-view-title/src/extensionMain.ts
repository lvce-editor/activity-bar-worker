import { activate, registerView } from '@lvce-editor/api'

const title = 'Activity Bar Long Title '.repeat(500)

const main = async (): Promise<void> => {
  await activate()
  registerView({
    create: () => ({}),
    id: 'test.activityBar.longTitle',
    title,
  })
}

main()
