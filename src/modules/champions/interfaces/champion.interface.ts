export interface ChampionPassive {
  abilityIconPath: string;
  abilityVideoImagePath: string;
  abilityVideoPath: string;
  description: string;
  name: string;
}

export interface ChampionSkin {
  chromaPath?: string | null;
  collectionSplashVideoPath?: string | null;
  description?: string | null;
  emblems?: string | null;
  featuresText?: string | null;
  id: number;
  isBase: boolean;
  isLegacy: boolean;
  loadScreenPath: string;
  name: string;
  rarity: string;
  rarityGemPath?: string | null;
  regionRarityId: 0;
  skinLines?: string | null;
  skinType: string;
  splashPath: string;
  splashVideoPath?: string | null;
  tilePath: string;
  uncenteredSplashPath: string;
}

export interface ChampionPlaystyleInfo {
  crowdControl: number;
  damage: number;
  durability: number;
  mobility: number;
  utility: number;
}

export interface ChampionPreview {
  blurb: string;
  id: string;
  key: string;
  name: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    h: number;
    w: number;
  }
}

export interface Champion {
  alias: string;
  banVoPath: string;
  chooseVoPath: string;
  id: number;
  name: string;
  title: string
  passive: ChampionPassive;
  roles: string[];
  shortBio: string;
  playstyleInfo: ChampionPlaystyleInfo;
  skins: ChampionSkin[];
}

export interface ChampionsData {
  data: Record<string, ChampionPreview>;
  format: 'standAloneComplex';
  type: 'champion';
  version: string;
}
