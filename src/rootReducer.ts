import { combineReducers } from 'redux'

import { reducer as menuReducer, MenuState } from './components/menu/menu.reducer'
import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'
import { reducer as gridReducer, GridState } from './components/grid/grid.reducer'

export interface ApplicationState {
    menu: MenuState
    configuration: ConfigurationState
    grid: GridState
}

export const rootReducer = combineReducers({
    menu: menuReducer,
    configuration: configurationReducer,
    grid: gridReducer
})
