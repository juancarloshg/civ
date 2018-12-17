import { createAction, ActionsUnion } from '../../../utils/actionHelpers'
import { City } from './city.reducer'

export enum ActionTypes {
    ADD_CITY = '[city] add city'
}

export const actions = {
    addCity: (city: City) => createAction(ActionTypes.ADD_CITY, city)
}

export type Actions = ActionsUnion<typeof actions>
