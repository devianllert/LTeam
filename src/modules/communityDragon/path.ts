export const path = {
  mainRune: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/',
  secondRuneType: 'https://raw.communitydragon.org/12.4/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/',
  position: 'https://raw.communitydragon.org/12.3/plugins/rcp-fe-lol-clash/global/default/icon-position-',
  tier: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/',
};

export const getTierUrl = (tier: string) => `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${tier}.png`.toLowerCase();

export const getPositionUrl = (position: string) => `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/icon-position-${position}-blue.png`.toLowerCase();

export const getSecondRuneTypeUrl = (type: string) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${type}.png`.toLowerCase();

export const getMainRuneImgUrl = (runePath: string) => {
  const newRunePath = runePath.trim().split('/').slice(3).join('/') ?? '';

  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${newRunePath}`.toLowerCase();
};
