import { GridPosition } from '../grid/grid.types'
import { Yield } from '../yield/Yield'

export interface City {
    position: GridPosition
    ownedTiles: GridPosition[]
}

export interface ExtendedCity extends City {
    yield: Yield
}
