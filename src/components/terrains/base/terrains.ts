import { TerrainModifierType } from '../modifiers/terrainModifiers'
import { Yield } from 'src/components/yield/Yield'
import { ResourceType } from '../resources/resources'
import { ImprovementType } from '../improvements/Improvement'

interface Terrain {
    allowedModifiers: TerrainModifierType[]
    allowedResources: ResourceType[]
    allowedImprovements: ImprovementType[]
    yield: Yield
}

export type TerrainType = 'dirt' | 'grass' | 'sea' | 'desert' | 'snow'

export const terrains: { [key in TerrainType]: Terrain } = {
    dirt: {
        allowedModifiers: [],
        allowedImprovements: ['farm', 'mine'],
        allowedResources: ['oil', 'iron', 'cow', 'sheep'],
        yield: new Yield(1, 1, 0, 0, 0)
    },
    grass: {
        allowedModifiers: [],
        allowedImprovements: ['mine', 'farm'],
        allowedResources: ['oil', 'iron', 'cow', 'sheep'],
        yield: new Yield(0, 2, 0, 0, 0)
    },
    sea: {
        allowedModifiers: [],
        allowedImprovements: ['fishingShip'],
        allowedResources: ['fish'],
        yield: new Yield(0, 2, 1, 0, 0)
    },
    desert: {
        allowedModifiers: [],
        allowedImprovements: [],
        allowedResources: ['oil'],
        yield: new Yield(0, 0, 0, -1, 0)
    },
    snow: {
        allowedModifiers: [],
        allowedImprovements: [],
        allowedResources: ['oil'],
        yield: new Yield(0, 0, 0, -1, 0)
    }
}
