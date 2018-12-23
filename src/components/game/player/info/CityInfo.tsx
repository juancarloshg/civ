import * as React from 'react'

import { FlexContainer } from '../../../styled/FlexContainer'
import { ExtendedCity } from '../../city/city.types'
import { YieldInfo } from './YieldInfo'

interface TileInfoProps {
    city: ExtendedCity
}

export const CityInfo: React.SFC<TileInfoProps> = ({ city }) => (
    <>
        <FlexContainer direction="column" grow={1} padding={5}>
            <p>City: {city.id}</p>
            <YieldInfo _yield={city.yield} />
        </FlexContainer>
        <FlexContainer direction="column" grow={1} padding={5}>
            Build:
        </FlexContainer>
    </>
)
