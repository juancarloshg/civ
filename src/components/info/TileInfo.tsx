import * as React from 'react'

import { YieldInfo } from './YieldInfo'
import { ExtendedTile } from '../../core/shared/shared.types'
import { Unit } from '../../core/units/unit.types'
import { StyledP } from '../styled/StyledP'
import { getTileYield } from '../../core/grid/grid.helpers'

interface TileInfoProps {
    tile: ExtendedTile
    currentPlayer: string | null
    selectUnit(unit: Unit): void
}

export const TileInfo: React.SFC<TileInfoProps> = ({ tile, selectUnit, currentPlayer }) => (
    <>
        <StyledP>
            Selected tile [{tile.row}, {tile.col}]
        </StyledP>
        <StyledP>Terrain - {tile.terrain}</StyledP>
        <YieldInfo _yield={getTileYield(tile)} />
        {tile.units.length > 0 && (
            <>
                <StyledP>Units:</StyledP>
                {tile.units.map((u, i) => (
                    <StyledP key={i}>
                        {u.type} - {u.currentHp}/{u.hp}{' '}
                        {u.owner.id === currentPlayer && (
                            <>
                                - <button onClick={() => selectUnit(u)}>USE</button>
                            </>
                        )}
                    </StyledP>
                ))}
            </>
        )}
    </>
)
