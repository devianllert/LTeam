export interface Summoner {
  summonerName: string;
  summonerRegion: {
    region: string;
    value: string;
  },
  summonerIcon: number;
  summonerId: string
}

export const readFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }

  return null;
};

export const saveSummonerToLocalStorage = (key: string, data: Summoner): void => {
  const searchedSummoners = readFromLocalStorage(key) as Summoner[];

  if (searchedSummoners.includes(data)) return;
  if (searchedSummoners.length < 5) {
    searchedSummoners.push(data);
    localStorage.setItem(key, JSON.stringify(searchedSummoners));
  } else {
    searchedSummoners.splice(0, 1);
    searchedSummoners.push(data);
    localStorage.setItem(key, JSON.stringify(searchedSummoners));
  }
};
