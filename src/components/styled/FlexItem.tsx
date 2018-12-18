import styled from 'styled-components'

export interface Props {
    grow?: number
    basis?: string
    cssHeight?: string
}

export const FlexItem = styled.div<Props>`
    flex-grow: ${({ grow }) => grow || 0};
    flex-basis: ${({ basis }) => basis || 0};
    height: ${({ cssHeight }) => cssHeight || 'auto'};
`
