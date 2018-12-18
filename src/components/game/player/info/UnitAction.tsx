import * as React from 'react'
import { connect } from 'react-redux'

import { UnitActionType, unitActionDescriptions, Unit } from '../../units/units'
import { actions as unitActions } from '../../units/unit.actions'

interface OwnProps {
    unit: Unit
    action: UnitActionType
}

interface DispatchProps {
    playerAction(unit: Unit, action: UnitActionType): void
}

type UnitActionProps = OwnProps & DispatchProps

const UnitActionBase: React.SFC<UnitActionProps> = ({ unit, action, playerAction }) => (
    <button disabled={!unit.movementsLeft} onClick={() => playerAction(unit, action)}>
        {unitActionDescriptions[action]}
    </button>
)

const mapDispatch: DispatchProps = {
    playerAction: (unit: Unit, action: UnitActionType) => unitActions.unitAction(unit, action)
}

export const UnitAction = connect<{}, DispatchProps, OwnProps>(
    null,
    mapDispatch
)(UnitActionBase)
