import { regions } from '../constants/regions';
import { Region, RegionAlias } from '../interfaces/region.interface';

export const getRegionFromAlias = (region: RegionAlias): Region => {
  const findRegion = regions[region];

  return findRegion;
};
