import { Technology } from '../Technology'
import { TechnologyType } from '../TechnologyType'

export class WritingTech extends Technology {
    public cost = 12
    public requiredTechs = [TechnologyType.FARMING]
}
