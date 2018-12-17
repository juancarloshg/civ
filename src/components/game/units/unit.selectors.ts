import { ApplicationState } from '../../../rootReducer'
import { UnitsState } from './unit.reducer'

const getRoot = (state: ApplicationState): UnitsState => state.units

export const getUnits = getRoot
