import * as React from 'react'
import styled from 'styled-components'

import { repeat } from 'src/utils/utils'
import { Tile as ITile } from '../game.helpers'
import { Tile } from './tile/Tile'
import { createStructuredSelector } from 'reselect'
import { ApplicationState } from 'src/rootReducer'
import { getViewGrid } from '../game.selectors'
import { connect } from 'react-redux'
import { getViewSize } from 'src/components/configuration/configuration.selector'
import { ViewGrid } from '../game.reducer'

const StyledTileRow = styled.span`
    display: flex;
`

interface TileRowProps {
    length: number
    row: number
    tiles: ITile[]
}

const TileRow: React.FunctionComponent<TileRowProps> = ({ length, row, tiles }) => (
    <StyledTileRow data-testid="grid-row">
        {repeat(length, (col: number) => (
            <Tile key={`row${row}col${col}`} terrain={tiles[col].terrain} terrainModifiers={['plain']} units={[]} />
        ))}
    </StyledTileRow>
)

interface StateProps {
    size: number
    viewGrid: ViewGrid
}

type GridProps = StateProps

const GridBase: React.FunctionComponent<GridProps> = ({ size, viewGrid }) => (
    <div data-testid="game-grid">
        {repeat(size, (row: number) => (
            <TileRow key={`row${row}`} length={size} row={row} tiles={viewGrid.grid[row]} />
        ))}
    </div>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    size: getViewSize,
    viewGrid: getViewGrid
})

export const Grid = connect<StateProps>(mapState)(GridBase)
