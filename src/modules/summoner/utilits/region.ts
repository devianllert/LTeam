import { regions } from '../constants/regions';

export const getRegion = (region: string) => {
  const findRegion = regions.find((data) => data.region === region);
  return findRegion ?? regions[2];
};
