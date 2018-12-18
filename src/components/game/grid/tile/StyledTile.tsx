import styled from 'styled-components'
import { squareSize } from '../constants'
import { ExtendedTile } from '../grid.helpers'
import { Props as TileProps } from './Tile'

type StyledTileProps = Pick<TileProps, 'tile' | 'isSelectedTile'>

export const getColor = (props: { tile: ExtendedTile }): string => {
    const terrain = props.tile.terrain
    switch (terrain) {
        case 'sea':
            return '#2860ba'
        case 'snow':
            return '#f2f5f9'
        case 'desert':
            return '#edefba'
        case 'dirt':
            return 'Olive'
        case 'grass':
            return '#06891d'
    }
}

const getBorderSize = (props: StyledTileProps) => (props.tile.city ? (props.isSelectedTile ? 8 : 7) : props.isSelectedTile ? 3 : 1)
const getBorderStyle = (props: StyledTileProps) => (props.tile.city ? 'double' : 'solid')

export const BaseStyledTile = styled.span<{ tile: ExtendedTile }>`
    flex-grow: 1;
    display: inline-block;
    box-sizing: border-box;
    background: ${getColor};
`

export const StyledTile = styled(BaseStyledTile)`
    flex-basis: ${squareSize.width};
    border-width: ${getBorderSize}px;
    border-style: ${getBorderStyle};
    border-color: black;
`
