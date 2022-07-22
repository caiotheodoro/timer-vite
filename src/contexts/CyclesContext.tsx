import { createContext, ReactNode, useState } from "react";

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

export function CyclesContextProvider({children}: CycleProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const changeSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentCycleAsFinished = () => {
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          finishedDate: new Date()
        }
      }

      return cycle
    }))
  }

  const createNewCycle = ({ minutesAmount, task }: CreateCycleData) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)


  }

  const interruptCurrentCycle = () => {

    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          interruptedDate: new Date()
        }
      }

      return cycle
    }))

    setActiveCycleId(null)



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