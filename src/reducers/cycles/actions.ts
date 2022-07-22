import { Cycle } from "./reducer";

export enum ActionTypes {
    CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
    INTERRUPT_CYCLE =  'INTERRUPT_CYCLE',

}

export function addNewCycleAction (newCycle: Cycle) {
    return {
        type: ActionTypes.CREATE_NEW_CYCLE,
        payload: {
            newCycle
        }
    }
}

export function markCurrentCycleAsFinishedAction () {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    }
}

export function interruptCycleAction () {
    return {
        type: ActionTypes.INTERRUPT_CYCLE,
    }
}