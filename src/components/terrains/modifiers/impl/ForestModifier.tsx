import { TerrainModifier } from '../TerrainModifier'
import { TerrainModifierType } from '../TerrainModifierType'
import { Yield } from '../../../yield/Yield'

export class ForestModifier extends TerrainModifier {
    public type = TerrainModifierType.FOREST
    public yield = new Yield(2, 1, 0, 1, 0)
}
