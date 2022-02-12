import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';

import { summonerRequest, SummonerResponse } from '@/modules/summoner/api';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<SummonerResponse | undefined>) => {
  const { region, summoner } = req.query;
  const data = await summonerRequest(region as RegionAlias, summoner as string);

  res.status(200).json(data);
};

export default handler;
