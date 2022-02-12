import { Division } from '../constants/division';
import { Tier } from '../constants/tiers';

export interface MiniSeriesDTO {
  progress: string;
  losses: number;
  target: number;
  wins: number;
}

export interface LeagueEntryDTO {
  queueType: string;
  summonerName: string;
  hotStreak: boolean;
  miniSeries: MiniSeriesDTO;
  wins: number;
  veteran: boolean;
  losses: number;
  rank: `${Division}`;
  leagueId: string;
  inactive: boolean;
  freshBlood: boolean;
  tier: `${Tier}`;
  summonerId: string;
  leaguePoints: number;
}

export interface LeagueItemDTO {
  summonerName: string;
  hotStreak: boolean;
  miniSeries: MiniSeriesDTO;
  wins: number;
  veteran: boolean;
  losses: number;
  freshBlood: boolean;
  inactive: boolean;
  rank: `${Division}`;
  summonerId: string;
  leaguePoints: number;
}

export interface LeagueListDTO {
  leagueId: string;
  tier: string;
  entries: LeagueItemDTO[];
  queue: string;
  name: string;
}

export interface SummonerLeagueDTO {
  queueType: string;
  summonerName: string;
  hotStreak: boolean;
  miniSeries?: MiniSeriesDTO;
  wins: number;
  veteran: boolean;
  losses: number;
  rank: `${Division}`;
  leagueId: string;
  inactive: boolean;
  freshBlood: boolean;
  tier: `${Tier}`;
  summonerId: string;
  leaguePoints: number;
}
