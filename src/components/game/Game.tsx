import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from '../../rootReducer'

import { FlexContainer } from '../styled/FlexContainer'
import { KeyListener } from '../keys/KeyListener'

import { ViewGrid } from './grid/ViewGrid'
import { getIsGridReady, getMainViewGrid } from './grid/grid.selectors'
import { PlayerInfo } from './player/info/PlayerInfo'

import { actions } from './game.actions'
import { Tile } from './grid/tile/Tile'
import { getViewSize } from '../configuration/configuration.selector'
import { Size } from '../configuration/configuration.reducer'
import { ExtendedGrid } from './grid/grid.helpers'

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
                        <ViewGrid size={size} viewGrid={viewGrid} tileComponent={Tile} />
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
