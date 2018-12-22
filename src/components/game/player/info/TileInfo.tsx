import * as React from 'react'

import { Unit } from '../../units/unit.types'
import { ExtendedTile } from '../../grid'

interface TileInfoProps {
    tile: ExtendedTile
    playerMoving: string | null
    selectUnit(unit: Unit): void
}

export const TileInfo: React.SFC<TileInfoProps> = ({ tile, selectUnit, playerMoving }) => (
    <>
        <p>
            Selected tile [{tile.row}, {tile.col}]
        </p>
        <p>Tile details:</p>
        <p>Terrain - {tile.terrain}</p>
        {tile.city && <p>This tile has a city!</p>}
        {tile.units.length > 0 && (
            <>
                <p>Units:</p>
                {tile.units.map((u, i) => (
                    <p key={i}>
                        {u.type} - {u.currentHp}/{u.hp}{' '}
                        {u.owner.id === playerMoving && (
                            <>
                                - <button onClick={() => selectUnit(u)}>USE</button>
                            </>
                        )}
                    </p>
                ))}
            </>
        )}
    </>
)
