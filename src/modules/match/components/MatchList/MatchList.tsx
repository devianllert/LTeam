import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { MatchDTO } from '@/modules/riot/interfaces/match.interface';
import { Box } from '@/common/components/layout/Box';
import { Stack } from '@/common/components/layout/Stack';
import * as Text from '@/common/components/system/Text';

import { Match } from '../../Match';

export interface MatchListProps {
  puuid: string;
}

export const MatchList = (props: MatchListProps): JSX.Element => {
  const {
    puuid,
  } = props;

  const router = useRouter();

  const { region, summoner } = router.query;

  const query = useQuery(['matches', summoner], async () => {
    const { data } = await axios.get<MatchDTO[]>(`/api/riot/${region as string}/matches/${puuid}`);

    return data;
  }, {
    refetchOnWindowFocus: false,
  });

  const matches = query.data ?? [];

  const hasMatches = matches.length !== 0;

  return (
    <Box
      marginTop={3}
    >
      {!hasMatches && (
        <Box>
          <Text.Paragraph variant="body1">No matches found.</Text.Paragraph>
        </Box>
      )}

      {hasMatches && (
        <Stack
          direction="column"
          space={3}
        >
          {matches.map((matchData) => (
            <Match
              key={matchData.metadata.matchId}
              matchData={matchData}
              summoner={puuid}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};
