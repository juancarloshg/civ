import { createAction, ActionsUnion } from '../../utils/actionHelpers'

export enum ActionTypes {
    KEYDOWN = '[keys] keydown',
    WHEEL = '[keys] wheel'
}

export const actions = {
    keydown: (key: string) => createAction(ActionTypes.KEYDOWN, { key }),
    wheel: (direction: 'in' | 'out') => createAction(ActionTypes.WHEEL, { direction })
}

export type Actions = ActionsUnion<typeof actions>
