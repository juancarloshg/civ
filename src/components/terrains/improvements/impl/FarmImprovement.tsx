import { Improvement } from '../Improvement'
import { Yield } from '../../../yield/Yield'
import { ImprovementType } from '../ImprovementType'
import { TechnologyType } from '../../../technologies/TechnologyType'

export class FarmImprovement extends Improvement {
    public yield = new Yield(0, 3, 0, 0, 0)
    public type = ImprovementType.FARM
    public requiredTechs = [TechnologyType.FARMING]
}
