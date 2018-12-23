import { createAction, ActionsUnion } from '../../../utils/actionHelpers'
import { Unit, UnitActionType, ExtendedUnit } from './unit.types'
import { GridPosition } from '../grid'

export enum ActionTypes {
    ADD_UNITS = '[units] add units',
    MOVE_UNIT = '[units] move unit',
    SET_UNITS = '[units] set units',
    REMOVE_UNIT = '[units] remove unit',
    UNIT_ACTION = '[units] unit action',
    RESET_UNIT_MOVEMENTS = '[units] reset unit movements'
}

export const actions = {
    addUnits: (units: Unit[]) => createAction(ActionTypes.ADD_UNITS, units),
    moveUnit: (unit: Unit, position: GridPosition) => createAction(ActionTypes.MOVE_UNIT, { unit, position }),
    setUnits: (units: Unit[]) => createAction(ActionTypes.SET_UNITS, units),
    removeUnit: (unit: Unit) => createAction(ActionTypes.REMOVE_UNIT, unit),
    unitAction: (unit: ExtendedUnit, action: UnitActionType) => createAction(ActionTypes.UNIT_ACTION, { unit, action }),
    resetUnitMovements: () => createAction(ActionTypes.RESET_UNIT_MOVEMENTS)
}

export type Actions = ActionsUnion<typeof actions>
