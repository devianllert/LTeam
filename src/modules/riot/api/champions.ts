import { request } from './api';

import { LoLMethods } from '../constants/methods';
import { LoLRegion } from '../constants/platforms';

import { ChampionRotation } from '../interfaces/championRotation.interface';

export interface GetChampionRotationOptions {
  platform: LoLRegion;
}

export const getChampionRotation = async (options: GetChampionRotationOptions): Promise<ChampionRotation> => {
  const data = await request<ChampionRotation>({
    endpoint: LoLMethods.CHAMPION.GET_CHAMPION_ROTATIONS,
    platform: options.platform,
  });

  return data;
};
