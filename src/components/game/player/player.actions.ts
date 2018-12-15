import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { Tile } from '../grid/grid.helpers'
import { Unit } from '../units/units'
import { Player } from '../game.types'

export enum ActionTypes {
    INIT_PLAYER = '[player] init player',
    ADD_PLAYER = '[player] add player',
    SELECT_TILE = '[player] select tile',
    SELECT_UNIT = '[player] select unit'
}

export const actions = {
    addPlayer: (player: Partial<Player>) => createAction(ActionTypes.ADD_PLAYER, player),
    selectTile: (tile: Tile) => createAction(ActionTypes.SELECT_TILE, tile),
    selectUnit: (unit: Unit['id']) => createAction(ActionTypes.SELECT_UNIT, unit)
}

export type Actions = ActionsUnion<typeof actions>
