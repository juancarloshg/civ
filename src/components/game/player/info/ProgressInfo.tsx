import * as React from 'react'

import { Progress } from '../../../../utils/utils'

interface OwnProps {
    progress: Progress
}

export const ProgressInfo: React.SFC<OwnProps> = ({ progress }) => (
    <>
        {progress.key} ({progress.current}/{progress.total}) -{' '}
        {progress.perTurn ? Math.ceil((progress.total - progress.current) / progress.perTurn) : '?'} Turns
    </>
)
