import { combineReducers } from 'redux'

import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'
import { reducer as playerReducer, PlayerState } from './components/game/player/player.reducer'
import { reducer as gridReducer, GridState } from './components/game/grid/grid.reducer'
import { reducer as unitsReducer, UnitsState } from './components/game/units/unit.reducer'
import { reducer as citiesReducer, CitiesState } from './components/game/city/city.reducer'

export interface ApplicationState {
    configuration: ConfigurationState
    player: PlayerState
    grid: GridState
    units: UnitsState
    cities: CitiesState
}

export const rootReducer = combineReducers({
    configuration: configurationReducer,
    player: playerReducer,
    grid: gridReducer,
    units: unitsReducer,
    cities: citiesReducer
})
