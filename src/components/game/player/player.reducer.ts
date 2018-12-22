import { Actions, ActionTypes } from './player.actions'
import { Player } from '../game.types'

export type PlayersState = Player[]

const initialState: PlayersState = []

export const reducer = (state: PlayersState = initialState, action: Actions): PlayersState => {
    switch (action.type) {
        case ActionTypes.ADD_PLAYER:
            return [
                ...state,
                {
                    ...action.payload
                }
            ]
        default:
            return state
    }
}
