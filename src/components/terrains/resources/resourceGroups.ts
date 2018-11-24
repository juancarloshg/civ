export type ResourceGroup = 'health' | 'luxury' | 'strategic'

export const resourceGroups: { [key in ResourceGroup]: undefined } = {
    health: undefined,
    luxury: undefined,
    strategic: undefined
}
