import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getAccountEnabled = async (defaultValue: boolean): Promise<boolean> => {
  try {
    const value = await RendererWorker.invoke('Preferences.get', 'activityBar.accountEnabled')
    return typeof value === 'boolean' ? value : defaultValue
  } catch {
    return defaultValue
  }
}
