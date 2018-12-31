import { Tile } from './grid/grid.types'
import { Player } from './game.types'
import { Unit } from './units/unit.types'
import { ActionTypes, Actions } from './game.actions'
import { ActionTypes as UserActionTypes, Actions as UserActions } from './user.actions'

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

export const reducer = (state: GameState = initialState, action: Actions | UserActions): GameState => {
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
        case UserActionTypes.SELECT_TILE:
            return {
                ...state,
                selectedTileId: action.payload,
                selectedUnitId: null
            }
        case UserActionTypes.SELECT_UNIT:
            return {
                ...state,
                selectedUnitId: action.payload ? action.payload.id : null,
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
