import { createAction, ActionsUnion } from '../../../utils/actionHelpers'
import { GridPosition } from '../grid'
import { City } from './city.types'
import { Player } from '../game.types'

export enum ActionTypes {
    ADD_CITY = '[city] add city',
    CREATE_CITY = '[city] create city'
}

export const actions = {
    addCity: (city: City) => createAction(ActionTypes.ADD_CITY, city),
    createCity: (position: GridPosition, owner: Player) => createAction(ActionTypes.CREATE_CITY, { owner, position })
}

export type Actions = ActionsUnion<typeof actions>
