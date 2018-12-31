export interface Yield {
    production: number
    food: number
    gold: number
    health: number
    science: number
}

export const addYields = (yield1: Yield, yield2: Yield): Yield => {
    return {
        production: yield1.production + yield2.production,
        food: yield1.food + yield2.food,
        gold: yield1.gold + yield2.gold,
        health: yield1.health + yield2.health,
        science: yield1.science + yield2.science
    }
}

export const EMPTY_YIELD = {
    production: 0,
    food: 0,
    gold: 0,
    health: 0,
    science: 0
}

export const toYield = (yield1: Partial<Yield>): Yield => {
    return {
        ...EMPTY_YIELD,
        ...yield1
    }
}

export const addPartialYields = (yield1: Partial<Yield>, yield2: Partial<Yield>): Yield => {
    return addYields(toYield(yield1), toYield(yield2))
}
