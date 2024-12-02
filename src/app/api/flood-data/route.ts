/* eslint-disable @typescript-eslint/no-unused-vars */
import { listCensusData } from "@/lib/db/census";
import GenericAPIRes from "@/models/base-api.dto";
import apiResponseHandler from "@/utils/api-response-handler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  return await apiResponseHandler(async () => {
    const result: GenericAPIRes<unknown> = {
      success: true,
      data: [],
    };
    return NextResponse.json(result, { status: 200 });
  });
}
