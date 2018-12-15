import * as React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { ApplicationState } from 'src/rootReducer'
import { Unit } from '../units/units'
import { TileWithUnits } from '../grid/grid.helpers'

import { actions } from './player.actions'
import { getSelectedUnit, getSelectedTileWithUnits } from './player.selectors'

interface StateProps {
    tile: TileWithUnits | null
    unit: Unit | null
}

interface DispatchProps {
    selectUnit(unit: Unit): void
}

type Props = StateProps & DispatchProps

const PlayerControlsBase: React.SFC<Props> = ({ tile, unit, selectUnit }) => (
    <div>
        <h3>Player 1</h3>
        {tile && (
            <>
                <p>
                    Selected tile [{tile.row}, {tile.col}]
                </p>
                <br />
                <p>Tile details:</p>
                <p>Terrain - {tile.terrain}</p>
                <br />
                {tile.units.length > 0 && (
                    <>
                        <p>Units:</p>
                        {tile.units.map((u, i) => (
                            <p key={i}>
                                {u.type} - {u.currentHp}/{u.hp} - <span onClick={() => selectUnit(u)}>USE</span>
                            </p>
                        ))}
                        <br />
                    </>
                )}
                {unit && (
                    <p>
                        Selected unit: {unit.type}. Movements: {unit.movementsLeft}/{unit.movement}
                    </p>
                )}
            </>
        )}
    </div>
)

const mapState = createStructuredSelector<ApplicationState, StateProps>({
    tile: getSelectedTileWithUnits,
    unit: getSelectedUnit
})

const mapDispatch: DispatchProps = {
    selectUnit: (unit: Unit) => actions.selectUnit(unit.id)
}

export const PlayerControls = connect<StateProps, DispatchProps>(
    mapState,
    mapDispatch
)(PlayerControlsBase)
