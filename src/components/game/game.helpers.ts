import { TerrainType, terrains } from './terrains/base/terrains'
import { TerrainModifierType } from './terrains/modifiers/terrainModifiers'
import { Unit } from './units/units'

export interface Tile {
    terrain: TerrainType
    terrainModifiers: TerrainModifierType[]
    units: Unit[]
    row: number
    col: number
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
                units: [],
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

export function getViewTiles(tiles: TileMatrix, viewSize: number, row: number = 0, col: number = 0) {
    return tiles.slice(row, viewSize + row).map(tilesRow => tilesRow.slice(col, viewSize + col))
}
