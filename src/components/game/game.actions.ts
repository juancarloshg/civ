import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { TileMatrix } from './game.helpers'
import { Player } from './game.types'

export enum ActionTypes {
    INIT_GAME = '[game] init game',
    INIT_GRID = '[game] init grid',
    INIT_VIEW_GRID = '[game] init view grid',
    INIT_PLAYER = '[game] init player'
}

export const actions = {
    initGame: () => createAction(ActionTypes.INIT_GAME),
    initGrid: (tiles: TileMatrix) => createAction(ActionTypes.INIT_GRID, tiles),
    initViewGrid: (tiles: TileMatrix) => createAction(ActionTypes.INIT_VIEW_GRID, tiles),
    initPlayer: (player: Partial<Player>) => createAction(ActionTypes.INIT_PLAYER, player)
}

export type Actions = ActionsUnion<typeof actions>
