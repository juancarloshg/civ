import * as React from 'react'
import { connect } from 'react-redux'

import { actions as unitActions } from '../../core/units/unit.actions'
import { ExtendedUnit } from '../../core/shared/shared.types'
import { UnitActionType, Unit } from '../../core/units/unit.types'
import { unitActionDescriptions } from '../../core/units/units'

interface OwnProps {
    unit: ExtendedUnit
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
    playerAction: (unit: ExtendedUnit, action: UnitActionType) => unitActions.unitAction(unit, action)
}

export const UnitAction = connect<{}, DispatchProps, OwnProps>(
    null,
    mapDispatch
)(UnitActionBase)
