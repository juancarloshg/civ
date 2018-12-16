import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { Unit, UnitActionType } from './units'

export enum ActionTypes {
    ADD_UNITS = '[units] add units',
    MOVE_UNIT = '[units] move unit',
    SET_UNITS = '[units] set units',
    REMOVE_UNIT = '[units] remove unit',
    UNIT_ACTION = '[units] unit action'
}

export const actions = {
    addUnits: (units: Unit[]) => createAction(ActionTypes.ADD_UNITS, units),
    moveUnit: (unit: Unit) => createAction(ActionTypes.MOVE_UNIT, unit),
    setUnits: (units: Unit[]) => createAction(ActionTypes.SET_UNITS, units),
    removeUnit: (unit: Unit) => createAction(ActionTypes.REMOVE_UNIT, unit),
    unitAction: (unit: Unit, action: UnitActionType) => createAction(ActionTypes.UNIT_ACTION, { unit, action })
}

export type Actions = ActionsUnion<typeof actions>
