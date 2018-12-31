import { UnitsState } from './unit.reducer'
import { ApplicationState } from '../../rootReducer'

const getRoot = (state: ApplicationState): UnitsState => state.units

export const getUnits = getRoot
