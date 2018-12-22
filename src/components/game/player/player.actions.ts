import { createAction, ActionsUnion } from '../../../utils/actionHelpers'
import { Player } from '../game.types'
import { Unit } from '../units/unit.types'

export enum ActionTypes {
    INIT_PLAYER = '[player] init player',
    ADD_PLAYER = '[player] add player',
    SKIP_TURN = '[player] skip turn',
    REMOVE_UNIT = '[player] remove unit',
    ADD_CITY = '[player] add city'
}

export const actions = {
    addPlayer: (player: Player) => createAction(ActionTypes.ADD_PLAYER, player),
    skipTurn: () => createAction(ActionTypes.SKIP_TURN),
    addCity: (player: Player, cityId: string) => createAction(ActionTypes.ADD_CITY, { player, cityId }),
    removeUnit: (player: Player, unit: Unit) => createAction(ActionTypes.REMOVE_UNIT, { player, unit })
}

export type Actions = ActionsUnion<typeof actions>
