import { TerrainType } from '../shared/terrains/base/terrains'
import { TerrainModifierType } from '../shared/terrains/modifiers/terrainModifiers'

export interface Tile {
    id: string
    terrain: TerrainType
    terrainModifiers: TerrainModifierType[]
    row: number
    col: number
}

export type Grid = Tile[][]
