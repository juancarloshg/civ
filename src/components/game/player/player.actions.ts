import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { Tile } from '../grid/grid.helpers'
import { Unit } from '../units/units'
import { Player } from '../game.types'

export enum ActionTypes {
    INIT_PLAYER = '[player] init player',
    ADD_PLAYER = '[player] add player',
    SELECT_TILE = '[player] select tile',
    SELECT_UNIT = '[player] select unit',
    NEXT_TURN = '[player] next turn'
}

export const actions = {
    addPlayer: (player: Partial<Player>) => createAction(ActionTypes.ADD_PLAYER, player),
    selectTile: (tileId: Tile['id']) => createAction(ActionTypes.SELECT_TILE, tileId),
    selectUnit: (unitId: Unit['id']) => createAction(ActionTypes.SELECT_UNIT, unitId),
    nextTurn: () => createAction(ActionTypes.NEXT_TURN)
}

export type Actions = ActionsUnion<typeof actions>
