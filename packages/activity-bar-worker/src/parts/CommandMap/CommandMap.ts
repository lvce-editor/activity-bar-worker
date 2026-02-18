import { terminate } from '@lvce-editor/viewlet-registry'
import * as WrapCommand from '../ActivityBarStates/ActivityBarStates.ts'
import * as Create from '../Create/Create.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import * as Focus from '../Focus/Focus.ts'
import * as FocusFirst from '../FocusFirst/FocusFirst.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as FocusLast from '../FocusLast/FocusLast.ts'
import * as FocusNext from '../FocusNext/FocusNext.ts'
import * as FocusNone from '../FocusNone/FocusNone.ts'
import { getKeyBindings } from '../GetKeyBindings/GetKeyBindings.ts'
import { getMenuEntries } from '../GetMenuEntries/GetMenuEntries.ts'
import { getMenuEntryIds } from '../GetMenuEntryIds/GetMenuEntryIds.ts'
import { handleBadgeCountChange } from '../handleBadgeCountChange/handleBadgeCountChange.ts'
import { handleBlur } from '../HandleBlur/HandleBlur.ts'
import * as HandleClick from '../HandleClick/HandleClick.ts'
import { handleClickIndex } from '../HandleClickIndex/HandleClickIndex.ts'
import { handleContextMenu } from '../HandleContextMenu/HandleContextMenu.ts'
import { handleFocus } from '../HandleFocus/HandleFocus.ts'
import { handleResize } from '../HandleResize/HandleResize.ts'
import { handleSettingsChanged } from '../HandleSettingsChanged/HandleSettingsChanged.ts'
import { handleSideBarHidden } from '../HandleSideBarHidden/HandleSideBarHidden.ts'
import { handleSideBarViewletChange } from '../HandleSideBarViewletChange/HandleSideBarViewletChange.ts'
import { handleUpdateStateChange } from '../HandleUpdateStateChange/HandleUpdateStateChange.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import { setAccountEnabled } from '../SetAccountEnabled/SetAccountEnabled.ts'
import { toggleActivityBarItem } from '../ToggleActivityBarItem/ToggleActivityBarItem.ts'

export const commandMap = {
  'ActivityBar.create': Create.create,
  'ActivityBar.diff2': diff2,
  'ActivityBar.focus': WrapCommand.wrapCommand(Focus.focus),
  'ActivityBar.focusFirst': WrapCommand.wrapCommand(FocusFirst.focusFirst),
  'ActivityBar.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'ActivityBar.focusLast': WrapCommand.wrapCommand(FocusLast.focusLast),
  'ActivityBar.focusNext': WrapCommand.wrapCommand(FocusNext.focusNext),
  'ActivityBar.focusNone': WrapCommand.wrapCommand(FocusNone.focusNone),
  'ActivityBar.getCommandIds': WrapCommand.getCommandIds,
  'ActivityBar.getKeyBindings': getKeyBindings,
  'ActivityBar.getMenuEntries': WrapCommand.wrapGetter(getMenuEntries),
  'ActivityBar.getMenuEntryIds': getMenuEntryIds,
  'ActivityBar.handleBadgeCountChange': WrapCommand.wrapCommand(handleBadgeCountChange),
  'ActivityBar.handleBlur': WrapCommand.wrapCommand(handleBlur),
  'ActivityBar.handleClick': WrapCommand.wrapCommand(HandleClick.handleClick),
  'ActivityBar.handleClickIndex': WrapCommand.wrapCommand(handleClickIndex),
  'ActivityBar.handleContextMenu': WrapCommand.wrapCommand(handleContextMenu),
  'ActivityBar.handleFocus': WrapCommand.wrapCommand(handleFocus),
  'ActivityBar.handleSettingsChanged': WrapCommand.wrapCommand(handleSettingsChanged),
  'ActivityBar.handleSideBarHidden': WrapCommand.wrapCommand(handleSideBarHidden),
  'ActivityBar.handleSideBarViewletChange': WrapCommand.wrapCommand(handleSideBarViewletChange),
  'ActivityBar.handleUpdateStateChange': WrapCommand.wrapCommand(handleUpdateStateChange),
  'ActivityBar.loadContent': WrapCommand.wrapCommand(loadContent),
  'ActivityBar.render2': Render2.render2,
  'ActivityBar.renderEventListeners': RenderEventListeners.renderEventListeners,
  'ActivityBar.resize': WrapCommand.wrapCommand(handleResize),
  'ActivityBar.saveState': WrapCommand.wrapGetter(SaveState.saveState),
  'ActivityBar.setAccountEnabled': WrapCommand.wrapCommand(setAccountEnabled),
  'ActivityBar.terminate': terminate,
  'ActivityBar.toggleActivityBarItem': WrapCommand.wrapCommand(toggleActivityBarItem),
}
