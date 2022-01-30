import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';

import { fetchTeamInfo } from '@/modules/clash/api';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import { Team } from '@/modules/clash/interfaces/clash.interfaces';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Team | undefined>) => {
  const { region, summoner } = req.query;
  const data = await fetchTeamInfo(region as RegionAlias, summoner as string);

  res.status(200).json(data);
};

export default handler;
