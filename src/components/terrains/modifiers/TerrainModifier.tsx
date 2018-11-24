import { TerrainModifierType } from './TerrainModifierType'
import { YieldGenerator } from '../../yield/YieldGenerator'
import { Yield } from '../../yield/Yield'

export abstract class TerrainModifier implements YieldGenerator {
    public abstract type: TerrainModifierType
    public abstract yield: Yield
}
