import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/modules/core/sentry/sentry';
import { LoLRegion } from '@/modules/riot/constants/platforms';
import { getSummonerLeague } from '@/modules/riot/api/league';
import { getRegionFromAlias } from '@/modules/summoner/utils/region';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';

const fileLabel = 'api/riot/[region]/league/[summonerId]/index';

export const league = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    const region = req.query.region as RegionAlias;
    const summonerId = req.query.summonerId as LoLRegion;

    const regionKey = getRegionFromAlias(region).key;

    const data = await getSummonerLeague({ summonerId, platform: regionKey as LoLRegion });

    res.json(data);
  } catch (e: unknown) {
    res.json({
      error: true,
      message:
        process.env.NEXT_PUBLIC_APP_STAGE === 'production'
          ? undefined
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          : (e as Error).message,
    });
  }
};

export default Sentry.withSentry(league);
