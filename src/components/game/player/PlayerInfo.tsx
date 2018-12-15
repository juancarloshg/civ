import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from 'src/rootReducer'
import { Unit } from '../units/units'
import { TileWithUnits } from '../grid/grid.helpers'

import { actions } from './player.actions'
import { getSelectedUnit, getSelectedTileWithUnits } from './player.selectors'
import { TileInfo } from './TileInfo'
import { UnitInfo } from './UnitInfo'

interface StateProps {
    tile: TileWithUnits | null
    unit: Unit | null
}

interface DispatchProps {
    selectUnit(unit: Unit): void
}

type Props = StateProps & DispatchProps

const PlayerInfoBase: React.SFC<Props> = ({ tile, unit, selectUnit }) => (
    <div>
        <h3>Player 1</h3>
        {tile && <TileInfo tile={tile} selectUnit={selectUnit} />}
        {unit && <UnitInfo unit={unit} />}
    </div>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    tile: getSelectedTileWithUnits,
    unit: getSelectedUnit
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: Unit) => actions.selectUnit(unit.id)
}

export const PlayerInfo = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(PlayerInfoBase)
