import * as React from 'react'

import { FlexContainer } from '../../../styled/FlexContainer'
import { ExtendedCity, City } from '../../city/city.types'
import { YieldInfo } from './YieldInfo'
import { units } from '../../units/units'
import { StyledP } from '../../../styled/StyledP'
import { ProgressInfo } from './ProgressInfo'
import { EMPTY_PROGRESS } from '../../../../utils/utils'

interface OwnProps {
    city: ExtendedCity
    build(city: City, buildKey: string): void
}

export const CityInfo: React.SFC<OwnProps> = ({ city, build }) => (
    <>
        <FlexContainer direction="column" grow={1} padding={5}>
            <p>City: {city.id}</p>
            <YieldInfo _yield={city.yield} />
            Working on: <ProgressInfo progress={city.currentBuild || EMPTY_PROGRESS} />
        </FlexContainer>
        <FlexContainer direction="column" grow={1} padding={5}>
            Build:
            {Object.entries(units).map(entry => (
                <StyledP key={entry[0]}>
                    {entry[0]} ({entry[1].cost}) - {Math.ceil(entry[1].cost / city.yield.production)} Turns
                    <button onClick={() => build(city, entry[0])}>Build</button>
                </StyledP>
            ))}
        </FlexContainer>
    </>
)
