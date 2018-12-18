import { TerrainType, terrains } from '../terrains/base/terrains'
import { TerrainModifierType } from '../terrains/modifiers/terrainModifiers'
import { Unit } from '../units/units'
import { City } from '../city/city.reducer'
import { Size } from '../../configuration/configuration.reducer'
import { GridPosition } from './grid.types'

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

export const getCircularView = (viewGridOrigin: GridPosition, viewSize: Size, grid: ExtendedGrid): ExtendedGrid => {
    const vPadding = viewSize.height / 2
    const rowStart = viewGridOrigin.row - Math.floor(vPadding)
    const rowEnd = viewGridOrigin.row + Math.ceil(vPadding)
    const hPadding = viewSize.width / 2
    const colStart = viewGridOrigin.col - Math.floor(hPadding)
    const colEnd = viewGridOrigin.col + Math.ceil(hPadding)
    return getCircularSlice(grid, rowStart, rowEnd).map(tilesRow => getCircularSlice(tilesRow, colStart, colEnd))
}

const getCircularSlice = <T>(array: T[], start: number, end: number): T[] => {
    const rows = []
    if (start < 0) {
        rows.push(...array.slice(array.length + start))
    }
    rows.push(...array.slice(Math.max(0, start), Math.min(end, array.length)))
    if (end > array.length) {
        rows.push(...array.slice(0, end - array.length))
    }

    return rows
}
