import { ActionTypes } from "./actions";


export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
  }
  
interface CyclesState {
    cycles: Cycle[];
    // activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    // amountSecondsPassed: number;
  
  }



export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
      case ActionTypes.CREATE_NEW_CYCLE:
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }
      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return {
                ...cycle,
                finishedDate: new Date()
              }
            }
            return cycle
          }),
          activeCycleId: null
        }

      case ActionTypes.INTERRUPT_CYCLE:
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return {
                ...cycle,
                interruptedDate: new Date()
              }
            } else {
              return cycle;

            }
          }),
          activeCycleId: null
        }
      default:
        return state
    }
  }