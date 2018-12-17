import { createAction, ActionsUnion } from '../../utils/actionHelpers'

export enum ActionTypes {
    KEYDOWN = '[keys] keydown'
}

export const actions = {
    keydown: (key: string) => createAction(ActionTypes.KEYDOWN, { key })
}

export type Actions = ActionsUnion<typeof actions>
