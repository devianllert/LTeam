import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/modules/core/sentry/sentry';
import { LoLRegion, regionToCluster } from '@/modules/riot/constants/platforms';
import { getAllMatches, getMatchesFullInfo } from '@/modules/riot/api/match';

const fileLabel = 'api/riot/[region]/matches/[summonerName]/index';

export const match = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    const region = req.query.region as LoLRegion;
    const puuid = req.query.puuid as string;

    const searchParams = {
      limit: Number(req.query.limit as string) || 10,
      offset: Number(req.query.offset as string) || 0,
    };

    const matches = await getAllMatches({
      puuid,
      platform: regionToCluster(region),
      ...searchParams,
    });

    const allMatchesInfo = await getMatchesFullInfo({ platform: regionToCluster(region), matchesId: matches });

    res.json(allMatchesInfo);
  } catch (e: unknown) {
    res.json({
      error: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message:
        process.env.NEXT_PUBLIC_APP_STAGE === 'production'
          ? undefined
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          : (e as Error).message,
    });
  }
};

export default Sentry.withSentry(match);
