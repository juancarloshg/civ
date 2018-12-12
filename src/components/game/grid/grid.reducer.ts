import { Actions, ActionTypes } from './grid.actions'
import { TileMatrix } from './grid.helpers'

export interface ViewGrid {
    grid: TileMatrix
    row: number
    col: number
}

export interface GridState {
    isGridReady: boolean
    grid: TileMatrix
    viewGrid: ViewGrid
}

const initialState: GridState = {
    isGridReady: false,
    grid: [],
    viewGrid: {
        grid: [],
        row: 0,
        col: 0
    }
}

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
    switch (action.type) {
        case ActionTypes.SET_GRID:
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
        default:
            return state
    }
}
