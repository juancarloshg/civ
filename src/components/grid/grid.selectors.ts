import { ApplicationState } from 'src/rootReducer'

const getRoot = (state: ApplicationState) => state.grid

export const getGrid = getRoot
