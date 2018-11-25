import { TerrainType, terrains } from './terrains/base/terrains'
import { TerrainModifierType } from './terrains/modifiers/terrainModifiers'
import { Unit } from './units/units'

export interface Tile {
    terrain: TerrainType
    terrainModifiers: TerrainModifierType[]
    units: Unit[]
}

export type TileMatrix = Tile[][]

export function generateMap(size: number): TileMatrix {
    const map: TileMatrix = []
    for (let row = 0; row < size; row++) {
        map[row] = []
        for (let col = 0; col < size; col++) {
            map[row][col] = {
                terrain: getRandomTerrainType(),
                terrainModifiers: [],
                units: []
            }
        }
    }
    return map
}

function getRandomTerrainType(): TerrainType {
    return Object.keys(terrains)[Math.floor(Math.random() * Object.keys(terrains).length)] as TerrainType
}

export const isValidGrid = (grid: TileMatrix, size: number): boolean => grid && grid.length === size && grid.every(row => row.length === size)
