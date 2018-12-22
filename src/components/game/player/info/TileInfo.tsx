import * as React from 'react'

import { Unit } from '../../units/units'
import { ExtendedTile } from '../../grid'
import { StyledP } from '../../../styled/StyledP'

interface TileInfoProps {
    tile: ExtendedTile
    selectUnit(unit: Unit): void
}

export const TileInfo: React.SFC<TileInfoProps> = ({ tile, selectUnit }) => (
    <>
        <StyledP>
            Selected tile [{tile.row}, {tile.col}]
        </StyledP>
        <StyledP>Tile details:</StyledP>
        <StyledP>Terrain - {tile.terrain}</StyledP>
        {tile.city && (
            <>
                <StyledP>This tile has a city!</StyledP>
                <StyledP>Production: {tile.city.yield.production}</StyledP>
                <StyledP>Food: {tile.city.yield.food}</StyledP>
                <StyledP>Gold: {tile.city.yield.gold}</StyledP>
                <StyledP>Health: {tile.city.yield.health}</StyledP>
                <StyledP>Science: {tile.city.yield.science}</StyledP>
            </>
        )}
        {tile.units.length > 0 && (
            <>
                <StyledP>Units:</StyledP>
                {tile.units.map((u, i) => (
                    <StyledP key={i}>
                        {u.type} - {u.currentHp}/{u.hp} - <button onClick={() => selectUnit(u)}>USE</button>
                    </StyledP>
                ))}
            </>
        )}
    </>
)
