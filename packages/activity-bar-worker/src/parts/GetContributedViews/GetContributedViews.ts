import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export interface ContributedView {
  readonly icon: string
  readonly id: string
  readonly title: string
}

export const getContributedViews = async (platform: number): Promise<readonly ContributedView[]> => {
  try {
    return await ExtensionManagementWorker.invoke('Extensions.getViews', '', platform)
  } catch {
    return []
  }
}
