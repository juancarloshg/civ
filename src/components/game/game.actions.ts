import { createAction, ActionsUnion } from '../../utils/actionHelpers'
import { Tile } from './grid'
import { Unit } from './units/unit.types'

export enum ActionTypes {
    INIT_GAME = '[game] init game',
    SELECT_TILE = '[game] select tile',
    SELECT_UNIT = '[game] select unit',
    RESET_SELECTIONS = '[game] reset selections',
    NEXT_TURN = '[game] next turn',
    ADD_PLAYER = '[game] add player',
    SET_PLAYER_MOVING = '[game] set player moving'
}

export const actions = {
    initGame: () => createAction(ActionTypes.INIT_GAME),
    selectTile: (tileId: Tile['id']) => createAction(ActionTypes.SELECT_TILE, tileId),
    selectUnit: (unitId: Unit['id']) => createAction(ActionTypes.SELECT_UNIT, unitId),
    nextTurn: () => createAction(ActionTypes.NEXT_TURN),
    addPlayer: (playerId: string) => createAction(ActionTypes.ADD_PLAYER, playerId),
    setPlayerMoving: (playerId: string) => createAction(ActionTypes.SET_PLAYER_MOVING, playerId),
    resetSelections: () => createAction(ActionTypes.RESET_SELECTIONS)
}

export type Actions = ActionsUnion<typeof actions>
