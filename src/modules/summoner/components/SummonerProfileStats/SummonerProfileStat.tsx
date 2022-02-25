import * as React from 'react';

import { Box } from '@/common/components/layout/Box';
import { Button } from '@/common/components/system/Button';
import * as Text from '@/common/components/system/Text';
import { SummonerLeagueDTO } from '@/modules/riot/interfaces/league.interface';
import { quequqTypes } from '../../constants/QueueType';

import { getSummonerIconUrl } from '@/modules/ddragon';
import { getTierUrl } from '@/modules/communityDragon';

export interface SummonerProfileStatsProps {
  profileIconId: number;
  summonerName: string;
  summonerLevel: number
  profileStats?: SummonerLeagueDTO[];
}

export const SummonerProfileStats = (props: SummonerProfileStatsProps) => {
  const {
    profileIconId,
    summonerName,
    summonerLevel,
    profileStats,
  } = props;

  const [queueType, setQueueType] = React.useState('RANKED_SOLO_5x5');

  const queue = profileStats?.find((queueItem) => queueItem.queueType === queueType);
  const getWinRate = () => {
    if (!queue) return 0;

    const win = queue.wins;
    const lose = queue.losses;

    return (win / (win + lose)) * 100;
  };

  const winRate = getWinRate();

  const onClick = () => setQueueType((prev) => (prev === 'RANKED_SOLO_5x5' ? 'RANKED_FLEX_SR' : 'RANKED_SOLO_5x5'));

  return (
    <Box
      display="flex"
      flexDirection="column"
    >
      <Text.Heading variant="h4">{summonerName}</Text.Heading>

      <Box
        display="flex"
      >

        <Box
          position="relative"
        >
          <Box
            borderRadius="50%"
            overflow="hidden"
            width={96}
            height={96}
            border="1px solid"
          >
            <img
              src={getSummonerIconUrl(profileIconId.toString())}
              alt=""
              width={96}
              height={96}
            />
          </Box>

          <Box
            position="absolute"
            borderRadius="50%"
            border="1px solid"
            left="-4px"
            width={32}
            height={32}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bottom="4px"
            backgroundColor="radix.blue5"
          >
            <Text.Paragraph variant="body3">{summonerLevel}</Text.Paragraph>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          marginLeft={2}
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <Box
              width={48}
              height={48}
              border="1px solid"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
            >
              <img
                src={getTierUrl(queue?.tier ?? 'unranked').toLowerCase()}
                alt=""
                width={36}
                height={36}
              />
            </Box>

            <Text.Paragraph variant="body1" sx={{ marginLeft: '8px' }}>{queue?.tier ?? 'UNRANKED'} {queue?.rank}</Text.Paragraph>

            <Text.Paragraph variant="body1" sx={{ marginLeft: '12px' }}>{queue?.leaguePoints ?? 0} LP</Text.Paragraph>
          </Box>
          <Box
            display="flex"
            marginTop={1}
          >
            <Button
              onClick={() => onClick()}
            >
              <Text.Paragraph
                variant="body1"
                sx={{ width: 112 }}
              >
                {quequqTypes[queueType]}
              </Text.Paragraph>
            </Button>

            <Box
              marginLeft={3}
              display="flex"
              padding={1}
              backgroundColor="radix.gray7"
              borderRadius="4px"
            >
              <Text.Paragraph variant="body1">RECORD:</Text.Paragraph>

              <Text.Paragraph variant="body1" color="radix.green11" sx={{ marginLeft: '8px' }}>{queue?.wins ?? 0}</Text.Paragraph>
              <Text.Paragraph variant="body1">-</Text.Paragraph>
              <Text.Paragraph variant="body1" color="radix.red11">{queue?.losses ?? 0}</Text.Paragraph>

              <Text.Paragraph variant="body1" sx={{ marginLeft: '12px' }}>WINRATE: </Text.Paragraph>
              <Text.Paragraph variant="body1" color={winRate >= 50 ? 'radix.green11' : 'radix.red11'} sx={{ marginLeft: '8px' }}>{winRate.toFixed(2)} %</Text.Paragraph>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
