import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export interface ContributedView {
  readonly icon: string
  readonly id: string
  readonly title: string
  readonly type?: string
}

export const getContributedViews = async (platform: number): Promise<readonly ContributedView[]> => {
  try {
    const views = await ExtensionManagementWorker.invoke('Extensions.getViews', '', platform)
    if (!Array.isArray(views)) {
      return []
    }
    return views.filter((view): view is ContributedView => view?.type !== 'preview')
  } catch {
    return []
  }
}
