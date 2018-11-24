import { Yield } from '../../yield/Yield'
import { TechnologyType } from '../../technologies/TechnologyType'

interface Improvement {
    yield: Yield
    requiredTechs: TechnologyType[]
}

export type ImprovementType = 'mine' | 'farm' | 'fishingShip'

export const improvements: { [key in ImprovementType]: Improvement } = {
    mine: { yield: new Yield(3, 0, 0, -1, 0), requiredTechs: [TechnologyType.MINING] },
    farm: { yield: new Yield(0, 3, 0, 0, 0), requiredTechs: [TechnologyType.FARMING] },
    fishingShip: { yield: new Yield(0, 2, 1, 0, 0), requiredTechs: [TechnologyType.FISHING] }
}
