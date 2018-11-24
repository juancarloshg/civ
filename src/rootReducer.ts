import { combineReducers } from 'redux'

import { reducer as menuReducer, MenuState } from './components/menu/menu.reducer'
import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'

export interface ApplicationState {
    menu: MenuState
    configuration: ConfigurationState
}

export const rootReducer = combineReducers({
    menu: menuReducer,
    configuration: configurationReducer
})
