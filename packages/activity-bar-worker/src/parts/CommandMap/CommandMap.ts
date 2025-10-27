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
import { handleBlur } from '../HandleBlur/HandleBlur.ts'
import * as HandleClick from '../HandleClick/HandleClick.ts'
import { handleClickIndex } from '../HandleClickIndex/HandleClickIndex.ts'
import { handleContextMenu } from '../HandleContextMenu/HandleContextMenu.ts'
import { handleResize } from '../HandleResize/HandleResize.ts'
import { handleSideBarHidden } from '../HandleSideBarHidden/HandleSideBarHidden.ts'
import { handleSideBarViewletChange } from '../HandleSideBarViewletChange/HandleSideBarViewletChange.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'

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
  'ActivityBar.handleBlur': WrapCommand.wrapCommand(handleBlur),
  'ActivityBar.handleResize': WrapCommand.wrapCommand(handleResize),
  'ActivityBar.handleClick': WrapCommand.wrapCommand(HandleClick.handleClick),
  'ActivityBar.handleContextMenu': WrapCommand.wrapCommand(handleContextMenu),
  'ActivityBar.handleSideBarHidden': WrapCommand.wrapCommand(handleSideBarHidden),
  'ActivityBar.handleClickIndex': WrapCommand.wrapCommand(handleClickIndex),
  'ActivityBar.handleSideBarViewletChange': WrapCommand.wrapCommand(handleSideBarViewletChange),
  'ActivityBar.loadContent': WrapCommand.wrapCommand(loadContent),
  'ActivityBar.render2': Render2.render2,
  'ActivityBar.renderEventListeners': RenderEventListeners.renderEventListeners,
  'ActivityBar.saveState': WrapCommand.wrapGetter(SaveState.saveState),
  'ActivityBar.terminate': terminate,
}
