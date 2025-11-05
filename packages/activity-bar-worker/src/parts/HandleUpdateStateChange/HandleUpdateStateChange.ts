import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { UpdateConfig } from '../UpdateConfig/UpdateConfig.ts'

export const handleUpdateStateChange = async (state: ActivityBarState, config: UpdateConfig): Promise<ActivityBarState> => {
  return {
    ...state,
    updateState: config.state,
    updateProgress: config.progress,
  }
}
