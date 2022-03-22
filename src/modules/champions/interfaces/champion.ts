export interface ChampionParamentrs {
  data: Record<string, ChampionData>,
}

export interface AllChampions {
  data: Record<string, ChampionData>
}

export interface ChampionData {
  id: string;
  key: string;
  name: string;
  passive: {
    name: string;
    image: {
      full: string;
    }
  };
  spells: SpellData[];
}

export interface SpellData {
  id: string;
  name: string;
  image: {
    full: string;
  };
}
