import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from '../../rootReducer'

import { FlexDiv } from '../styled/FlexDiv'
import { KeyListener } from '../keys/KeyListener'

import { ViewGrid } from './grid/ViewGrid'
import { getIsGridReady } from './grid/grid.selectors'
import { PlayerInfo } from './player/PlayerInfo'

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

        return (
            <FlexDiv data-testid="game-container">
                {isGridReady && (
                    <KeyListener>
                        <ViewGrid />
                        <PlayerInfo />
                    </KeyListener>
                )}
            </FlexDiv>
        )
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
