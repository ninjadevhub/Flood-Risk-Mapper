import GenericAPIRes from "@/models/base-api.dto";
import apiResponseHandler from "@/utils/api-response-handler";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
    return await apiResponseHandler(async () => {
        const result: GenericAPIRes<unknown> = {
            success: true,
            data: [] 
        }
        return NextResponse.json(result, { status: 200 })
    })
}