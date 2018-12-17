import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ApplicationState } from '../../../rootReducer'
import { actions } from './player.actions'
import { getAnyMovesLeft } from './player.selectors'

interface StateProps {
    movesLeft: boolean
}

interface DispatchProps {
    nextTurn(): void
}

type Props = StateProps & DispatchProps

type StyledNextTurnButtonProps = Pick<Props, 'movesLeft'>
const getBackgroundColor = ({ movesLeft }: StyledNextTurnButtonProps) => (movesLeft ? 'green' : 'red')

const StyledNextTurnButton = styled.button<StyledNextTurnButtonProps>`
    color: white;
    background: ${getBackgroundColor};
    padding: 20px;
`

const NextTurnBase: React.SFC<Props> = ({ nextTurn, movesLeft }) => (
    <StyledNextTurnButton movesLeft={movesLeft} onClick={() => nextTurn()}>
        Next Turn
    </StyledNextTurnButton>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    movesLeft: getAnyMovesLeft
})

const mapDispatch: DispatchProps = {
    nextTurn: () => actions.nextTurn()
}

export const NextTurn = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(NextTurnBase)
