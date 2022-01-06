import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';

import { summonerRequest, SummonerLeagueStatsData } from '@/modules/summoner/api';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<SummonerLeagueStatsData | undefined>) => {
  const { region, summoner } = req.query;
  const coin = await summonerRequest(region as string, summoner as string);

  res.status(200).json(coin);
};

export default handler;
