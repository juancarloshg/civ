import styled from 'styled-components'
import { FlexItem, Props as FlexItemProps } from './FlexItem'

interface Props extends FlexItemProps {
    direction?: 'row' | 'column'
}

export const FlexContainer = styled(FlexItem)<Props>`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
`
