import { TerrainModifier } from '../TerrainModifier'
import { TerrainModifierType } from '../TerrainModifierType'
import { Yield } from '../../../yield/Yield'

export class IceModifier extends TerrainModifier {
    public type = TerrainModifierType.ICE
    public yield = new Yield(0, 0, 0, 0, 0)
}
