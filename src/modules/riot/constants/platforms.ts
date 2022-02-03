export enum PlatformId {
  EUW1 = 'euw1',
  EUNE1 = 'eun1',
  NA1 = 'na1',
  LA1 = 'la1',
  LA2 = 'la2',
  KR = 'kr',
  JP1 = 'jp1',
  BR1 = 'br1',
  OC1 = 'oc1',
  RU = 'ru',
  TR1 = 'tr1',
  EUROPE = 'europe',
  ASIA = 'asia',
  SEA = 'sea',
  AMERICAS = 'americas',
  AP = 'ap',
  BR = 'br',
  EU = 'eu',
  NA = 'na',
  LATAM = 'latam',
}

export type Cluster =
| PlatformId.EUROPE
| PlatformId.AMERICAS
| PlatformId.ASIA;

export type LoLRegion =
| PlatformId.BR1
| PlatformId.EUNE1
| PlatformId.EUW1
| PlatformId.JP1
| PlatformId.KR
| PlatformId.LA1
| PlatformId.LA2
| PlatformId.NA1
| PlatformId.OC1
| PlatformId.RU
| PlatformId.TR1;

export function regionToCluster(region: LoLRegion): Cluster {
  switch (region) {
    // America
    case PlatformId.NA1:
    case PlatformId.BR1:
    case PlatformId.LA1:
    case PlatformId.LA2:
    case PlatformId.OC1:
      return PlatformId.AMERICAS;
    // Europe
    case PlatformId.EUNE1:
    case PlatformId.EUW1:
    case PlatformId.TR1:
    case PlatformId.RU:
      return PlatformId.EUROPE;
    // Asia
    case PlatformId.JP1:
    case PlatformId.KR:
      return PlatformId.ASIA;
    default:
      return PlatformId.EUROPE;
  }
}
