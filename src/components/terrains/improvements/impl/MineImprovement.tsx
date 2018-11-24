import { Improvement } from '../Improvement'
import { Yield } from '../../../yield/Yield'
import { ImprovementType } from '../ImprovementType'
import { TechnologyType } from '../../../technologies/TechnologyType'

export class MineImprovement extends Improvement {
    public yield = new Yield(3, 0, 0, -1, 0)
    public type = ImprovementType.MINE
    public requiredTechs: [TechnologyType.MINING]
}
