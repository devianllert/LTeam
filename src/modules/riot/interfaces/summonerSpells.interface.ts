export interface SummonerSpells {
  type: string;
  version: string;
  data: {
    SummonerBarier: SpellData;
    SummonerBoost: SpellData;
    SummonerDot: SpellData;
    SummonerExhaust: SpellData;
    SummonerFlash: SpellData;
    SummonerHaste: SpellData;
    SummonerHeal: SpellData;
    SummonerMana: SpellData;
    SummonerPoroRecall: SpellData;
    SummonerPoroThrow: SpellData;
    SummonerSmite: SpellData;
    SummonerShowURFSnowball_Mark: SpellData;
    SummonerSnowball: SpellData;
    SummonerTeleport: SpellData;
    Summoner_ULTBookPlaceolder: SpellData;
    Summone_ULTBookSmitePlaceholder: SpellData;

  }
}

export interface SpellData {
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  description: string;
  id: string;
  key: string;
  summonerLevel: string;
}
