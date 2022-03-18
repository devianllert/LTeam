export interface ChampionParamentrs {
  data: Record<string, { key: string }>,
}

export interface AllChampions {
  data: Record<string, ChampionData>
}

export interface ChampionData {
  id: string;
  key: string;
  name: string;
}
