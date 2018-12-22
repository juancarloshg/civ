import { City } from './city.types'
import { Tile, getTileByGridAndPosition, getTileYield, Grid } from '../grid'
import { addYields, EMPTY_YIELD } from '../yield/Yield'

export function getCityTilesYield(city: City, grid: Grid) {
    const tiles: (Tile | null)[] = city.ownedTiles.map(tilePosition => getTileByGridAndPosition(grid, tilePosition))
    return tiles.reduce((totalYield, tile) => addYields(totalYield, tile ? getTileYield(tile) : EMPTY_YIELD), EMPTY_YIELD)
}
