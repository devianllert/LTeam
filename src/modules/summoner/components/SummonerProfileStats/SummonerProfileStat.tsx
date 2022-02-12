import * as React from 'react';

import { Box } from '@/common/components/system/Box';
import * as Text from '@/common/components/system/Text';
import { SummonerLeagueDTO } from '@/modules/riot/interfaces/league.interface';

export interface SummonerProfileStatsProps {
  profileIconId: number;
  summonerName: string;
  summonerLevel: number
  profileStats: SummonerLeagueDTO;
}

export const SummonerProfileStats = (props: SummonerProfileStatsProps) => {
  const {
    profileIconId,
    summonerName,
    summonerLevel,
    profileStats,
  } = props;

  const getWinRate = () => {
    const win = profileStats.wins ?? 0;
    const lose = profileStats.losses ?? 0;

    const winRate = (win / (win + lose)) * 100;
    return winRate;
  };

  const winRate = getWinRate();

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
              src={`http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/${profileIconId.toString()}.png`}
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
                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${profileStats.tier.toLowerCase()}.png`}
                alt=""
                width={36}
                height={36}
              />
            </Box>

            <Text.Paragraph variant="body1" sx={{ marginLeft: '8px' }}>{profileStats.tier} {profileStats.rank}</Text.Paragraph>

            <Text.Paragraph variant="body1" sx={{ marginLeft: '12px' }}>{profileStats.leaguePoints} LP</Text.Paragraph>
          </Box>
          <Box
            display="flex"
            marginTop={1}
          >
            <Box
              padding={1}
              backgroundColor="radix.gray7"
              borderRadius="4px"
            >
              <Text.Paragraph variant="body1">SOLO / DUO</Text.Paragraph>
            </Box>

            <Box
              marginLeft={3}
              display="flex"
              padding={1}
              backgroundColor="radix.gray7"
              borderRadius="4px"
            >
              <Text.Paragraph variant="body1">RECORD:</Text.Paragraph>

              <Text.Paragraph variant="body1" color="radix.green11" sx={{ marginLeft: '8px' }}>{profileStats.wins}</Text.Paragraph>
              <Text.Paragraph variant="body1">-</Text.Paragraph>
              <Text.Paragraph variant="body1" color="radix.red11">{profileStats.losses}</Text.Paragraph>

              <Text.Paragraph variant="body1" sx={{ marginLeft: '12px' }}>WINRATE: </Text.Paragraph>
              <Text.Paragraph variant="body1" color={winRate >= 50 ? 'radix.green11' : 'radix.red11'} sx={{ marginLeft: '8px' }}>{winRate.toFixed(2)} %</Text.Paragraph>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
