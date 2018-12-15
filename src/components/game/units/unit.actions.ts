import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { Unit } from '../units/units'

export enum ActionTypes {
    ADD_UNITS = '[units] add units',
    MOVE_UNIT = '[units] move unit',
    SET_UNITS = '[units] set units'
}

export const actions = {
    addUnits: (units: Unit[]) => createAction(ActionTypes.ADD_UNITS, units),
    moveUnit: (unit: Unit) => createAction(ActionTypes.MOVE_UNIT, unit),
    setUnits: (units: Unit[]) => createAction(ActionTypes.SET_UNITS, units)
}

export type Actions = ActionsUnion<typeof actions>
