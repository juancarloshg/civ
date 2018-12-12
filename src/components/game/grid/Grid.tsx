import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { repeat } from 'src/utils/utils'
import { FlexDiv } from 'src/components/styled/FlexDiv'
import { getViewSize } from 'src/components/configuration/configuration.selector'

import { Tile } from './tile/Tile'
import { Tile as ITile } from './grid.helpers'
import { ViewGrid } from './grid.reducer'
import { getViewGrid } from './grid.selectors'

interface TileRowProps {
    length: number
    tiles: ITile[]
}

const TileRow: React.FunctionComponent<TileRowProps> = ({ length, tiles }) => (
    <FlexDiv data-testid="grid-row">
        {repeat(length, (col: number) => {
            const tile = tiles[col]
            return <Tile key={tile.id} tile={tile} />
        })}
    </FlexDiv>
)

interface StateProps {
    size: number
    viewGrid: ViewGrid
}

type GridProps = StateProps

const GridBase: React.FunctionComponent<GridProps> = ({ size, viewGrid }) => (
    <div data-testid="game-grid">
        {repeat(size, (row: number) => {
            const realRow = viewGrid.grid[row][0].row
            return <TileRow key={`row${realRow}`} length={size} tiles={viewGrid.grid[row]} />
        })}
    </div>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    size: getViewSize,
    viewGrid: getViewGrid
})

export const Grid = connect<StateProps>(mapState)(GridBase)
