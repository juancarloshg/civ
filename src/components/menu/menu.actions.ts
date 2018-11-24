import { createAction, ActionsUnion } from 'src/utils/actionHelpers'

export enum ActionTypes {
    HELLO_WORLD = '[menu] hello world',
    HELLO_WORLD_SUCCESS = '[menu] hello world success'
}

export const actions = {
    helloWorld: (message: string) => createAction(ActionTypes.HELLO_WORLD, { message }),
    helloWorldSuccess: () => createAction(ActionTypes.HELLO_WORLD_SUCCESS)
}

export type Actions = ActionsUnion<typeof actions>
