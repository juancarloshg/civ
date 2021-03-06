import { Actions, ActionTypes } from './grid.actions'
import { Grid } from './grid.types'
import { GridPosition } from '../shared/shared.types'

export interface GridState {
    isGridReady: boolean
    grid: Grid
    viewGridOrigin: GridPosition
}

const initialState: GridState = {
    isGridReady: false,
    grid: [],
    viewGridOrigin: {
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
        case ActionTypes.SET_VIEW_GRID_ORIGIN:
            return {
                ...state,
                viewGridOrigin: { ...action.payload }
            }
        default:
            return state
    }
}
