import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { TileMatrix } from './grid.helpers'

export enum ActionTypes {
    INIT_GRID = '[grid] init grid',
    INIT_GRID_SUCCESS = '[grid] init grid success'
}

export const actions = {
    initGrid: () => createAction(ActionTypes.INIT_GRID),
    initGridSuccess: (tiles: TileMatrix) => createAction(ActionTypes.INIT_GRID_SUCCESS, tiles)
}

export type Actions = ActionsUnion<typeof actions>
