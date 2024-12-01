/* eslint-disable @typescript-eslint/no-explicit-any */
const geojsonToWkt = (geometry: any): string => {
    if (!geometry || !geometry.type || !geometry.coordinates) {
        throw new Error('Invalid GeoJSON geometry');
    }
    const { type, coordinates } = geometry;

    switch (type) {
        case 'Point':
            return `POINT (${coordinates.join(' ')})`;
        case 'LineString':
            return `LINESTRING (${coordinates.map((coord: number[]) => coord.join(' ')).join(', ')})`;
        case 'Polygon':
            return `POLYGON (${coordinates
                .map((ring: number[][]) => `(${ring.map(coord => coord.join(' ')).join(', ')})`)
                .join(', ')})`;
        case 'MultiPoint':
            return `MULTIPOINT (${coordinates.map((coord: number[]) => `(${coord.join(' ')})`).join(', ')})`;
        case 'MultiLineString':
            return `MULTILINESTRING (${coordinates
                .map((line: number[][]) => `(${line.map(coord => coord.join(' ')).join(', ')})`)
                .join(', ')})`;
        case 'MultiPolygon':
            return `MULTIPOLYGON (${coordinates
                .map((polygon: number[][][]) =>
                    `(${polygon
                        .map(ring => `(${ring.map(coord => coord.join(' ')).join(', ')})`)
                        .join(', ')})`
                )
                .join(', ')})`;
        default:
            throw new Error(`Unsupported geometry type: ${type}`);
    }
};

export default geojsonToWkt