import { flatten } from 'ramda'
import { terrains } from '../shared/terrains/base/terrains'
import { terrainModifiers } from '../shared/terrains/modifiers/terrainModifiers'

import { Tile, Grid } from './grid.types'
import { Yield, addPartialYields, EMPTY_YIELD } from '../shared/yield/Yield'
import { GridPosition } from '../shared/shared.types'

export const getTileYield = (tile: Tile): Yield => {
    const modifiersYield = tile.terrainModifiers.reduce(
        (totalYield, terrainModifier) => addPartialYields(totalYield, terrainModifiers[terrainModifier].yield),
        EMPTY_YIELD
    )
    return addPartialYields(terrains[tile.terrain].yield, modifiersYield)
}

export const getTileByGridAndPosition = (grid: Grid, position: GridPosition): Tile | null => {
    return flatten(grid).find(tile => tile.row === position.row && tile.col === position.col) || null
}
