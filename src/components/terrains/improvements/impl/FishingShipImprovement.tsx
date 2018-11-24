import { Improvement } from '../Improvement'
import { Yield } from '../../../yield/Yield'
import { ImprovementType } from '../ImprovementType'
import { TechnologyType } from '../../../technologies/TechnologyType'

export class FishingShipImprovement extends Improvement {
    public yield = new Yield(0, 2, 1, 0, 0)
    public type = ImprovementType.FISHING_SHIP
    public requiredTechs = [TechnologyType.FISHING]
}
