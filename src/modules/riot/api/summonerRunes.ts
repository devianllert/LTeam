import axios from 'axios';

import { Rune } from '../interfaces/summonerRunes.interface';

export const getSummonerRunesData = async (): Promise<Rune[]> => {
  const { data } = await axios.get<Rune[]>('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json');

  return data;
};
