import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { ApplicationState } from '../../../rootReducer'
import { FlexContainer } from '../../styled/FlexContainer'
import { getSize } from '../../configuration/configuration.selector'
import { Unit } from '../units/units'
import { ExtendedTile, Grid } from '../grid/grid.helpers'
import { BaseStyledTile } from '../grid/tile/StyledTile'
import { ViewGrid } from '../grid/ViewGrid'
import { getGrid } from '../grid/grid.selectors'

import { actions } from './player.actions'
import { getSelectedUnit, getSelectedExtendedTile, getTurn } from './player.selectors'
import { TileInfo } from './TileInfo'
import { UnitInfo } from './UnitInfo'
import { NextTurn } from './NextTurn'

const StyledFlexContainer = styled(FlexContainer)`
    border: 5px solid black;
    background: #596869;
    color: white;
    padding: 10px;
`

interface StateProps {
    tile: ExtendedTile | null
    unit: Unit | null
    turn: number
    viewGrid: Grid
    size: number
}

interface DispatchProps {
    selectUnit(unit: Unit): void
}

type Props = StateProps & DispatchProps

const PlayerInfoBase: React.SFC<Props> = ({ tile, unit, selectUnit, turn, size, viewGrid }) => (
    <StyledFlexContainer grow={1} basis="0">
        <FlexContainer direction="column" grow={1} basis={`${1 / 3}%`}>
            <h3>Player 1</h3>
        </FlexContainer>
        <FlexContainer direction="column" grow={1} basis={`${1 / 3}%`}>
            {tile && <TileInfo tile={tile} selectUnit={selectUnit} />}
            {unit && <UnitInfo unit={unit} />}
        </FlexContainer>
        <FlexContainer direction="column" grow={1} basis={`${1 / 3}%`}>
            <div>
                <NextTurn />
                <h3>Turn {turn}</h3>
            </div>
            <ViewGrid tileComponent={BaseStyledTile} size={{ height: size, width: size }} viewGrid={viewGrid} />
        </FlexContainer>
    </StyledFlexContainer>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    tile: getSelectedExtendedTile,
    unit: getSelectedUnit,
    turn: getTurn,
    viewGrid: getGrid,
    size: getSize
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: Unit) => actions.selectUnit(unit.id)
}

export const PlayerInfo = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(PlayerInfoBase)
