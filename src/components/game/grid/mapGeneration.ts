import { Grid, Tile } from './grid.types'
import { terrains, TerrainType } from '../terrains/base/terrains'
import { repeat, flatten, path, prop, without } from 'ramda'
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
        { row: row - 1, col: col + 1 },
        { row: row - 1, col: col - 1 },
        { row, col: col + 1 },
        { row, col: col - 1 },
        { row: row + 1, col },
        { row: row + 1, col: col + 1 },
        { row: row + 1, col: col - 1 }
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

const spreadMultiplier: TerrainMultipliers = {
    dirt: 2,
    grass: 15,
    sea: 30,
    desert: 1,
    snow: 1
}

const spawnMultiplier: TerrainMultipliers = {
    dirt: 3,
    grass: 12,
    sea: 2,
    desert: 3,
    snow: 3
}

const excludedNeighbours: { [key in TerrainType]: TerrainType[] } = {
    dirt: ['sea'],
    grass: [],
    sea: ['dirt', 'snow', 'desert'],
    desert: ['sea', 'snow'],
    snow: ['sea', 'desert']
}

const getMultipliedTerrain = (terrainMultiplier: TerrainMultipliers) => (terrain: TerrainType): TerrainType[] =>
    repeat(terrain, terrainMultiplier[terrain])

const getTerrainType = (row: number, col: number, grid: Grid, size: number): TerrainType => {
    const surroundingTerrains = getSurroundingTerrains(row, col, grid, size)
    const baseTerrains = Object.keys(terrains) as TerrainType[]

    const excludedTerrains = flatten<TerrainType>(surroundingTerrains.map(type => excludedNeighbours[type]))
    const filteredBaseTerrains = without(excludedTerrains, baseTerrains)
    const filteredSurroundingTerrains = without(excludedTerrains, surroundingTerrains)

    const multipliedBaseTerrains = flatten<TerrainType>(filteredBaseTerrains.map(getMultipliedTerrain(spawnMultiplier)))
    const multipliedSurroundingTerrains = flatten<TerrainType>(filteredSurroundingTerrains.map(getMultipliedTerrain(spreadMultiplier)))
    return randomFrom([...multipliedBaseTerrains, ...multipliedSurroundingTerrains])
}
