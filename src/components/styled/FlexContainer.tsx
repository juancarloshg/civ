import styled from 'styled-components'
import { FlexItem, Props as FlexItemProps } from './FlexItem'

interface Props extends FlexItemProps {
    direction?: 'row' | 'column'
    padding?: number
}

export const FlexContainer = styled(FlexItem)<Props>`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    padding: ${({ padding }) => padding || 0}px;
`
