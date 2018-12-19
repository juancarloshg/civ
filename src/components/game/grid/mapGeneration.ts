import { Grid, Tile } from './grid.types'
import { terrains, TerrainType } from '../terrains/base/terrains'
import { repeat, flatten, path, prop } from 'ramda'
import { randomFrom } from '../../../utils/utils'

// function getRandomTerrainType(): TerrainType {
//     return Object.keys(terrains)[Math.floor(Math.random() * Object.keys(terrains).length)] as TerrainType
// }

export function generateMap(size: number): Grid {
    const map: Grid = []
    for (let row = 0; row < size; row++) {
        map[row] = []
        for (let col = 0; col < size; col++) {
            map[row][col] = {
                id: `row${row}col${col}`,
                terrain: getTerrainType(row, col, map, size),
                terrainModifiers: [],
                row,
                col
            }
        }
    }
    return map
}

const getSurroundingTerrains = (row: number, col: number, grid: Grid, size: number) =>
    [
        { row: row - 1, col },
        // { row: row - 1, col: col + 1 },
        // { row: row - 1, col: col - 1 },
        { row, col: col + 1 },
        { row, col: col - 1 },
        { row: row + 1, col }
        // { row: row + 1, col: col + 1 },
        // { row: row + 1, col: col - 1 }
    ]
        .map(position => {
            if (position.row < 0) position.row = size - 1
            if (position.col < 0) position.col = size - 1
            if (position.row > size - 1) position.row = 0
            if (position.col > size - 1) position.col = 0
            return position
        })
        .reduce<Tile[]>((tiles, coordinate) => {
            const tile: Tile | undefined = path<Tile>([coordinate.row, coordinate.col], grid)
            return tile ? tiles.concat(tile) : tiles
        }, [])
        .map(prop('terrain'))

type TerrainMultipliers = { [key in TerrainType]: number }

const surroundingTerrainMultiplier: TerrainMultipliers = {
    dirt: 2,
    grass: 3,
    sea: 100,
    desert: 4,
    snow: 4
}

const baseTerrainMultiplier: TerrainMultipliers = {
    dirt: 5,
    grass: 30,
    sea: 1,
    desert: 3,
    snow: 3
}

const getMultipliedTerrain = (terrainMultiplier: TerrainMultipliers) => (terrain: TerrainType): TerrainType[] =>
    repeat(terrain, terrainMultiplier[terrain])

const getTerrainType = (row: number, col: number, grid: Grid, size: number): TerrainType => {
    const surroundingTerrains = getSurroundingTerrains(row, col, grid, size)
    const baseTerrains = Object.keys(terrains) as TerrainType[]

    const multipliedBaseTerrains = flatten<TerrainType>(baseTerrains.map(getMultipliedTerrain(baseTerrainMultiplier)))
    const multipliedSurroundingTerrains = flatten<TerrainType>(surroundingTerrains.map(getMultipliedTerrain(surroundingTerrainMultiplier)))
    return randomFrom([...multipliedBaseTerrains, ...multipliedSurroundingTerrains])
}
