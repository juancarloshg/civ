import { createAction, ActionsUnion } from 'src/utils/actionHelpers'
import { TerrainType } from 'src/components/game/terrains/base/terrains'
import { TerrainModifierType } from 'src/components/game/terrains/modifiers/terrainModifiers'

export enum ActionTypes {
    INIT_TILE = 'Init tile'
}

export const actions = {
    initTile: (row: number, col: number, terrain: TerrainType, terrainModifiers: TerrainModifierType) =>
        createAction(ActionTypes.INIT_TILE, { row, col, terrain, terrainModifiers })
}

export type Actions = ActionsUnion<typeof actions>
