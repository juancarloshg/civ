import { Actions, ActionTypes } from './player.actions'
import { Unit } from '../units/units'
import { Tile } from '../grid/grid.helpers'
import { Player } from '../game.types'

export interface PlayerState {
    player: Player
    selectedTile: Tile | null
    selectedUnit: Unit | null
}

const initialState: PlayerState = {
    selectedTile: null,
    selectedUnit: null,
    player: {
        units: []
    }
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
        case ActionTypes.ADD_PLAYER:
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
