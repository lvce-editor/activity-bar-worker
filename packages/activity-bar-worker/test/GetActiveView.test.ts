import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getActiveView } from '../src/parts/GetActiveView/GetActiveView.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ViewletModuleId from '../src/parts/ViewletModuleId/ViewletModuleId.ts'

vi.mock('@lvce-editor/rpc-registry', () => ({
  RendererWorker: {
    invoke: vi.fn(),
  },
}))

describe('getActiveView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return the active view from Layout.getActiveSideBarView', async () => {
    const mockActiveView = 'test-view'
    vi.mocked(RendererWorker.invoke).mockResolvedValue(mockActiveView)

    const result = await getActiveView()

    expect(RendererWorker.invoke).toHaveBeenCalledWith('Layout.getActiveSideBarView')
    expect(result).toBe(mockActiveView)
  })

  it('should return Explorer as fallback when invoke fails', async () => {
    vi.mocked(RendererWorker.invoke).mockRejectedValue(new Error('Failed to get active view'))

    const result = await getActiveView()

    expect(RendererWorker.invoke).toHaveBeenCalledWith('Layout.getActiveSideBarView')
    expect(result).toBe(ViewletModuleId.Explorer)
  })
})
