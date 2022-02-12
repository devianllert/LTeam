import { request } from './api';

import { LoLMethods } from '../constants/methods';
import { LoLRegion } from '../constants/platforms';

import { ChampionRotationDTO } from '../interfaces/championRotation.interface';

export interface GetChampionRotationOptions {
  platform: LoLRegion;
}

export const getChampionRotation = async (options: GetChampionRotationOptions): Promise<ChampionRotationDTO> => {
  const data = await request<ChampionRotationDTO>({
    endpoint: LoLMethods.CHAMPION.GET_CHAMPION_ROTATIONS,
    platform: options.platform,
  });

  return data;
};
