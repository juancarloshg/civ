import { TerrainType } from '../terrains/base/terrains'
import { TerrainModifierType } from '../terrains/modifiers/terrainModifiers'
import { City } from '../city/city.types'
import { ExtendedUnit } from '../units/unit.types'
import { Player } from '../game.types'

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
    units: ExtendedUnit[]
    city: City | null
    owner: Player | null
}

export type Grid = Tile[][]
export type ExtendedGrid = ExtendedTile[][]
