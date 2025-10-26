import { terminate } from '@lvce-editor/viewlet-registry'
import * as WrapCommand from '../ActivityBarStates/ActivityBarStates.ts'
import * as Focus from '../Focus/Focus.ts'
import * as FocusFirst from '../FocusFirst/FocusFirst.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as FocusLast from '../FocusLast/FocusLast.ts'
import * as FocusNext from '../FocusNext/FocusNext.ts'
import * as FocusNone from '../FocusNone/FocusNone.ts'
import { getKeyBindings } from '../GetKeyBindings/GetKeyBindings.ts'
import { handleBlur } from '../HandleBlur/HandleBlur.ts'
import * as HandleClick from '../HandleClick/HandleClick.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'

export const commandMap = {
  'ActivityBar.focus': WrapCommand.wrapCommand(Focus.focus),
  'ActivityBar.focusFirst': WrapCommand.wrapCommand(FocusFirst.focusFirst),
  'ActivityBar.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'ActivityBar.focusLast': WrapCommand.wrapCommand(FocusLast.focusLast),
  'ActivityBar.focusNext': WrapCommand.wrapCommand(FocusNext.focusNext),
  'ActivityBar.handleBlur': WrapCommand.wrapCommand(handleBlur),
  'ActivityBar.focusNone': WrapCommand.wrapCommand(FocusNone.focusNone),
  'ActivityBar.getKeyBindings': getKeyBindings,
  'ActivityBar.handleClick': WrapCommand.wrapCommand(HandleClick.handleClick),
  'ActivityBar.getCommandIds': WrapCommand.getCommandIds,
  'ActivityBar.render2': Render2.render2,
  'ActivityBar.renderEventListeners': RenderEventListeners.renderEventListeners,
  'ActivityBar.saveState': WrapCommand.wrapGetter(SaveState.saveState),
  'ActivityBar.terminate': terminate,
}
