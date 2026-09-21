import { expect, test } from '@jest/globals'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getComponentDom } from '../src/parts/GetComponentDom/GetComponentDom.ts'
import { getComponentState } from '../src/parts/GetComponentState/GetComponentState.ts'
import { setComponentState } from '../src/parts/SetComponentState/SetComponentState.ts'

test('gets the current live component DOM', () => {
  const uid = 100
  const state = {
    ...createDefaultState(),
    filteredItems: [
      {
        badgeIcon: '',
        badgeText: '',
        customIconClass: '',
        customIconUrl: '',
        enabled: true,
        flags: 0,
        hasPopup: false,
        icon: 'explorer',
        id: 'Explorer',
        keyShortcuts: '',
        preferredLocation: 0,
        title: 'Explorer',
      },
    ],
    initial: false,
    uid,
  }
  ActivityBarStates.set(uid, state, state)

  const dom = getComponentDom(uid)

  expect(dom).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'ActivityBar' })]))
  expect(dom).toHaveLength(2)
})

test('gets and sets the live component state', async () => {
  const uid = 101
  const oldState = { ...createDefaultState(), selectedIndex: 0, uid }
  const newState = { ...oldState, selectedIndex: 1 }
  ActivityBarStates.set(uid, oldState, oldState)

  expect(getComponentState(uid)).toBe(oldState)
  await setComponentState(uid, newState)

  expect(ActivityBarStates.get(uid)).toEqual({ newState, oldState, scheduledState: newState })
})

test('rejects an invalid live component state', async () => {
  const uid = 102
  const state = { ...createDefaultState(), uid }
  ActivityBarStates.set(uid, state, state)

  await expect(setComponentState(uid, { ...state, uid: 103 })).rejects.toThrow('Activity Bar state uid must remain 102')
  await expect(setComponentState(uid, [] as unknown)).rejects.toThrow('Activity Bar state must be an object')
})
