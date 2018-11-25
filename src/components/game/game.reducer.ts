import { Actions, ActionTypes } from './game.actions'
import { TileMatrix } from './game.helpers'
import { Player } from './game.types'

export interface ViewGrid {
    grid: TileMatrix
    row: number
    col: number
}

export interface GameState {
    isGridReady: boolean
    grid: TileMatrix
    viewGrid: ViewGrid
    player: Player
}

const initialState: GameState = {
    isGridReady: false,
    grid: [],
    viewGrid: {
        grid: [],
        row: 0,
        col: 0
    },
    player: {
        units: []
    }
}

export const reducer = (state: GameState = initialState, action: Actions): GameState => {
    switch (action.type) {
        case ActionTypes.INIT_GRID:
            return {
                ...state,
                isGridReady: true,
                grid: [...action.payload]
            }
        case ActionTypes.SET_VIEW_GRID:
            return {
                ...state,
                viewGrid: { ...action.payload }
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
