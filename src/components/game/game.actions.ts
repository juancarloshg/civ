import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { TileMatrix } from './game.helpers'
import { Player } from './game.types'
import { ViewGrid } from './game.reducer'

export enum ActionTypes {
    INIT_GAME = '[game] init game',
    SET_GRID = '[game] set grid',
    SET_VIEW_GRID = '[game] set view grid',
    INIT_PLAYER = '[game] init player'
}

export const actions = {
    initGame: () => createAction(ActionTypes.INIT_GAME),
    setGrid: (tiles: TileMatrix) => createAction(ActionTypes.SET_GRID, tiles),
    setViewGrid: (viewGrid: ViewGrid) => createAction(ActionTypes.SET_VIEW_GRID, viewGrid),
    initPlayer: (player: Partial<Player>) => createAction(ActionTypes.INIT_PLAYER, player)
}

export type Actions = ActionsUnion<typeof actions>
