import { City } from './city.types'
import { Player } from '../game.types'
import { createAction, ActionsUnion } from '../../utils/actionHelpers'
import { GridPosition } from '../shared/shared.types'

export enum ActionTypes {
    ADD_CITY = '[city] add city',
    CREATE_CITY = '[city] create city',
    BUILD = '[city] build'
}

export const actions = {
    addCity: (city: City) => createAction(ActionTypes.ADD_CITY, city),
    createCity: (position: GridPosition, owner: Player) => createAction(ActionTypes.CREATE_CITY, { owner, position }),
    build: (city: City, buildKey: string) => createAction(ActionTypes.BUILD, { city, buildKey })
}

export type Actions = ActionsUnion<typeof actions>
