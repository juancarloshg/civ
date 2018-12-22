import { createSelector } from 'reselect'

import { ApplicationState } from '../../../rootReducer'
import { getPlayers } from '../player/player.selectors'
import { UnitsState } from './unit.reducer'
import { ExtendedUnit, Unit } from './unit.types'

const getRoot = (state: ApplicationState): UnitsState => state.units

export const getUnits = getRoot

export const getExtendedUnits = createSelector(
    getUnits,
    getPlayers,
    (units, players): ExtendedUnit[] => {
        return players.reduce((extendedUnits, player) => {
            const extendedPlayerUnits: ExtendedUnit[] = player.unitIds.map(unitId => {
                const baseUnit: Unit = units.find(u => u.id === unitId)!
                return { ...baseUnit, owner: player }
            })
            return [...extendedUnits, ...extendedPlayerUnits]
        }, [])
    }
)
