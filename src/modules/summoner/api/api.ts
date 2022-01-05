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

const fetchSummonerData = async (summonerName: string, region?: string): Promise<SummonerData> => {
  const fetchData = await fetch(`https://${region ?? 'euw1'}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
    headers: {
      'X-Riot-Token': 'RGAPI-df199f46-917d-4496-9450-cf961690c381',
    },
  });

  const data = await fetchData.json() as SummonerData;

  return data;
};

const fetchSummonerLegueStats = async (summonerId: string, region?: string): Promise<SummonerLeagueStatsData> => {
  const fetchData = await fetch(`https://${region ?? 'euw1'}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY as string,
    },
  });

  const data = await fetchData.json() as LeagueData[];

  return {
    data,
  };
};

export const summonerRequest = async (summonerName: string, region?: string): Promise<SummonerLeagueStatsData> => {
  const summonerData = await fetchSummonerData(summonerName);
  const summonerLeagueData = await fetchSummonerLegueStats(summonerData.id);

  return summonerLeagueData;
};
