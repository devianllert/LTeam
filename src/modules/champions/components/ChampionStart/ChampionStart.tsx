import * as React from 'react';

import NextImg from 'next/image';

import { Box } from '@/components/layout/Box';
import * as Text from '@/components/system/Text';
import { Stack } from '@/components/layout/Stack';

import * as S from './styled';

export interface Stat {
  items: string[];
  winRate: number;
  games: number;
}

export interface Stats {
  mostFrequent: Stat;
  mostWinRate: Stat;
}

export interface StatsItemProps {
  header: string;
  data: Stat;

}

export const StatsItem = (props: StatsItemProps): JSX.Element => {
  const {
    header,
    data,
  } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text.Paragraph variant="body3" sx={{ mb: 3 }}>{header}</Text.Paragraph>

      <Box
        display="flex"
        flexWrap="wrap"
        width={120}
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        <Stack direction="row" space={2}>
          {data.items.map((item, index) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              borderRadius="50%"
              width={32}
              height={32}
              mt={2}
              backgroundImage={`url(${item})`}
              backgroundPosition="center"
              backgroundSize="cover"
            />
          ))}
        </Stack>
      </Box>

      <Text.Paragraph variant="body3" sx={{ mb: 1 }}>{`${data.games} Games`}</Text.Paragraph>

      <Text.Paragraph variant="body3" sx={{ textTransform: 'uppercase' }}>{`${data.winRate}% win`}</Text.Paragraph>
    </Box>
  );
};

export interface ChampionStartProps {
  /**
   * The content
   */
  stats: Stats;
}

export const ChampionStart = (props: ChampionStartProps): JSX.Element => {
  const {
    stats,
  } = props;

  return (
    <S.ChampionStartRoot>
      <Stack direction={['column', 'row']} space={3}>
        <StatsItem
          header="Most Frequent"
          data={stats.mostFrequent}
        />

        <S.Border />
        <StatsItem
          header="Most Winrate"
          data={stats.mostWinRate}
        />
      </Stack>
    </S.ChampionStartRoot>
  );
};
