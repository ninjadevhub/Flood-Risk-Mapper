/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericAPIRes from "@/models/base-api.dto";
import { fetchCensusData, fetchTractGeometry } from "@/lib/api/census";
import apiResponseHandler from "@/utils/api-response-handler";
import { NextRequest, NextResponse } from "next/server";
import { insertCensusData, listCensusData } from "@/lib/db/census";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  return await apiResponseHandler(async () => {
    const { data, error } = await listCensusData();
    const result: GenericAPIRes<unknown> = {
      success: !error,
      data,
      error,
    } as any;
    return NextResponse.json(result, { status: 200 });
  });
}

export async function POST(_req: NextRequest) {
  return await apiResponseHandler(async () => {
    const data = await fetchCensusData();

    //process census data
    for (const entry of data.slice(1)) {
      try {
        const [population, name, state, county, tract] = entry;
        const geometry = await fetchTractGeometry(state, county, tract);
        if (!geometry) {
          console.log("No geometry found for tract");
          break;
        }
        const geometryWKT = `SRID=4326;${JSON.stringify(geometry)}`;
        await insertCensusData({
          state_code: state,
          tract_code: tract,
          tract_name: name,
          county_code: county,
          population: parseInt(population, 10),
          geometry: geometryWKT,
        });
      } catch (error) {
        console.error(
          "failed to store census data with population and geometry::",
          error
        );
      }
    }

    const result: GenericAPIRes<unknown> = {
      success: true,
      data,
    };
    return NextResponse.json(result, { status: 200 });
  });
}
