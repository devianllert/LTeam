import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/nextjs';

import { configureReq } from '@/modules/core/sentry/sentry';
import { getChampionRotation } from '@/modules/riot/api/champions';
import { LoLRegion } from '@/modules/riot/constants/platforms';

const fileLabel = 'api/riot/[region]/champions/rotation';

export const rotation = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    configureReq(req, { fileLabel });

    const region = req.query.region as LoLRegion;

    const data = await getChampionRotation({ platform: region });

    res.json(data);
  } catch (e: unknown) {
    res.status(500).json({
      error: true,
      message:
        process.env.NEXT_PUBLIC_APP_STAGE === 'production'
          ? undefined
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          : (e as Error).message,
    });
  }
};

export default Sentry.withSentry(rotation);
