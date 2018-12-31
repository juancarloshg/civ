import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from '../rootReducer'

import { KeyListener } from '../components/KeyListener'

import { actions } from '../core/game.actions'
import { ExtendedGrid, Size } from '../core/shared/shared.types'
import { getMainViewGrid } from '../core/shared/shared.selectors'
import { getIsGridReady } from '../core/grid/grid.selectors'
import { getViewSize } from '../core/shared/configuration/configuration.selector'
import { ViewGrid } from '../components/viewGrid/ViewGrid'
import { MainInfo } from '../components/info/MainInfo'

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
            <div data-testid="game-container">
                {isGridReady && (
                    <KeyListener>
                        <ViewGrid size={size} viewGrid={viewGrid} />
                        <MainInfo />
                    </KeyListener>
                )}
            </div>
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
