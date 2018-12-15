import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { Grid } from './grid.helpers'
import { ViewGridOrigin } from './grid.reducer'

export enum ActionTypes {
    SET_GRID = '[grid] set grid',
    SET_VIEW_GRID_ORIGIN = '[grid] set view grid origin'
}

export const actions = {
    setGrid: (tiles: Grid) => createAction(ActionTypes.SET_GRID, tiles),
    setViewGridOrigin: (viewGrid: ViewGridOrigin) => createAction(ActionTypes.SET_VIEW_GRID_ORIGIN, viewGrid)
}

export type Actions = ActionsUnion<typeof actions>
