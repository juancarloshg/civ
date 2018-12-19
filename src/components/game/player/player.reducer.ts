import { Actions, ActionTypes } from './player.actions'
import { Unit } from '../units/units'
import { Player } from '../game.types'
import { Tile } from '../grid'

export interface PlayerState {
    player: Player
    selectedTileId: Tile['id'] | null
    selectedUnitId: Unit['id'] | null
    turn: number
}

const initialState: PlayerState = {
    selectedTileId: null,
    selectedUnitId: null,
    turn: 0,
    player: {
        unitIds: []
    }
}

export const reducer = (state: PlayerState = initialState, action: Actions): PlayerState => {
    switch (action.type) {
        case ActionTypes.SELECT_TILE:
            return {
                ...state,
                selectedTileId: action.payload,
                selectedUnitId: null
            }
        case ActionTypes.SELECT_UNIT:
            return {
                ...state,
                selectedUnitId: action.payload,
                selectedTileId: null
            }
        case ActionTypes.ADD_PLAYER:
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.payload
                }
            }
        case ActionTypes.NEXT_TURN:
            return {
                ...state,
                turn: state.turn + 1
            }
        default:
            return state
    }
}
