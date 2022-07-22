import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;

}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  changeSecondsPassed: (seconds: number) => void;
  createNewCycle: (cycle: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}





export const CyclesContext = createContext({} as CyclesContextType)




interface CycleProviderProps {
  children: ReactNode;
}


interface CyclesState {
  cycles: Cycle[];
  // activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  // amountSecondsPassed: number;

}

export function CyclesContextProvider({ children }: CycleProviderProps) {
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    switch (action.type) {
      case 'CREATE_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
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

      case 'INTERRUPT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === action.payload.activeCycleId) {
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
  }, {
    cycles: [],
    activeCycleId: null,
  });

  const { activeCycleId, cycles } = cyclesState;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const changeSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {

    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
    })

  }

  const createNewCycle = ({ minutesAmount, task }: CreateCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date()
    }

    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle,
      }
    })

    setAmountSecondsPassed(0)

  }

  const interruptCurrentCycle = () => {

    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {
        activeCycleId
      }
    })

  }



  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        changeSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}>

      {children}
    </CyclesContext.Provider>
  )
}