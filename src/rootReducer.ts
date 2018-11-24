import { combineReducers } from 'redux'

import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'
import { reducer as gameReducer, GameState } from './components/game/game.reducer'

export interface ApplicationState {
    configuration: ConfigurationState
    game: GameState
}

export const rootReducer = combineReducers({
    configuration: configurationReducer,
    game: gameReducer
})
