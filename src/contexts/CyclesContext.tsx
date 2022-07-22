import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, addNewCycleAction, interruptCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import {  Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string;
  minutesAmount: number;

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



export function CyclesContextProvider({ children }: CycleProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
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

    dispatch(markCurrentCycleAsFinishedAction())

  }

  const createNewCycle = ({ minutesAmount, task }: CreateCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)

  }

  const interruptCurrentCycle = () => {

    dispatch(interruptCycleAction())

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