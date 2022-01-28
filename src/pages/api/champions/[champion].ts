import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';

import { fetchChampionAbilities } from '@/modules/champions/api/api';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { champion } = req.query;
  const data = await fetchChampionAbilities(champion as string);

  res.status(200).json(data);
};

export default handler;
