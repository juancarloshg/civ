import styled from 'styled-components'
import { squareSize } from '../constants'
import { ExtendedTile } from '../grid.types'

export interface StyledTileProps {
    tile: ExtendedTile
    isSelectedTile: boolean
}

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
const getBackgroundImage = (props: StyledTileProps) => (props.tile.city ? props.tile.city.icon : '""')

const hexAlpha = 99
const applyPlayerColor = (props: StyledTileProps) => {
    const backgroundImage = getBackgroundImage(props)
    return props.tile.owner
        ? `&:after{
    content: '';
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${props.tile.owner.color}${hexAlpha};
    background-image: ${backgroundImage};
    background-repeat: no-repeat;
}`
        : ''
}

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
    position: relative;
    ${applyPlayerColor};
`
