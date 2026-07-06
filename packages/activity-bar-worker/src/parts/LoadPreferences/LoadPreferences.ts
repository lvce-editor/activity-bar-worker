import { getAccountEnabled } from '../GetAccountEnabled/GetAccountEnabled.ts'
import { getActiveView } from '../GetActiveView/GetActiveView.ts'
import type { ContributedView } from '../GetContributedViews/GetContributedViews.ts'
import { getContributedViews } from '../GetContributedViews/GetContributedViews.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { getUserInfo } from '../GetUserInfo/GetUserInfo.ts'

interface Preferences {
  readonly accountEnabled: boolean
  readonly activeView: string
  readonly contributedViews: readonly ContributedView[]
  readonly sideBarVisible: boolean
  readonly sidebarLocation: number
  readonly userInfo: unknown
}

export const loadPreferences = async (accountEnabled: boolean, platform: number): Promise<Preferences> => {
  const [accountEnabledNew, activeView, contributedViews, sideBarVisible, sidebarLocation, userInfo] = await Promise.all([
    getAccountEnabled(accountEnabled),
    getActiveView(),
    getContributedViews(platform),
    getSideBarVisible(),
    getSideBarPosition(),
    getUserInfo(),
  ])
  return {
    accountEnabled: accountEnabledNew,
    activeView,
    contributedViews,
    sideBarVisible,
    sidebarLocation,
    userInfo,
  }
}
