import { combineReducers } from 'redux'

import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'
import { reducer as gridReducer, GridState } from './components/grid/grid.reducer'

export interface ApplicationState {
    configuration: ConfigurationState
    grid: GridState
}

export const rootReducer = combineReducers({
    configuration: configurationReducer,
    grid: gridReducer
})
