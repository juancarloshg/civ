import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { ConfigurationState } from './configuration.reducer'

export enum ActionTypes {
    CONFIGURE_GAME = '[configuration] Configure game'
}

export const actions = {
    configureGame: (configuration: Partial<ConfigurationState>) => createAction(ActionTypes.CONFIGURE_GAME, configuration)
}

export type Actions = ActionsUnion<typeof actions>
