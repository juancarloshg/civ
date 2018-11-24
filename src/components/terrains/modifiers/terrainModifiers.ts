import { Yield } from '../../yield/Yield'

interface TerrainModifier {
    yield: Partial<Yield>
}

export type TerrainModifierType = 'plain' | 'river' | 'hill' | 'mountain' | 'ice' | 'shore' | 'coast' | 'volcano' | 'forest' | 'rainforest'

export const terrainModifiers: { [key in TerrainModifierType]: TerrainModifier } = {
    plain: { yield: { food: 1 } },
    river: { yield: { production: 1, food: 2, gold: 1, health: 1 } },
    hill: { yield: { production: 1 } },
    mountain: { yield: { production: 1, health: -1 } },
    ice: { yield: {} },
    shore: { yield: { gold: 1 } },
    coast: { yield: { gold: 1 } },
    volcano: { yield: { production: 3, food: 3, health: -5, science: 1 } },
    forest: { yield: { production: 2, food: 1, health: 1 } },
    rainforest: { yield: { production: 2, food: 1, health: -2, science: 2 } }
}
