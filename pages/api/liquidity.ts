import { serveCache } from "@api/endpoints/liquidity";
import { applyCacheHeaders } from "@api/utils/responseHelpers";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * This api endpoint returns the current liquidity for a specified protocol version + historical rates.
 * The api answer is cached on vercel edge CDN and refreshed
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  applyCacheHeaders(res);
  // res.statusCode = 200;
  res.json(JSON.stringify(await serveCache()));
};
