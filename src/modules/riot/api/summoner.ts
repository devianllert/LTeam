import { request } from './api';

import { LoLMethods } from '../constants/methods';
import { LoLRegion } from '../constants/platforms';
import { SummonerV4DTO } from '../interfaces/summoner.interface';

export interface GetSummonerByNameOptions {
  platform: LoLRegion;
  name: string;
}

export const getSummonerByName = async (options: GetSummonerByNameOptions): Promise<SummonerV4DTO> => {
  const data = await request<SummonerV4DTO>({
    endpoint: LoLMethods.SUMMONER.GET_BY_SUMMONER_NAME,
    platform: options.platform,
    params: {
      summonerName: options.name,
    },
  });

  return data;
};
