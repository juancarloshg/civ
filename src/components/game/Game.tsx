import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from '../../rootReducer'

import { FlexContainer } from '../styled/FlexContainer'
import { KeyListener } from '../keys/KeyListener'
import { getViewSize } from '../configuration/configuration.selector'
import { Size } from '../configuration/configuration.types'

import { getIsGridReady, getMainViewGrid, ExtendedGrid } from './grid'
import { PlayerInfo } from './player/info/PlayerInfo'
import { actions } from './game.actions'
import { ViewGrid } from './grid/ViewGrid'

interface StateProps {
    isGridReady: boolean
    size: Size
    viewGrid: ExtendedGrid
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
        const { isGridReady, size, viewGrid } = this.props

        return (
            <FlexContainer cssHeight="100vh" direction="column" data-testid="game-container">
                {isGridReady && (
                    <KeyListener>
                        <ViewGrid size={size} viewGrid={viewGrid} />
                        <PlayerInfo />
                    </KeyListener>
                )}
            </FlexContainer>
        )
    }
}

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    isGridReady: getIsGridReady,
    size: getViewSize,
    viewGrid: getMainViewGrid
})

const mapDispatch: DispatchProps = {
    initGame: actions.initGame
}

export const Game = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(GameBase)
