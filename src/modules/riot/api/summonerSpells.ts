import axios from 'axios';

import { SummonerSpells } from '../interfaces/summonerSpells.interface';

export const getSummonerSpellsData = async (): Promise<SummonerSpells> => {
  const { data } = await axios.get<SummonerSpells>('http://ddragon.leagueoflegends.com/cdn/12.4.1/data/en_US/summoner.json');

  return data;
};
