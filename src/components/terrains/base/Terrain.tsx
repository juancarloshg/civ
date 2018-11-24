import { TerrainType } from './TerrainType'
import { TerrainModifierType } from '../modifiers/TerrainModifierType'
import { ResourceType } from '../resources/ResourceType'
import { ImprovementType } from '../improvements/ImprovementType'
import { YieldGenerator } from '../../yield/YieldGenerator'
import { Yield } from '../../yield/Yield'

export abstract class Terrain implements YieldGenerator {
    public abstract type: TerrainType
    public abstract allowedModifiers: TerrainModifierType[]
    public abstract allowedResources: ResourceType[]
    public abstract allowedImprovements: ImprovementType[]
    public abstract yield: Yield
}
