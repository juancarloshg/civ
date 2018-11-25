import { createAction, ActionsUnion, ActionWithPayload } from 'src/utils/actionHelpers'

export enum ActionTypes {
    KEYDOWN = '[keys] keydown'
}

export type KeydownAction = ActionWithPayload<ActionTypes.KEYDOWN, { key: string }>

export const actions = {
    keydown: (key: string) => createAction(ActionTypes.KEYDOWN, { key })
}

export type Actions = ActionsUnion<typeof actions>
