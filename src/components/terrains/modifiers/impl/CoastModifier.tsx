import { TerrainModifier } from '../TerrainModifier'
import { TerrainModifierType } from '../TerrainModifierType'
import { Yield } from '../../../yield/Yield'

export class CoastModifier extends TerrainModifier {
    public type = TerrainModifierType.COAST
    public yield = new Yield(0, 0, 1, 0, 0)
}
