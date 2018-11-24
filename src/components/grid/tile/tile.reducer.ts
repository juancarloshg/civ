// import { Actions, ActionTypes } from './tile.actions'
// import { Unit } from '../../units/units'
// import { TerrainType } from 'src/components/terrains/base/terrains'
// import { TerrainModifierType } from 'src/components/terrains/modifiers/terrainModifiers'

// export interface TileState {
//     row: number
//     col: number
//     terrain: TerrainType
//     terrainModifiers: TerrainModifierType[]
//     units: Unit[]
// }

// export const reducer = (state: TileState, action: Actions): TileState => {
//     switch (action.type) {
//         case ActionTypes.INIT_TILE:
//             return {
//                 ...state,
//                 row: action.payload.row,
//                 col: action.payload.col,
//                 terrain: action.payload.terrain,
//                 terrainModifiers: action.payload.terrainModifiers
//             }
//         default:
//             return state
//     }
// }
