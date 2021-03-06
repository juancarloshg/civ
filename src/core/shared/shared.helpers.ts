import { ExtendedGrid, GridPosition, Size } from './shared.types'

export const getCircularView = (viewGridOrigin: GridPosition, viewSize: Size, grid: ExtendedGrid): ExtendedGrid => {
    const vPadding = viewSize.height / 2
    const rowStart = viewGridOrigin.row - Math.floor(vPadding)
    const rowEnd = viewGridOrigin.row + Math.ceil(vPadding)
    const hPadding = viewSize.width / 2
    const colStart = viewGridOrigin.col - Math.floor(hPadding)
    const colEnd = viewGridOrigin.col + Math.ceil(hPadding)
    return getCircularSlice(grid, rowStart, rowEnd).map(tilesRow => getCircularSlice(tilesRow, colStart, colEnd))
}

const getCircularSlice = <T>(array: T[], start: number, end: number): T[] => {
    const rows = []
    if (start < 0) {
        rows.push(...array.slice(array.length + start))
    }
    rows.push(...array.slice(Math.max(0, start), Math.min(end, array.length)))
    if (end > array.length) {
        rows.push(...array.slice(0, end - array.length))
    }

    return rows
}
