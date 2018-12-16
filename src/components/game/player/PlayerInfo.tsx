import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from 'src/rootReducer'
import { Unit } from '../units/units'
import { TileWithUnits } from '../grid/grid.helpers'

import { actions } from './player.actions'
import { getSelectedUnit, getSelectedTileWithUnits, getTurn } from './player.selectors'
import { TileInfo } from './TileInfo'
import { UnitInfo } from './UnitInfo'

interface StateProps {
    tile: TileWithUnits | null
    unit: Unit | null
    turn: number
}

interface DispatchProps {
    selectUnit(unit: Unit): void
    nextTurn(): void
}

type Props = StateProps & DispatchProps

const PlayerInfoBase: React.SFC<Props> = ({ tile, unit, selectUnit, turn, nextTurn }) => (
    <div>
        <h3>Player 1</h3>
        {tile && <TileInfo tile={tile} selectUnit={selectUnit} />}
        {unit && <UnitInfo unit={unit} />}
        Turn {turn}
        <br />
        <button onClick={() => nextTurn()}>Next Turn</button>
    </div>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    tile: getSelectedTileWithUnits,
    unit: getSelectedUnit,
    turn: getTurn
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: Unit) => actions.selectUnit(unit.id),
    nextTurn: () => actions.nextTurn()
}

export const PlayerInfo = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(PlayerInfoBase)
