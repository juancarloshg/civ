import { combineReducers } from 'redux'

import { reducer as configurationReducer, ConfigurationState } from './components/configuration/configuration.reducer'
import { reducer as gameReducer, GameState } from './components/game/game.reducer'
import { reducer as playersReducer, PlayersState } from './components/game/player/player.reducer'
import { reducer as gridReducer, GridState } from './components/game/grid'
import { reducer as unitsReducer, UnitsState } from './components/game/units/unit.reducer'
import { reducer as citiesReducer, CitiesState } from './components/game/city/city.reducer'

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
