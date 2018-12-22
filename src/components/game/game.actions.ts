import { createAction, ActionsUnion } from '../../utils/actionHelpers'
import { Tile } from './grid'
import { Unit } from './units/unit.types'

export enum ActionTypes {
    INIT_GAME = '[game] init game',
    SELECT_TILE = '[game] select tile',
    SELECT_UNIT = '[game] select unit',
    NEXT_TURN = '[game] next turn'
}

export const actions = {
    initGame: () => createAction(ActionTypes.INIT_GAME),
    selectTile: (tileId: Tile['id']) => createAction(ActionTypes.SELECT_TILE, tileId),
    selectUnit: (unitId: Unit['id']) => createAction(ActionTypes.SELECT_UNIT, unitId),
    nextTurn: () => createAction(ActionTypes.NEXT_TURN)
}

export type Actions = ActionsUnion<typeof actions>
