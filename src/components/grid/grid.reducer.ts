import { Actions, ActionTypes } from './grid.actions'
import { TileMatrix } from './grid.helpers'

export type GridState = TileMatrix

const initialState: TileMatrix = []

export const reducer = (state: GridState = initialState, action: Actions): GridState => {
    switch (action.type) {
        case ActionTypes.INIT_GRID_SUCCESS:
            return [...action.payload]
        default:
            return state
    }
}
