import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { Tile } from '../grid/grid.helpers'
import { Unit } from '../units/units'

export enum ActionTypes {
    SELECT_TILE = '[player] select tile',
    SELECT_UNIT = '[player] select unit'
}

export const actions = {
    selectTile: (tile: Tile) => createAction(ActionTypes.SELECT_TILE, tile),
    selectUnit: (unit: Unit) => createAction(ActionTypes.SELECT_UNIT, unit)
}

export type Actions = ActionsUnion<typeof actions>
