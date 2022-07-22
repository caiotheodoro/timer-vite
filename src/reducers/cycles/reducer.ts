import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  // activeCycle: Cycle | undefined;
  activeCycleId: string | null
  // amountSecondsPassed: number;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      const currentFinishedCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentFinishedCycleIndex < 0) {
        return state
      } else {
        return produce(state, (draft) => {
          draft.cycles[currentFinishedCycleIndex].finishedDate = new Date()
          draft.activeCycleId = null
        })
      }

    case ActionTypes.INTERRUPT_CYCLE:
      const currentInterruptCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentInterruptCycleIndex < 0) {
        return state
      } else {
        return produce(state, (draft) => {
          draft.cycles[currentInterruptCycleIndex].interruptedDate = new Date()
          draft.activeCycleId = null
        })
      }

    default:
      return state
  }
}
