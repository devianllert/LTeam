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

const fetchSummonerData = async (region: string, summonerName: string): Promise<SummonerData> => {
  const fetchData = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY as string,
    },
  });

  const data = await fetchData.json() as SummonerData;

  return data;
};

const fetchSummonerLegueStats = async (region: string, summonerId: string): Promise<SummonerLeagueStatsData> => {
  const fetchData = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY as string,
    },
  });

  const data = await fetchData.json() as LeagueData[];

  return {
    data,
  };
};

export const summonerRequest = async (region: string, summonerName: string): Promise<SummonerResponse> => {
  const summonerData = await fetchSummonerData(region, summonerName);
  const summonerLeagueData = await fetchSummonerLegueStats(region, summonerData.id);

  return {
    summonerData,
    leagueData: summonerLeagueData,
  };
};
