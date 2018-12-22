import styled from 'styled-components'

export interface Props {
    margin?: number
}

export const StyledP = styled.p<Props>`
    margin: ${props => props.margin || 0}px;
`
