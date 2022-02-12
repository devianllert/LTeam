import { request } from './api';

import { LoLMethods } from '../constants/methods';
import { Cluster } from '../constants/platforms';
import { MatchDTO } from '../interfaces/match.interface';
import { MatchTimelineDTO } from '../interfaces/match-timeline.interface';

export interface GetAllMatchesOptions {
  platform: Cluster;
  puuid: string;
  limit?: number;
  offset?: number;
}

export const getAllMatches = async (options: GetAllMatchesOptions): Promise<string[]> => {
  const data = await request<string[]>({
    endpoint: LoLMethods.MATCH_V5.GET_IDS_BY_PUUID,
    platform: options.platform,
    params: {
      puuid: options.puuid,
    },
    query: {
      start: options.offset,
      count: options.limit,
    },
  });

  return data;
};

export interface GetMatchByIdOptions {
  platform: Cluster;
  matchId: string;
}

export const getMatchById = async (options: GetMatchByIdOptions): Promise<MatchDTO> => {
  const data = await request<MatchDTO>({
    endpoint: LoLMethods.MATCH_V5.GET_MATCH_BY_ID,
    platform: options.platform,
    params: {
      matchId: options.matchId,
    },
  });

  return data;
};

export interface GetMatchTimelineByIdOptions {
  platform: Cluster;
  matchId: string;
}

export const getMatchTimelineById = async (options: GetMatchTimelineByIdOptions): Promise<MatchTimelineDTO> => {
  const data = await request<MatchTimelineDTO>({
    endpoint: LoLMethods.MATCH_V5.GET_MATCH_TIMELINE_BY_ID,
    platform: options.platform,
    params: {
      matchId: options.matchId,
    },
  });

  return data;
};

export interface GetMatchesFullInfoOptions {
  matchesId: string[];
  platform: Cluster;
}

export const getMatchesFullInfo = async (options: GetMatchesFullInfoOptions): Promise<MatchDTO[]> => {
  const data = await Promise.all(options.matchesId.map((matchId) => getMatchById({ platform: options.platform, matchId })));
  return data;
};
