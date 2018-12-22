import { ApplicationState } from '../../../rootReducer'
import { PlayersState } from './player.reducer'

const getRoot = (state: ApplicationState): PlayersState => state.players

export const getPlayers = getRoot
