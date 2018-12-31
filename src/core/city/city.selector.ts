import { CitiesState } from './city.reducer'
import { ApplicationState } from '../../rootReducer'

const getRoot = (state: ApplicationState): CitiesState => state.cities

export const getCities = getRoot
