import * as React from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Box } from '@/common/components/layout/Box';
import { Stack } from '@/common/components/layout/Stack';
import * as Text from '@/common/components/system/Text';
import { Button } from '@/common/components/system/Button';
import { ParticipantDTO } from '@/modules/riot/interfaces/match.interface';

import { getChampionImgUrl } from '@/modules/ddragon';
import { getPositionUrl } from '@/modules/communityDragon';

export interface ParticipantsProps {
  participants: ParticipantDTO[];
  summonerPosition: number;
}

const sliceSummonerName = (summonerName: string) => {
  const slicedSummonerName = summonerName.length < 10 ? summonerName : `${summonerName.slice(0, 8)}..`;

  return slicedSummonerName;
};

export const Participants = (props: ParticipantsProps) => {
  const { participants, summonerPosition } = props;
  const router = useRouter();
  const region = router.query.region as string;

  const arr = [0, 1, 2, 3, 4];

  return (
    <Stack
      direction="column"
      space={1}
    >
      { (participants.length > 1) && arr.map((index) => (
        <Box
          key={participants[index].puuid}
          display="flex"
          alignItems="center"
          justifyItems="center"
          flexDirection={summonerPosition <= 4 ? 'row' : 'row-reverse'}
        >

          <Link href={`/${region}/summoner/${participants[index].summonerName}`} passHref>
            <Button component="a">
              <Text.Paragraph variant="body3" sx={{ width: 100, textAlign: 'center' }}>{sliceSummonerName(participants[index]?.summonerName)}</Text.Paragraph>
            </Button>
          </Link>

          <Box
            width={24}
            height={24}
            marginRight={2}
            marginLeft={2}
          >
            <img
              alt=""
              width={24}
              height={24}
              src={getChampionImgUrl(participants[index].championName)}
            />
          </Box>

          <Box
            width={24}
            height={24}
            marginRight={2}
            marginLeft={2}
          >
            {(participants[index].individualPosition.toUpperCase() !== 'INVALID') && (
            <img
              width={24}
              height={24}
              alt=""
              src={getPositionUrl(participants[index].individualPosition.toLocaleLowerCase())}
            />
            )}
          </Box>

          <Box
            width={24}
            height={24}
            marginRight={2}
            marginLeft={2}
          >
            <img
              alt=""
              width={24}
              height={24}
              src={getChampionImgUrl(participants[index + 5].championName)}
            />
          </Box>

          <Link href={`/${region}/summoner/${participants[index + 5]?.summonerName}`} passHref>
            <Button component="a">
              <Text.Paragraph variant="body3" sx={{ width: 100 }}>{sliceSummonerName(participants[index + 5]?.summonerName)}</Text.Paragraph>
            </Button>
          </Link>
        </Box>
      ))}
    </Stack>
  );
};
