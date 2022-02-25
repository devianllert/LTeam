export const getSummonerIconUrl = (icon: string) => `http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/${icon}.png`;

export const getSummonerItemUrl = (item: string) => `http://ddragon.leagueoflegends.com/cdn/12.4.1/img/item/${item}.png`;

export const getChampionImgUrl = (champName: string) => {
  const isFiddle = champName === 'FiddleSticks' ? 'Fiddlesticks' : champName;

  return `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${isFiddle}.png`;
};

export const getSummonerSpellUrl = (spell: string) => `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/spell/${spell}.png`;
