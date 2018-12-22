import { Tile } from './grid'
import { Player } from './game.types'
import { Actions, ActionTypes } from './game.actions'
import { Unit } from './units/unit.types'

export interface GameState {
    selectedTileId: Tile['id'] | null
    selectedUnitId: Unit['id'] | null
    turn: number
    playerMoving: Player['id'] | null
    playersPlaying: Player['id'][]
}

const initialState: GameState = {
    playersPlaying: [],
    selectedTileId: null,
    selectedUnitId: null,
    turn: 0,
    playerMoving: null
}

export const reducer = (state: GameState = initialState, action: Actions): GameState => {
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
        case ActionTypes.NEXT_TURN:
            return {
                ...state,
                turn: state.turn + 1
            }
        default:
            return state
    }
}
