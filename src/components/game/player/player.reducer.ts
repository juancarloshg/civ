import { Actions, ActionTypes } from './player.actions'
import { Player } from '../game.types'
import { removeByIndex, updateByIndex } from '../../../utils/utils'

export type PlayersState = Player[]

const initialState: PlayersState = []

export const reducer = (players: PlayersState = initialState, action: Actions): PlayersState => {
    switch (action.type) {
        case ActionTypes.ADD_PLAYER:
            return [
                ...players,
                {
                    ...action.payload
                }
            ]
        case ActionTypes.REMOVE_UNIT:
            const playerIndex = players.indexOf(action.payload.player)
            const player = players[playerIndex]
            const removedUnitIndex = player.unitIds.indexOf(action.payload.unit.id)
            const newPlayer = { ...player, unitIds: removeByIndex(player.unitIds, removedUnitIndex) }
            return updateByIndex(players, newPlayer, playerIndex)
        default:
            return players
    }
}
