import { TerrainModifierType } from '../terrains/modifiers/terrainModifiers'
import { TerrainType } from '../terrains/base/terrains'

export const terrainMovement: { [key in TerrainType]: number } = {
    grass: 1,
    dirt: 1,
    desert: 2,
    snow: 2,
    sea: 3
}

export const terrainModifierMovement: { [key in TerrainModifierType]: number } = {
    plain: 0,
    rainforest: 3,
    forest: 2,
    ice: 0,
    mountain: 3,
    hill: 1,
    river: 1,
    volcano: 3,
    shore: 0,
    coast: 0
}

// TODO: Move into a saga?
// function move(tile: TileProps): boolean {
//     let mvCost = 1
//     if (this.environment === UnitEnvironment.LAND) {
//         mvCost = this.terrainMovement[tile.terrain]
//         tile.terrainModifiers.forEach(modifier => {
//             mvCost += this.modifierMovement[modifier]
//         })
//         // TODO calculate impenetrable terrains, allow at least 1 movement
//     }

//     if (mvCost <= this.turnMovement) {
//         tile.units.push(this)
//         this.turnMovement -= mvCost
//         return true
//     } else {
//         return false
//     }
// }
