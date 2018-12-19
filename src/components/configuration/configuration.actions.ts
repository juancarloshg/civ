import { createAction, ActionsUnion } from '../../utils/actionHelpers'
import { Configuration } from './configuration.types'

export enum ActionTypes {
    CONFIGURE_GAME = '[configuration] Configure game'
}

export const actions = {
    configureGame: (configuration: Partial<Configuration>) => createAction(ActionTypes.CONFIGURE_GAME, configuration)
}

export type Actions = ActionsUnion<typeof actions>
