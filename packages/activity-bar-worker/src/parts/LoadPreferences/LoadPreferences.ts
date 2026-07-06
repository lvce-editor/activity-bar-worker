import type { ContributedView } from '../GetContributedViews/GetContributedViews.ts'
import { getAccountEnabled } from '../GetAccountEnabled/GetAccountEnabled.ts'
import { getActiveView } from '../GetActiveView/GetActiveView.ts'
import { getContributedViews } from '../GetContributedViews/GetContributedViews.ts'
import { getSideBarPosition } from '../GetSideBarPosition/GetSideBarPosition.ts'
import { getSideBarVisible } from '../GetSideBarVisible/GetSideBarVisible.ts'
import { getUserInfo } from '../GetUserInfo/GetUserInfo.ts'

interface Preferences {
  readonly accountEnabled: boolean
  readonly activeView: string
  readonly contributedViews: readonly ContributedView[]
  readonly sidebarLocation: number
  readonly sideBarVisible: boolean
  readonly userInfo: unknown
}

export const loadPreferences = async (accountEnabled: boolean, platform: number): Promise<Preferences> => {
  const [accountEnabledNew, activeView, contributedViews, sidebarLocation, sideBarVisible, userInfo] = await Promise.all([
    getAccountEnabled(accountEnabled),
    getActiveView(),
    getContributedViews(platform),
    getSideBarPosition(),
    getSideBarVisible(),
    getUserInfo(),
  ])
  return {
    accountEnabled: accountEnabledNew,
    activeView,
    contributedViews,
    sidebarLocation,
    sideBarVisible,
    userInfo,
  }
}
