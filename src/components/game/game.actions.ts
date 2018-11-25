import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { TileMatrix } from './game.helpers'

export enum ActionTypes {
    INIT_GAME = '[game] init game',
    INIT_GRID = '[game] init grid'
}

export const actions = {
    initGame: () => createAction(ActionTypes.INIT_GAME),
    initGridSuccess: (tiles: TileMatrix) => createAction(ActionTypes.INIT_GRID, tiles)
}

export type Actions = ActionsUnion<typeof actions>
