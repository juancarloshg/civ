import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from 'src/rootReducer'
import { getSize } from '../configuration/configuration.selector'
import { Grid } from './grid/Grid'

import { TileMatrix, isValidGrid } from './game.helpers'
import { getGrid } from './game.selectors'
import { actions } from './game.actions'

interface StateProps {
    size: number
    grid: TileMatrix
}

interface DispatchProps {
    initGame(): void
}

type GameProps = StateProps & DispatchProps

export class GameBase extends React.Component<GameProps> {
    componentDidMount() {
        this.props.initGame()
    }
    render() {
        const { size, grid } = this.props

        return <div data-testid="game-container">{isValidGrid(grid, size) && <Grid size={size} grid={grid} />}</div>
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    size: getSize,
    grid: getGrid
})

const mapDispatch: DispatchProps = {
    initGame: actions.initGame
}

export const Game = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(GameBase)
