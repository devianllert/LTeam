import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/modules/core/sentry/sentry';
import { LoLRegion, regionToCluster } from '@/modules/riot/constants/platforms';
import { getMatches } from '@/modules/riot/api/match';

const fileLabel = 'api/riot/[region]/matches/[puuid]/index';

export const match = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    const region = req.query.region as LoLRegion;
    const puuid = req.query.puuid as string;

    const searchParams = {
      limit: Number(req.query.limit as string) || 5,
      offset: Number(req.query.offset as string) || 0,
    };

    const matches = await getMatches({
      puuid,
      platform: regionToCluster(region),
      ...searchParams,
    });

    res.json(matches);
  } catch (e: unknown) {
    res.status(500).json({
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
