import axios from "axios";

export const fetchCensusData = async () => {
    const baseUrl = "https://api.census.gov/data/2021/acs/acs5";
    const fields = "B01003_001E,NAME";
    const counties = [
        { code: "057", name: "Hillsborough" },
        { code: "103", name: "Pinellas" },
        { code: "101", name: "Pasco" },
    ];

    const responses = await Promise.all(
        counties.map((county) =>
            axios.get(
                `${baseUrl}?get=${fields}&for=tract:*&in=state:12+county:${county.code}`
            ).then((res) => res.data)
        )
    );

    return responses.flat();
};

