import { createAction, ActionsUnion } from '../utils/actionHelpers'
import { Unit } from './units/unit.types'

export enum ActionTypes {
    KEYDOWN = '[user] keydown',
    WHEEL = '[user] wheel',
    SELECT_UNIT = '[user] select unit',
    SELECT_TILE = '[user] select tile'
}

export const actions = {
    keydown: (key: string) => createAction(ActionTypes.KEYDOWN, { key }),
    wheel: (direction: 'in' | 'out') => createAction(ActionTypes.WHEEL, { direction }),
    selectUnit: (unitId: Unit | null) => createAction(ActionTypes.SELECT_UNIT, unitId),
    selectTile: (tileId: string) => createAction(ActionTypes.SELECT_TILE, tileId)
}

export type Actions = ActionsUnion<typeof actions>
