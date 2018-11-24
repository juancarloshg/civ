import { Yield } from '../../yield/Yield'

interface TerrainModifier {
    yield: Yield
}

export type TerrainModifierType = 'plain' | 'river' | 'hill' | 'mountain' | 'ice' | 'shore' | 'coast' | 'volcano' | 'forest' | 'rainforest'

export const terrainModifiers: { [key in TerrainModifierType]: TerrainModifier } = {
    plain: { yield: new Yield(0, 1, 0, 0, 0) },
    river: { yield: new Yield(1, 2, 1, 1, 0) },
    hill: { yield: new Yield(1, 0, 0, 0, 0) },
    mountain: { yield: new Yield(2, 0, 0, -1, 0) },
    ice: { yield: new Yield(0, 0, 0, 0, 0) },
    shore: { yield: new Yield(0, 0, 1, 0, 0) },
    coast: { yield: new Yield(0, 0, 1, 0, 0) },
    volcano: { yield: new Yield(3, 3, 0, -5, 1) },
    forest: { yield: new Yield(2, 1, 0, 1, 0) },
    rainforest: { yield: new Yield(2, 1, 0, -2, 2) }
}
