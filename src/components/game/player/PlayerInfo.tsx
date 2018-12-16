import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from 'src/rootReducer'
import { Unit } from '../units/units'
import { ExtendedTile } from '../grid/grid.helpers'

import { actions } from './player.actions'
import { getSelectedUnit, getSelectedExtendedTile, getTurn } from './player.selectors'
import { TileInfo } from './TileInfo'
import { UnitInfo } from './UnitInfo'
import { NextTurn } from './NextTurn'

interface StateProps {
    tile: ExtendedTile | null
    unit: Unit | null
    turn: number
}

interface DispatchProps {
    selectUnit(unit: Unit): void
}

type Props = StateProps & DispatchProps

const PlayerInfoBase: React.SFC<Props> = ({ tile, unit, selectUnit, turn }) => (
    <div>
        <h3>Player 1</h3>
        {tile && <TileInfo tile={tile} selectUnit={selectUnit} />}
        {unit && <UnitInfo unit={unit} />}
        <p>Turn {turn}</p>
        <br />
        <br />
        <NextTurn />
    </div>
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
