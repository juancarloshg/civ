import { Actions, ActionTypes } from './tile.actions'
import { TerrainType } from '../../terrains/base/TerrainType'
import { TerrainModifierType } from '../../terrains/modifiers/TerrainModifierType'
import { Unit } from '../../units/Unit'

export interface TileState {
    row: number
    col: number
    terrain: TerrainType
    terrainModifiers: TerrainModifierType[]
    units: Unit[]
}

export const reducer = (state: TileState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.INIT_TILE:
            return {
                ...state,
                row: action.payload.row,
                col: action.payload.col,
                terrain: action.payload.terrain,
                terrainModifiers: action.payload.terrainModifiers
            }
        default:
            return state
    }
}
