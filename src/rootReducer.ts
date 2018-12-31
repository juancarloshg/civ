import { combineReducers } from 'redux'

import { reducer as configurationReducer, ConfigurationState } from './core/shared/configuration/configuration.reducer'
import { reducer as gameReducer, GameState } from './core/game.reducer'
import { reducer as playersReducer, PlayersState } from './core/player/player.reducer'
import { reducer as gridReducer, GridState } from './core/grid/grid.reducer'
import { reducer as unitsReducer, UnitsState } from './core/units/unit.reducer'
import { reducer as citiesReducer, CitiesState } from './core/city/city.reducer'

export interface ApplicationState {
    configuration: ConfigurationState
    game: GameState
    players: PlayersState
    grid: GridState
    units: UnitsState
    cities: CitiesState
}

export const rootReducer = combineReducers<ApplicationState>({
    configuration: configurationReducer,
    game: gameReducer,
    players: playersReducer,
    grid: gridReducer,
    units: unitsReducer,
    cities: citiesReducer
})
