import { Actions, ActionTypes } from './city.actions'
import { City } from './city.types'

export type CitiesState = City[]

const initialState: CitiesState = []

export const reducer = (state: CitiesState = initialState, action: Actions): CitiesState => {
    switch (action.type) {
        case ActionTypes.ADD_CITY:
            return [...state, action.payload]
        default:
            return state
    }
}
