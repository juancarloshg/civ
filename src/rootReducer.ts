import { combineReducers } from 'redux'

import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'
import { reducer as gameReducer, GameState } from './components/game/game.reducer'
import { reducer as playerReducer, PlayerState } from './components/game/player/player.reducer'
import { reducer as gridReducer, GridState } from './components/game/grid/grid.reducer'

export interface ApplicationState {
    configuration: ConfigurationState
    game: GameState
    player: PlayerState
    grid: GridState
}

export const rootReducer = combineReducers({
    configuration: configurationReducer,
    game: gameReducer,
    player: playerReducer,
    grid: gridReducer
})
