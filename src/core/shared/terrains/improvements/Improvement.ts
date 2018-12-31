import { TechnologyType } from '../../technologies/technologies'
import { Yield } from '../../yield/Yield'

interface Improvement {
    yield: Partial<Yield>
    requiredTechs: TechnologyType[]
}

export type ImprovementType = 'mine' | 'farm' | 'fishingShip'

export const improvements: { [key in ImprovementType]: Improvement } = {
    mine: { yield: { production: 3, health: -1 }, requiredTechs: ['mining'] },
    farm: { yield: { food: 3 }, requiredTechs: ['farming'] },
    fishingShip: { yield: { food: 2, gold: 1 }, requiredTechs: ['fishing'] }
}
