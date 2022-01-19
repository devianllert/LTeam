import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';

import { fetchFreeChampion } from '@/modules/champions/api/api';
import { FreeChampions } from '@/modules/champions/interfaces/champion.interface';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<FreeChampions | undefined>) => {
  const data = await fetchFreeChampion();

  res.status(200).json(data);
};

export default handler;
