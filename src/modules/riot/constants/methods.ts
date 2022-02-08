export interface MethodsMap {
  ACCOUNT: {
    GET_BY_PUUID: string;
    GET_BY_RIOT_ID: string;
    GET_ACTIVE_SHARD_FOR_PLAYER: string;
  };
  CHAMPION_MASTERY: {
    GET_ALL_CHAMPIONS: string;
    GET_CHAMPION_MASTERY: string;
    GET_CHAMPION_MASTERY_SCORE: string;
  };
  CHAMPION: {
    GET_CHAMPION_ROTATIONS: string;
  };
  CLASH: {
    GET_PLAYERS_BY_SUMMONER: string;
    GET_TEAM_BY_ID: string;
    GET_TOURNAMENTS: string;
    GET_TOURNAMENT_BY_ID: string;
    GET_TOURNAMENT_TEAM_BY_ID: string;
  };
  LEAGUE_EXP: {
    GET_LEAGUE_ENTRIES: string;
  };
  LEAGUE: {
    GET_CHALLENGER_BY_QUEUE: string;
    GET_ENTRIES_BY_SUMMONER: string;
    GET_ALL_ENTRIES: string;
    GET_GRANDMASTER_BY_QUEUE: string;
    GET_LEAGUE_BY_ID: string;
    GET_MASTER_BY_QUEUE: string;
  };
  MATCH_V5: {
    GET_IDS_BY_PUUID: string;
    GET_MATCH_BY_ID: string;
    GET_MATCH_TIMELINE_BY_ID: string;
  };
  SPECTATOR: {
    GET_GAME_BY_SUMMONER_ID: string;
    GET_FEATURED_GAMES: string;
  };
  SUMMONER: {
    GET_BY_ACCOUNT_ID: string;
    GET_BY_SUMMONER_NAME: string;
    GET_BY_PUUID: string;
    GET_BY_SUMMONER_ID: string;
    GET_BY_ACCESS_TOKEN: string;
  };
  THIRD_PARTY_CODE: {
    GET_BY_SUMMONER_ID: string;
  };
  [key: string]: any;
}

export const LoLMethods: MethodsMap = {
  ACCOUNT: {
    GET_BY_PUUID: '/riot/account/v1/accounts/by-puuid/{puuid}',
    GET_BY_RIOT_ID: '/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}',
    GET_ACTIVE_SHARD_FOR_PLAYER: '/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}',
  },
  CHAMPION_MASTERY: {
    GET_ALL_CHAMPIONS: '/lol/champion-mastery/v4/champion-masteries/by-summoner/{summonerId}',
    GET_CHAMPION_MASTERY: '/lol/champion-mastery/v4/champion-masteries/by-summoner/{summonerId}/by-champion/{championId}',
    GET_CHAMPION_MASTERY_SCORE: '/lol/champion-mastery/v4/scores/by-summoner/{summonerId}',
  },
  CHAMPION: {
    GET_CHAMPION_ROTATIONS: '/lol/platform/v3/champion-rotations',
  },
  CLASH: {
    GET_PLAYERS_BY_SUMMONER: '/lol/clash/v1/players/by-summoner/{summonerId}',
    GET_TEAM_BY_ID: '/lol/clash/v1/teams/{teamId}',
    GET_TOURNAMENTS: '/lol/clash/v1/tournaments',
    GET_TOURNAMENT_BY_ID: '/lol/clash/v1/tournaments/{tournamentId}',
    GET_TOURNAMENT_TEAM_BY_ID: '/lol/clash/v1/tournaments/by-team/{teamId}',
  },
  LEAGUE_EXP: {
    GET_LEAGUE_ENTRIES: '/lol/league-exp/v4/entries/{queue}/{tier}/{division}',
  },
  LEAGUE: {
    GET_CHALLENGER_BY_QUEUE: '/lol/league/v4/challengerleagues/by-queue/{queue}',
    GET_ENTRIES_BY_SUMMONER: '/lol/league/v4/entries/by-summoner/{summonerId}',
    GET_ALL_ENTRIES: '/lol/league/v4/entries/{queue}/{tier}/{division}',
    GET_GRANDMASTER_BY_QUEUE: '/lol/league/v4/grandmasterleagues/by-queue/{queue}',
    GET_LEAGUE_BY_ID: '/lol/league/v4/leagues/{leagueId}',
    GET_MASTER_BY_QUEUE: '/lol/league/v4/masterleagues/by-queue/{queue}',
  },
  MATCH_V5: {
    GET_IDS_BY_PUUID: '/lol/match/v5/matches/by-puuid/{puuid}/ids',
    GET_MATCH_BY_ID: '/lol/match/v5/matches/{matchId}',
    GET_MATCH_TIMELINE_BY_ID: '/lol/match/v5/matches/{matchId}/timeline',
  },
  SPECTATOR: {
    GET_GAME_BY_SUMMONER_ID: '/lol/spectator/v4/active-games/by-summoner/{summonerId}',
    GET_FEATURED_GAMES: '/lol/spectator/v4/featured-games',
  },
  SUMMONER: {
    GET_BY_ACCESS_TOKEN: '/lol/summoner/v4/summoners/me',
    GET_BY_ACCOUNT_ID: '/lol/summoner/v4/summoners/by-account/{accountId}',
    GET_BY_SUMMONER_NAME: '/lol/summoner/v4/summoners/by-name/{summonerName}',
    GET_BY_PUUID: '/lol/summoner/v4/summoners/by-puuid/{puuid}',
    GET_BY_SUMMONER_ID: '/lol/summoner/v4/summoners/{summonerId}',
  },
  THIRD_PARTY_CODE: {
    GET_BY_SUMMONER_ID: '/lol/platform/v4/third-party-code/by-summoner/{summonerId}',
  },
};
