interface Technology {
    cost: number
    requiredTechs?: TechnologyType[]
}

export type TechnologyType = 'farming' | 'fishing' | 'mining' | 'writing'

export const technologies: { [key in TechnologyType]: Technology } = {
    farming: { cost: 10 },
    fishing: { cost: 10 },
    mining: { cost: 10 },
    writing: { cost: 12, requiredTechs: ['farming'] }
}
