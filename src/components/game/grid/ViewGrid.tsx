import * as React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from 'src/rootReducer'
import { repeat } from 'src/utils/utils'
import { FlexDiv } from 'src/components/styled/FlexDiv'
import { getViewSize } from 'src/components/configuration/configuration.selector'

import { Tile } from './tile/Tile'
import { ExtendedTile, ExtendedGrid } from './grid.helpers'
import { getViewGrid } from './grid.selectors'

interface TileRowProps {
    length: number
    tiles: ExtendedTile[]
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
    viewGrid: ExtendedGrid
}

type GridProps = StateProps

const ViewGridBase: React.FunctionComponent<GridProps> = ({ size, viewGrid }) => (
    <div data-testid="game-grid">
        {repeat(size, (row: number) => {
            const realRow = viewGrid[row][0].row
            return <TileRow key={`row${realRow}`} length={size} tiles={viewGrid[row]} />
        })}
    </div>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    size: getViewSize,
    viewGrid: getViewGrid
})

export const ViewGrid = connect<StateProps>(mapState)(ViewGridBase)
