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
  tags: string[]
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

export interface FreeChampions {
  freeChampionIds: number[];
}

export interface FetchedChampion {
  id: string;
  allytips: string;
  blurb: string;
  enemytips: string[];
  key: string;
  lore: string;
  partype: string;
  name: string;
  passive: Passive;
  skins: {
    id: string;
    num: number;
    name: string;
    chroma: boolean;
  }[];
  version: string;
  tags: string[];
  format: string;
  stats: {
    armor: number;
    armorperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackrange: number;
    attackspeed: number;
    attackspeedperlevel: number;
    crit: number;
    critperlevel: number;
    hp: number;
    hpperlevel: number;
    hpregen: number;
    hpregenperlevel: number;
    movespeed: number;
    mp: number;
    mpperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
  };
  spells: Spell[];
}

export interface FetchedChampionData {
  data: Record<string, FetchedChampion>;
  format: 'standAloneComplex';
  type: 'champion';
  version: string;
}

export interface Spell {
  id: string;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  description: string;
  effect: number[][];
  effectBurn: string[];
  image: {
    full: string;
    sprite: string;
    h: number;
    w: number;
    group: string;
  };
  maxammo: string;
  maxrank: number;
  name: string;
  range: number[];
  rangeBurn: string;
  resource: string;
  tooltip: string;
  vars: [];
  leveltip: {
    effect: string[];
    label: string[];
  };
}

export interface Passive {
  name: string;
  description: string;
  image: {
    full: string;
    sprite: string;
    h: number;
    w: number;
    group: string;
  };
}
