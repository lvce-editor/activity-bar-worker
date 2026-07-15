import type { ContributedView } from '../GetContributedViews/GetContributedViews.ts'
import { getAccountEnabled } from '../GetAccountEnabled/GetAccountEnabled.ts'
import { getActiveView } from '../GetActiveView/GetActiveView.ts'
import { getContributedViews } from '../GetContributedViews/GetContributedViews.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'

interface Preferences {
  readonly accountEnabled: boolean
  readonly activeView: string
  readonly contributedViews: readonly ContributedView[]
  readonly sidebarLocation: number
  readonly sideBarVisible: boolean
}

export const loadPreferences = async (accountEnabled: boolean, platform: number): Promise<Preferences> => {
  const [accountEnabledNew, activeView, contributedViews, sidebarLocation, sideBarVisible] = await Promise.all([
    getAccountEnabled(accountEnabled),
    getActiveView(),
    getContributedViews(platform),
    getSideBarPosition(),
    getSideBarVisible(),
  ])
  return {
    accountEnabled: accountEnabledNew,
    activeView,
    contributedViews,
    sidebarLocation,
    sideBarVisible,
  }
}
