import * as React from 'react'
import styled from 'styled-components'

import { repeat } from '../../utils/utils'
import { TileMatrix, Tile as TileType, isValidGrid } from './grid.helpers'
import { Tile } from './tile/Tile'
import { getSize } from '../configuration/configuration.selector'
import { createStructuredSelector } from 'reselect'
import { ApplicationState } from 'src/rootReducer'
import { actions } from './grid.actions'
import { getGrid } from './grid.selectors'
import { connect } from 'react-redux'

const StyledSquaresRow = styled.span`
    display: flex;
`

interface SquaresRowProps {
    length: number
    row: number
    tiles: TileType[]
}

const TilesRow: React.FunctionComponent<SquaresRowProps> = ({ length, row, tiles }) => (
    <StyledSquaresRow data-testid="grid-row">
        {repeat(length, col => (
            <Tile key={`row${row}col${col}`} terrain={tiles[col].terrain} terrainModifiers={['plain']} units={[]} />
        ))}
    </StyledSquaresRow>
)

interface StateProps {
    size: number
    grid: TileMatrix
}

interface DispatchProps {
    generateMap(): void
}

type GridProps = StateProps & DispatchProps
class GridBase extends React.Component<GridProps> {
    componentDidMount() {
        this.props.generateMap()
    }

    render() {
        const { size, grid } = this.props
        return !isValidGrid(grid, size) ? null : (
            <div data-testid="game-grid">
                {repeat(size, row => (
                    <TilesRow key={`row${row}`} length={size} row={row} tiles={grid[row]} />
                ))}
            </div>
        )
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    size: getSize,
    grid: getGrid
})

const mapDispatch: DispatchProps = {
    generateMap: actions.initGrid
}

export const Grid = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(GridBase)
