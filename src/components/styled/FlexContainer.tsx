import styled from 'styled-components'

interface Props {
    direction?: 'row' | 'column'
    grow?: number
    basis?: string
    cssHeight?: string
}

export const FlexContainer = styled.div<Props>`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    flex-grow: ${({ grow }) => grow || 0};
    flex-basis: ${({ basis }) => basis || 'auto'};
    height: ${({ cssHeight }) => cssHeight || 'auto'};
`
