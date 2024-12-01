/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface Query {
    counties: { code: string, name?: string }[]
}

const defaultQuery: Query = {
    counties: [
        { code: '057', name: 'Hillsborough' },
        { code: '103', name: 'Pinellas' },
        { code: '101', name: 'Pasco' },
    ]
}

export const fetchCensusData = async (q: Query = defaultQuery) => {
    const baseUrl = 'https://api.census.gov/data/2021/acs/acs5';
    const fields = 'B01003_001E,NAME';
    const responses = await Promise.all(
        q.counties.map((county) =>
            axios.get(
                `${baseUrl}?get=${fields}&for=tract:*&in=state:12+county:${county.code}`
            ).then((res) => res.data)
        )
    );
    return responses.flat();
};

export const fetchTractGeometry = async (state: string, county: string, tract: string) => {
    const tigerBaseUrl = `https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/8/query`;
    const query = `where=STATE='${state}'+AND+COUNTY='${county}'+AND+TRACT='${tract}'&outFields=*&outSR=4326&f=geojson`;

    try {
        const response = await axios.get(`${tigerBaseUrl}?${query}`);
        return response.data.features[0]?.geometry; // Get the geometry from GeoJSON
    } catch (err) {
        console.log('API call error:', err);
        return null; // Return null in case of error
    }
};


