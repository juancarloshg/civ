import { Yield } from '../../yield/Yield'
import { ResourceGroup } from './resourceGroups'

interface Resource {
    group: ResourceGroup
    yield: Yield
}

export type ResourceType = 'sheep' | 'cow' | 'silver' | 'gold' | 'iron' | 'oil' | 'fish'

export const resources: { [key in ResourceType]: Resource } = {
    sheep: { group: 'health', yield: new Yield(1, 3, 0, 0, 0) },
    cow: { group: 'health', yield: new Yield(1, 3, 0, 0, 0) },
    silver: { group: 'luxury', yield: new Yield(2, 0, 2, 0, 0) },
    gold: { group: 'luxury', yield: new Yield(2, 0, 3, 0, 0) },
    iron: { group: 'strategic', yield: new Yield(3, 0, 0, 0, 0) },
    oil: { group: 'strategic', yield: new Yield(5, 0, 2, -2, 0) },
    fish: { group: 'health', yield: new Yield(0, 3, 1, 0, 0) }
}
