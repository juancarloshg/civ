import { Tile } from './grid'
import { Player } from './game.types'
import { Actions, ActionTypes } from './game.actions'
import { Unit } from './units/unit.types'

export interface GameState {
    selectedTileId: Tile['id'] | null
    selectedUnitId: Unit['id'] | null
    turn: number
    currentPlayerId: Player['id'] | null
    activePlayerIds: Player['id'][]
}

const initialState: GameState = {
    activePlayerIds: [],
    selectedTileId: null,
    selectedUnitId: null,
    turn: 0,
    currentPlayerId: null
}

export const reducer = (state: GameState = initialState, action: Actions): GameState => {
    switch (action.type) {
        case ActionTypes.ADD_PLAYER:
            return {
                ...state,
                activePlayerIds: [...state.activePlayerIds, action.payload]
            }
        case ActionTypes.SET_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayerId: action.payload
            }
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
        case ActionTypes.RESET_SELECTIONS:
            return {
                ...state,
                selectedUnitId: null,
                selectedTileId: null
            }
        case ActionTypes.NEXT_TURN:
            return {
                ...state,
                turn: state.turn + 1,
                currentPlayerId: state.activePlayerIds[0]
            }
        default:
            return state
    }
}
