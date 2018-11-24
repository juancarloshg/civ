import { Actions, ActionTypes } from './game.actions'
import { TileMatrix } from './game.helpers'

export interface GameState {
    grid: TileMatrix
}

const initialState: GameState = {
    grid: []
}

export const reducer = (state: GameState = initialState, action: Actions): GameState => {
    switch (action.type) {
        case ActionTypes.INIT_GRID:
            return {
                ...state,
                grid: [...action.payload]
            }
        default:
            return state
    }
}
