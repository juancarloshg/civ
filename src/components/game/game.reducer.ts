import { Actions, ActionTypes } from './game.actions'
import { Player } from './game.types'

export interface GameState {
    player: Player
}

const initialState: GameState = {
    player: {
        units: []
    }
}

export const reducer = (state: GameState = initialState, action: Actions): GameState => {
    switch (action.type) {
        case ActionTypes.INIT_PLAYER:
            return {
                ...state,
                player: {
                    ...state.player,
                    ...action.payload
                }
            }
        default:
            return state
    }
}
