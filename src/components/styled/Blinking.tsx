import { keyframes } from 'styled-components'

export const blinker = keyframes`
    51% {
        opacity: 1
    }
    50.9% {
        opacity: 0;
    }
    41% {
        opacity: 0;
    }
    40.9% {
        opacity: 1;
    }
`
