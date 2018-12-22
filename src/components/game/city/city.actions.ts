import { createAction, ActionsUnion } from '../../../utils/actionHelpers'
import { GridPosition } from '../grid'
import { City } from './city.types'

export enum ActionTypes {
    ADD_CITY = '[city] add city',
    CREATE_CITY = '[city] create city'
}

export const actions = {
    addCity: (city: City) => createAction(ActionTypes.ADD_CITY, city),
    createCity: (position: GridPosition) => createAction(ActionTypes.CREATE_CITY, position)
}

export type Actions = ActionsUnion<typeof actions>
