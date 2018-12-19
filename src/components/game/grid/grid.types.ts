import { TerrainType } from '../terrains/base/terrains'
import { TerrainModifierType } from '../terrains/modifiers/terrainModifiers'
import { Unit } from '../units/units'
import { City } from '../city/city.types'

export interface GridPosition {
    row: number
    col: number
}

export interface Tile {
    id: string
    terrain: TerrainType
    terrainModifiers: TerrainModifierType[]
    row: number
    col: number
}

export interface ExtendedTile extends Tile {
    units: Unit[]
    city: City | null
}

export type Grid = Tile[][]
export type ExtendedGrid = ExtendedTile[][]
