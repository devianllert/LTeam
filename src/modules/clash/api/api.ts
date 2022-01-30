import axios from 'axios';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import { getRegionFromAlias } from '@/modules/summoner/utils/region';

import { TeamMember, Team } from '../interfaces/clash.interfaces';

const riotApi = axios.create({
  headers: {
    'X-Riot-Token': process.env.RIOT_API_KEY,
  },
});

const fetchTeamId = async (region: string, summonerId: string): Promise<string> => {
  const { data } = await riotApi.get<TeamMember[]>(`https://${region}.riotgames.com/lol/clash/v1/players/by-summoner/${summonerId}`);

  return data[0].teamId;
};

export const fetchTeamInfo = async (region: RegionAlias, summonerId: string): Promise<Team> => {
  const regionKey = getRegionFromAlias(region).key;

  const teamId = await fetchTeamId(regionKey, summonerId);
  const { data } = await riotApi.get<Team>(`https://${regionKey}.api.riotgames.com/lol/clash/v1/teams/${teamId}`);
  return data;
};
