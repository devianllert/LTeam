import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/modules/core/sentry/sentry';
import { LoLRegion, regionToCluster } from '@/modules/riot/constants/platforms';
import { getMatchById } from '@/modules/riot/api/match';

const fileLabel = 'api/riot/[region]/matches/[summonerName]/[matchId]/index';

export const matchId = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    const region = req.query.region as LoLRegion;
    const Id = req.query.matchId as string;

    const matches = await getMatchById({
      matchId: Id,
      platform: regionToCluster(region),
    });

    res.json(matches);
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

export default Sentry.withSentry(matchId);
