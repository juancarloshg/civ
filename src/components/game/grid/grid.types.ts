import { TerrainType } from '../terrains/base/terrains'
import { TerrainModifierType } from '../terrains/modifiers/terrainModifiers'
import { Unit } from '../units/units'
import { ExtendedCity } from '../city/city.types'

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
    city: ExtendedCity | null
    owner: string | null
}

export type Grid = Tile[][]
export type ExtendedGrid = ExtendedTile[][]
