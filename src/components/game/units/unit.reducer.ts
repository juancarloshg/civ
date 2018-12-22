import { Actions, ActionTypes } from './unit.actions'
import { Unit } from './unit.types'
import { removeByIndex } from '../../../utils/utils'

export type UnitsState = Unit[]

const initialState: UnitsState = []

export const reducer = (units: UnitsState = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.ADD_UNITS:
            return [...units, ...action.payload]
        case ActionTypes.SET_UNITS:
            return [...action.payload]
        case ActionTypes.REMOVE_UNIT:
            const unit: Unit = action.payload
            const unitIndex = units.findIndex(u => u.id === unit.id)
            return removeByIndex(units, unitIndex)
        default:
            return units
    }
}
