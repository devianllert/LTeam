import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/modules/core/sentry/sentry';
import { LoLRegion } from '@/modules/riot/constants/platforms';
import { getSummonerByName } from '@/modules/riot/api/summoner';

const fileLabel = 'api/riot/[region]/summoner/[summonerName]';

export const summoner = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    const region = req.query.region as LoLRegion;
    const summonerName = req.query.summonerName as LoLRegion;

    const data = await getSummonerByName({ name: summonerName, platform: region });

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

export default Sentry.withSentry(summoner);
