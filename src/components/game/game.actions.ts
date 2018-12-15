import { createAction, ActionsUnion } from 'src/utils/actionHelpers'

export enum ActionTypes {
    INIT_GAME = '[game] init game'
}

export const actions = {
    initGame: () => createAction(ActionTypes.INIT_GAME)
}

export type Actions = ActionsUnion<typeof actions>
