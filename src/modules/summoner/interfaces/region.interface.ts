import { regions } from '../constants/regions';

export type RegionAlias = keyof typeof regions;
export type Region = (typeof regions)[RegionAlias];
