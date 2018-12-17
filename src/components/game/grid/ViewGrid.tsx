import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from '../../../rootReducer'
import { repeat } from '../../../utils/utils'
import { FlexContainer } from '../../styled/FlexContainer'
import { getViewSize } from '../../configuration/configuration.selector'
import { Size } from '../../configuration/configuration.reducer'

import { Tile } from './tile/Tile'
import { ExtendedTile, ExtendedGrid } from './grid.helpers'
import { getViewGrid } from './grid.selectors'
import { squareSize } from './constants'

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

interface StateProps {
    size: Size
    viewGrid: ExtendedGrid
}

type GridProps = StateProps

const ViewGridBase: React.FunctionComponent<GridProps> = ({ size, viewGrid }) => (
    <FlexContainer direction="column" data-testid="game-grid">
        {repeat(size.height, (row: number) => {
            const realRow = viewGrid[row][0].row
            return <TileRow key={`row${realRow}`} length={size.width} tiles={viewGrid[row]} />
        })}
    </FlexContainer>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    size: getViewSize,
    viewGrid: getViewGrid
})

export const ViewGrid = connect<StateProps>(mapState)(ViewGridBase)
