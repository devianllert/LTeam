import axios from 'axios';

import { replaceAllOccurrences } from '@/modules/core/js/string';
import { PlatformId } from '../constants/platforms';
import { createLogger } from '@/modules/core/logging/logger';
import { encodeJSONToQueryParameters } from '@/modules/core/js/url';
import { Primitive } from '@/modules/core/js/types/Primitive';

const logger = createLogger('modules/riot/api/');

// eslint-disable-next-line prefer-destructuring
const RIOT_API_KEY = process.env.RIOT_API_KEY;

interface RequestOptions {
  endpoint: string;
  platform: PlatformId;
  params?: Record<string, string>;
  query?: Record<string, Primitive | Array<Primitive>>;
}

export const request = async <T>(options: RequestOptions): Promise<T> => {
  if (!RIOT_API_KEY) throw Error('Api key not found');

  const {
    endpoint,
    platform,
    params = {},
    query = {},
  } = options;

  const resource = replaceAllOccurrences(endpoint, params);
  const searchParams = encodeJSONToQueryParameters(query);

  const url = `https://${platform}.api.riotgames.com${resource}${searchParams}`;

  try {
    const { data } = await axios.get<T>(url, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY,
      },
    });

    

    return data;
  } catch (error) {
    logger.error(resource, error);

    throw error;
  }
};
