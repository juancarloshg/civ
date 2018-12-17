import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from '../../../rootReducer'
import { Unit } from '../units/units'
import { ExtendedTile } from '../grid/grid.helpers'

import { actions } from './player.actions'
import { getSelectedUnit, getSelectedExtendedTile, getTurn } from './player.selectors'
import { TileInfo } from './TileInfo'
import { UnitInfo } from './UnitInfo'
import { NextTurn } from './NextTurn'
import { FlexContainer } from '../../styled/FlexContainer'
import styled from 'styled-components'

interface StateProps {
    tile: ExtendedTile | null
    unit: Unit | null
    turn: number
}

interface DispatchProps {
    selectUnit(unit: Unit): void
}

type Props = StateProps & DispatchProps

const StyledFlexContainer = styled(FlexContainer)`
    border: 5px solid black;
    background: #596869;
    color: white;
    padding: 10px;
`

const PlayerInfoBase: React.SFC<Props> = ({ tile, unit, selectUnit, turn }) => (
    <StyledFlexContainer grow={1}>
        <FlexContainer direction="column" grow={1} basis={`${1 / 3}%`}>
            <h3>Player 1</h3>
        </FlexContainer>
        <FlexContainer direction="column" grow={1} basis={`${1 / 3}%`}>
            {tile && <TileInfo tile={tile} selectUnit={selectUnit} />}
            {unit && <UnitInfo unit={unit} />}
        </FlexContainer>
        <FlexContainer direction="column" grow={1} basis={`${1 / 3}%`}>
            <NextTurn />
            <h3>Turn {turn}</h3>
        </FlexContainer>
    </StyledFlexContainer>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    tile: getSelectedExtendedTile,
    unit: getSelectedUnit,
    turn: getTurn
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: Unit) => actions.selectUnit(unit.id)
}

export const PlayerInfo = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(PlayerInfoBase)
