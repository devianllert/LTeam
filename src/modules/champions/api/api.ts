import axios from 'axios';
import { random } from '@/modules/core/js/number';

import {
  ChampionsData,
  Champion,
  FreeChampions,
  ChampionPreview,
  FetchedChampionData,
} from '../interfaces/champion.interface';

const riotApi = axios.create({
  headers: {
    'X-Riot-Token': process.env.RIOT_API_KEY,
  },
});

export const fetchAllChampions = async (): Promise<ChampionsData['data']> => {
  const { data } = await axios.get<ChampionsData>('https://ddragon.leagueoflegends.com/cdn/12.2.1/data/en_US/champion.json');

  return data.data;
};

export const fetchChampionById = async (id: number | string): Promise<Champion> => {
  const { data } = await axios.get<Champion>(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${id}.json`);

  return data;
};

export const getRandomChampionSplashUrl = async (): Promise<string> => {
  const champions = await fetchAllChampions();

  const championKeys = Object.keys(champions);
  const randomChampionKey = championKeys[random(0, championKeys.length)];
  const championId = champions[randomChampionKey].key;

  const champion = await fetchChampionById(championId);

  const randomSkin = champion.skins[random(0, champion.skins.length)];

  const url = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championId}/${randomSkin.id}.jpg`;

  return url;
};

export const fetchFreeChampion = async (): Promise<FreeChampions> => {
  const { data } = await riotApi.get<FreeChampions>('https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations');
  return data;
};

export const fetchChampion = async (name: string): Promise<FetchedChampionData> => {
  const { data } = await axios.get<FetchedChampionData>(`https://ddragon.leagueoflegends.com/cdn/12.2.1/data/ru_RU/champion/${name}.json`);
  return data;
};
