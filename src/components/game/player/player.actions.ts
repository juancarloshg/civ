import { createAction, ActionsUnion } from '../../../utils/actionHelpers'
import { Player } from '../game.types'

export enum ActionTypes {
    INIT_PLAYER = '[player] init player',
    ADD_PLAYER = '[player] add player',
    SKIP_TURN = '[player] skip turn'
}

export const actions = {
    addPlayer: (player: Player) => createAction(ActionTypes.ADD_PLAYER, player),
    skipTurn: () => createAction(ActionTypes.SKIP_TURN)
}

export type Actions = ActionsUnion<typeof actions>
