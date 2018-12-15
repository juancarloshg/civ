import { TerrainType, terrains } from '../terrains/base/terrains'
import { TerrainModifierType } from '../terrains/modifiers/terrainModifiers'
import { Unit } from '../units/units'

export interface Tile {
    id: string
    terrain: TerrainType
    terrainModifiers: TerrainModifierType[]
    row: number
    col: number
}

export interface TileWithUnits extends Tile {
    units: Unit[]
}

export type Grid = Tile[][]
export type GridWithUnits = TileWithUnits[][]

export function generateMap(size: number): Grid {
    const map: Grid = []
    for (let row = 0; row < size; row++) {
        map[row] = []
        for (let col = 0; col < size; col++) {
            map[row][col] = {
                id: `row${row}col${col}`,
                terrain: getRandomTerrainType(),
                terrainModifiers: [],
                row,
                col
            }
        }
    }
    return map
}

function getRandomTerrainType(): TerrainType {
    return Object.keys(terrains)[Math.floor(Math.random() * Object.keys(terrains).length)] as TerrainType
}
