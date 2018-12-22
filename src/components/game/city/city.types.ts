import { GridPosition } from '../grid/grid.types'

export interface City {
    position: GridPosition
    ownedTiles: GridPosition[]
}
