import { Unit } from './units'
import { Actions, ActionTypes } from './unit.actions'

export type UnitsState = Unit[]

const initialState: UnitsState = []

export const reducer = (units: UnitsState = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.ADD_UNITS:
            return [...units, ...action.payload]
        case ActionTypes.SET_UNITS:
            return [...action.payload]
        default:
            return units
    }
}
