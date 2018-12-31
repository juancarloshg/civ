interface GridPosition {
    row: number
    col: number
}

export interface City {
    id: string
    position: GridPosition
    ownedTiles: GridPosition[]
}

export interface Progress {
    key: string
    current: number
    total: number
    perTurn?: number
}
