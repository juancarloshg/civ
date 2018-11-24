export class Yield {
    public production: number
    public food: number
    public gold: number
    public health: number
    public science: number

    constructor(production: number, food: number, gold: number, health: number, science: number) {
        this.production = production
        this.food = food
        this.gold = gold
        this.health = health
        this.science = science
    }

    public add(otherYield: Yield): void {
        this.production += otherYield.production
        this.food += otherYield.food
        this.gold += otherYield.gold
        this.health += otherYield.health
        this.science += otherYield.science
    }
}
