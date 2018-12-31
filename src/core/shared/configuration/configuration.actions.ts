import { Configuration } from './configuration.types'
import { createAction, ActionsUnion } from '../../../utils/actionHelpers'

export enum ActionTypes {
    CONFIGURE_GAME = '[configuration] Configure game'
}

export const actions = {
    configureGame: (configuration: Partial<Configuration>) => createAction(ActionTypes.CONFIGURE_GAME, configuration)
}

export type Actions = ActionsUnion<typeof actions>
