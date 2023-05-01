export const generateHeatmapXDomain = (length) => {
    return Array.from({ length }, (v, i) => i.toString());
}

export const generateHeatmapYDomain = (length) => {
    return Array.from({ length }, (v, i) => (i + 1).toString());
}