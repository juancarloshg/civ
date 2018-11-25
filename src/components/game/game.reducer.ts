import { Actions, ActionTypes } from './game.actions'
import { TileMatrix } from './game.helpers'
import { Player } from './game.types'

export interface GameState {
    grid: TileMatrix
    player: Player
}

const initialState: GameState = {
    grid: [],
    player: {
        units: []
    }
}

export const reducer = (state: GameState = initialState, action: Actions): GameState => {
    switch (action.type) {
        case ActionTypes.INIT_GRID:
            return {
                ...state,
                grid: [...action.payload]
            }
        case ActionTypes.INIT_PLAYER:
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.payload
                }
            }
        default:
            return state
    }
}
