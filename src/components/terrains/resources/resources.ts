import { Yield } from '../../yield/Yield'
import { ResourceGroup } from './resourceGroups'

interface Resource {
    group: ResourceGroup
    yield: Partial<Yield>
}

export type ResourceType = 'sheep' | 'cow' | 'silver' | 'gold' | 'iron' | 'oil' | 'fish'

export const resources: { [key in ResourceType]: Resource } = {
    sheep: { group: 'health', yield: { production: 1, food: 3 } },
    cow: { group: 'health', yield: { production: 1, food: 3 } },
    silver: { group: 'luxury', yield: { production: 2, gold: 2 } },
    gold: { group: 'luxury', yield: { production: 2, gold: 3 } },
    iron: { group: 'strategic', yield: { production: 3 } },
    oil: { group: 'strategic', yield: { production: 5, gold: 2, health: -2 } },
    fish: { group: 'health', yield: { food: 3, gold: 1 } }
}
