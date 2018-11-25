import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from 'src/rootReducer'
import { Grid } from './grid/Grid'

import { getIsGridReady } from './game.selectors'
import { actions } from './game.actions'

interface StateProps {
    isGridReady: boolean
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
        const { isGridReady } = this.props

        return <div data-testid="game-container">{isGridReady && <Grid />}</div>
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    isGridReady: getIsGridReady
})

const mapDispatch: DispatchProps = {
    initGame: actions.initGame
}

export const Game = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(GameBase)
