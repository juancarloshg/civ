import { PlayersState } from './player.reducer'
import { ApplicationState } from '../../rootReducer'

const getRoot = (state: ApplicationState): PlayersState => state.players

export const getPlayers = getRoot
