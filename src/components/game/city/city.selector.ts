import { ApplicationState } from 'src/rootReducer'
import { CitiesState } from './city.reducer'

const getRoot = (state: ApplicationState): CitiesState => state.cities

export const getCities = getRoot
