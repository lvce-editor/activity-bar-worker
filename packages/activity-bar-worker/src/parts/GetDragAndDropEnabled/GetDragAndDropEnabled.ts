import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getDragAndDropEnabled = async (defaultValue: boolean): Promise<boolean> => {
  try {
    const value = await RendererWorker.invoke('Preferences.get', 'activityBar.dragAndDropEnabled')
    return typeof value === 'boolean' ? value : defaultValue
  } catch {
    return defaultValue
  }
}
