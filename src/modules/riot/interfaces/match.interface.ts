export interface MetadataDTO {
  dataVersion: string;
  matchId: string;
  participants: string[];
}

export interface StatPerksDTO {
  defense: number;
  flex: number;
  offense: number;
}

export interface SelectionDTO {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

export interface StyleDTO {
  description: string;
  selections: SelectionDTO[];
  style: number;
}

export interface PerksDTO {
  statPerks: StatPerksDTO;
  styles: StyleDTO[];
}

export interface ParticipantDTO {
  assists: number;
  baronKills: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  goldEarned: number;
  goldSpent: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusLost: number;
  nexusTakedowns: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  participantId: number;
  pentaKills: number;
  perks: PerksDTO;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

export interface BanDTO {
  championId: number;
  pickTurn: number;
}

export interface BaronDTO {
  first: boolean;
  kills: number;
}

export interface ChampionDTO {
  first: boolean;
  kills: number;
}

export interface DragonDTO {
  first: boolean;
  kills: number;
}

export interface InhibitorDTO {
  first: boolean;
  kills: number;
}

export interface RiftHeraldDTO {
  first: boolean;
  kills: number;
}

export interface TowerDTO {
  first: boolean;
  kills: number;
}

export interface ObjectivesDTO {
  baron: BaronDTO;
  champion: ChampionDTO;
  dragon: DragonDTO;
  inhibitor: InhibitorDTO;
  riftHerald: RiftHeraldDTO;
  tower: TowerDTO;
}

export interface TeamDTO {
  bans: BanDTO[];
  objectives: ObjectivesDTO;
  teamId: number;
  win: boolean;
}

export interface InfoDTO {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: ParticipantDTO[];
  platformId: string;
  queueId: number;
  teams: TeamDTO[];
  tournamentCode: string;
}

export interface MatchDTO {
  metadata: MetadataDTO;
  info: InfoDTO;
}
