import { createAction, ActionsUnion } from '../../../utils/actionHelpers'
import { GridPosition, Grid } from './grid.types'

export enum ActionTypes {
    SET_GRID = '[grid] set grid',
    SET_VIEW_GRID_ORIGIN = '[grid] set view grid origin'
}

export const actions = {
    setGrid: (tiles: Grid) => createAction(ActionTypes.SET_GRID, tiles),
    setViewGridOrigin: (viewGrid: GridPosition) => createAction(ActionTypes.SET_VIEW_GRID_ORIGIN, viewGrid)
}

export type Actions = ActionsUnion<typeof actions>
