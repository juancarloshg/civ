import { Yield } from 'src/components/game/yield/Yield'

import { TerrainModifierType } from '../modifiers/terrainModifiers'
import { ResourceType } from '../resources/resources'
import { ImprovementType } from '../improvements/Improvement'

interface Terrain {
    allowedModifiers: TerrainModifierType[]
    allowedResources: ResourceType[]
    allowedImprovements: ImprovementType[]
    yield: Partial<Yield>
}

export type TerrainType = 'dirt' | 'grass' | 'sea' | 'desert' | 'snow'

export const terrains: { [key in TerrainType]: Terrain } = {
    dirt: {
        allowedModifiers: [],
        allowedImprovements: ['farm', 'mine'],
        allowedResources: ['oil', 'iron', 'cow', 'sheep'],
        yield: { production: 1, food: 1 }
    },
    grass: {
        allowedModifiers: [],
        allowedImprovements: ['mine', 'farm'],
        allowedResources: ['oil', 'iron', 'cow', 'sheep'],
        yield: { food: 2 }
    },
    sea: {
        allowedModifiers: [],
        allowedImprovements: ['fishingShip'],
        allowedResources: ['fish'],
        yield: { food: 2, gold: 1 }
    },
    desert: {
        allowedModifiers: [],
        allowedImprovements: [],
        allowedResources: ['oil'],
        yield: { health: -1 }
    },
    snow: {
        allowedModifiers: [],
        allowedImprovements: [],
        allowedResources: ['oil'],
        yield: { health: -1 }
    }
}
