import * as React from 'react'
import styled from 'styled-components'
// 515751

const FooterWrapper = styled.div`
    padding: 20px;
    background: #515751;
    color: white;
`

const StyledLink = styled.a`
    color: white;
`

const IconLicense: React.SFC = () => (
    <small>
        Icons made by{' '}
        <StyledLink href="https://www.freepik.com/" title="Freepik">
            Freepik
        </StyledLink>{' '}
        from{' '}
        <StyledLink href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
        </StyledLink>{' '}
        is licensed by{' '}
        <StyledLink href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
            CC 3.0 BY
        </StyledLink>
    </small>
)

const PageInfo: React.SFC = () => (
    <p>
        Civ game -{' '}
        <StyledLink href="https://github.com/juancarloshg/civ" target="_blank">
            Contribute here
        </StyledLink>
    </p>
)

export const Footer: React.SFC = () => (
    <FooterWrapper>
        <PageInfo />
        <IconLicense />
    </FooterWrapper>
)
