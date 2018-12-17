import * as React from 'react'

import { repeat } from '../../../utils/utils'
import { FlexContainer } from '../../styled/FlexContainer'
import { Size } from '../../configuration/configuration.reducer'

import { ExtendedTile, ExtendedGrid, Tile, Grid } from './grid.helpers'
import { squareSize } from './constants'

type ITileComponent = React.ComponentType<{ tile: ExtendedTile | Tile }>

interface TileRowProps {
    length: number
    tiles: Tile[] | ExtendedTile[]
    tileComponent: ITileComponent
}

const TileRow: React.FunctionComponent<TileRowProps> = ({ length, tiles, tileComponent: TileComponent }) => (
    <FlexContainer basis={squareSize.height} grow={1} data-testid="grid-row">
        {repeat(length, (col: number) => {
            const tile = tiles[col]
            return <TileComponent key={tile.id} tile={tile} />
        })}
    </FlexContainer>
)

interface OwnProps {
    tileComponent: ITileComponent
    size: Size
    viewGrid: ExtendedGrid | Grid
}

type GridProps = OwnProps

export const ViewGrid: React.FunctionComponent<GridProps> = ({ size, viewGrid, tileComponent }) => (
    <FlexContainer direction="column" data-testid="game-grid">
        {repeat(size.height, (row: number) => {
            const realRow = viewGrid[row][0].row
            return <TileRow key={`row${realRow}`} tileComponent={tileComponent} length={size.width} tiles={viewGrid[row]} />
        })}
    </FlexContainer>
)
