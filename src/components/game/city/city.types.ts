import { GridPosition } from '../grid/grid.types'

export interface City {
    id: string
    position: GridPosition
    ownedTiles: GridPosition[]
}
