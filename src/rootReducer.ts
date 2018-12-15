import { combineReducers } from 'redux'

import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'
import { reducer as playerReducer, PlayerState } from './components/game/player/player.reducer'
import { reducer as gridReducer, GridState } from './components/game/grid/grid.reducer'
import { reducer as unitsReducer, UnitsState } from './components/game/units/unit.reducer'

export interface ApplicationState {
    configuration: ConfigurationState
    player: PlayerState
    grid: GridState
    units: UnitsState
}

export const rootReducer = combineReducers({
    configuration: configurationReducer,
    player: playerReducer,
    grid: gridReducer,
    units: unitsReducer
})
