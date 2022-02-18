import { request } from './api';

import { LoLMethods } from '../constants/methods';
import { LoLRegion } from '../constants/platforms';
import { SummonerLeagueDTO } from '../interfaces/league.interface';

export interface GetSummonerLeagueOptions {
  platform: LoLRegion;
  summonerId: string;
}

export const getSummonerLeagues = async (options: GetSummonerLeagueOptions): Promise<SummonerLeagueDTO[]> => {
  const data = await request<SummonerLeagueDTO[]>({
    endpoint: LoLMethods.LEAGUE.GET_ENTRIES_BY_SUMMONER,
    platform: options.platform,
    params: {
      summonerId: options.summonerId,
    },
  });

  return data;
};
