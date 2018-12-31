import * as React from 'react'
import styled from 'styled-components'

import { ExtendedTile, ExtendedGrid, Size } from '../../core/shared/shared.types'
import { FlexContainer } from '../styled/FlexContainer'
import { repeat } from '../../utils/utils'
import { squareSize } from '../../core/grid/constants'
import { Tile } from './tile/Tile'

const ViewGridWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 100%;
    width: 100%;
`

interface TileRowProps {
    length: number
    tiles: ExtendedTile[]
}

const TileRow: React.FunctionComponent<TileRowProps> = ({ length, tiles }) => (
    <FlexContainer basis={squareSize.height} grow={1} data-testid="grid-row">
        {repeat(length, (col: number) => {
            const tile = tiles[col]
            return <Tile key={tile.id} tile={tile} />
        })}
    </FlexContainer>
)

interface OwnProps {
    size: Size
    viewGrid: ExtendedGrid
}

type GridProps = OwnProps

export const ViewGrid: React.FunctionComponent<GridProps> = ({ size, viewGrid }) => (
    <ViewGridWrapper data-testid="game-grid">
        {repeat(size.height, (row: number) => {
            const realRow = viewGrid[row][0].row
            return <TileRow key={`row${realRow}`} length={size.width} tiles={viewGrid[row]} />
        })}
    </ViewGridWrapper>
)
