import axios from 'axios';
import { RegionAlias } from '../interfaces/region.interface';
import { getRegionFromAlias } from '../utils/region';

interface SummonerData {
  id: string;
  profileIconId: number;
  puuid: string;
  name: string;
  revisionDate: number;
  summonerLevel: number;
}

export interface LeagueData {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface SummonerLeagueStatsData {
  data: LeagueData[];
}

export interface SummonerResponse {
  summonerData: SummonerData;
  leagueData: SummonerLeagueStatsData;
}

const riotApi = axios.create({
  headers: {
    'X-Riot-Token': process.env.RIOT_API_KEY as string,
  },
});

const fetchSummonerData = async (region: string, summonerName: string): Promise<SummonerData> => {
  const { data } = await riotApi.get<SummonerData>(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`);

  return data;
};

const fetchSummonerLegueStats = async (region: string, summonerId: string): Promise<SummonerLeagueStatsData> => {
  const { data } = await riotApi.get<LeagueData[]>(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`);

  return {
    data,
  };
};

export const summonerRequest = async (region: RegionAlias, summonerName: string): Promise<SummonerResponse> => {
  const regionKey = getRegionFromAlias(region).key;

  const summonerData = await fetchSummonerData(regionKey, summonerName);
  const summonerLeagueData = await fetchSummonerLegueStats(regionKey, summonerData.id);

  return {
    summonerData,
    leagueData: summonerLeagueData,
  };
};
