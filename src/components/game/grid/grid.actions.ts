import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { TileMatrix } from './grid.helpers'
import { ViewGrid } from './grid.reducer'

export enum ActionTypes {
    SET_GRID = '[grid] set grid',
    SET_VIEW_GRID = '[grid] set view grid'
}

export const actions = {
    setGrid: (tiles: TileMatrix) => createAction(ActionTypes.SET_GRID, tiles),
    setViewGrid: (viewGrid: ViewGrid) => createAction(ActionTypes.SET_VIEW_GRID, viewGrid)
}

export type Actions = ActionsUnion<typeof actions>
