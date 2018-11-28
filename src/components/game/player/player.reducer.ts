import { Actions, ActionTypes } from './player.actions'
import { Tile } from '../game.helpers'
import { Unit } from '../units/units'

export interface PlayerState {
    selectedTile: Tile | null
    selectedUnit: Unit | null
}

const initialState: PlayerState = {
    selectedTile: null,
    selectedUnit: null
}

export const reducer = (state: PlayerState = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.SELECT_TILE:
            return {
                ...state,
                selectedTile: action.payload
            }
        case ActionTypes.SELECT_UNIT:
            return {
                ...state,
                selectedUnit: action.payload
            }

        default:
            return state
    }
}
