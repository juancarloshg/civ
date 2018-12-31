import * as React from 'react'
import { YieldInfo } from './YieldInfo'
import { ProgressInfo } from './ProgressInfo'
import { ExtendedCity } from '../../core/shared/shared.types'
import { City } from '../../core/city/city.types'
import { EMPTY_PROGRESS } from '../../core/city/city.constants'
import { units } from '../../core/units/units'
import { FlexContainer } from '../../components/styled/FlexContainer'
import { StyledP } from '../../components/styled/StyledP'

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
