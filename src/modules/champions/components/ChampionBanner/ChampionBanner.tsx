import * as React from 'react';

import Link from 'next/link';

import {
  RiArrowLeftSLine,
  RiStarFill,
  RiSwordLine,
  RiLineChartLine,
} from 'react-icons/ri';

import { Box } from '@/components/layout/Box';
import * as Text from '@/components/system/Text';
import { Stack } from '@/components/layout/Stack';
import { Container } from '@/common/components/layout/Container';

import * as S from './styled';

export interface StatsComponentProps {
  icon: React.ReactNode;
  type: string;
  value: string;
}

export const StatsComponent = (props: StatsComponentProps) => {
  const {
    icon,
    type,
    value,
  } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={32}
        height={32}
        borderRadius="50%"
        backgroundColor="radix.grayA9"
      >
        {icon}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        ml={2}
        justifyContent="start"
      >
        <Text.Paragraph variant="body3" sx={{ textTransform: 'uppercase' }}>{type}</Text.Paragraph>

        <Text.Paragraph variant="body3" sx={{ mt: 1 }}>{value}</Text.Paragraph>
      </Box>
    </Box>
  );
};

export interface ChampionBannerProps {
  /**
   * The content
   */
  championName: string;
  championRole: string;
  championKey: string;
  winRate: number;
  rank: number;
}

export const ChampionBanner = (props: ChampionBannerProps): JSX.Element => {
  const {
    championName,
    championRole,
    championKey,
    winRate,
    rank,
  } = props;

  return (
    <S.ChampionBannerRoot>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          height={[256, 144]}
          backgroundColor="background.secondary"
          paddingLeft={3}
          width="100%"
        >
          <Link
            href="/"
            passHref
          >
            <Box
              component="a"
              display={['none', null, 'flex']}
              alignItems="center"
              justifyContent="center"
              width={32}
              height={32}
              border="1px solid"
              borderRadius="4px"
              mr={6}
            >
              <RiArrowLeftSLine size="32px" />
            </Box>
          </Link>

          <Box
            display="flex"
            flexDirection="column"
          >
            <Text.Heading variant="h4" component="h1" sx={{ textTransform: 'uppercase' }}>{championName}</Text.Heading>

            <Box
              mt={2}
            >
              <Stack
                direction={['column', 'row']}
                space={4}
              >
                <StatsComponent
                  type="role"
                  value={championRole}
                  icon={<RiSwordLine size="16px" color="gold" />}
                />

                <StatsComponent
                  type="win ratio"
                  value={`${winRate.toFixed(2)}%`}
                  icon={<RiLineChartLine size="16px" color="gold" />}
                />

                <StatsComponent
                  type="role rating"
                  value={`Ranked #${rank}`}
                  icon={<RiStarFill size="16px" color="gold" />}
                />
              </Stack>
            </Box>
          </Box>
          <S.ChampionImg imgPath={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championKey}/${championKey}000.jpg`} />
        </Box>
      </Container>
    </S.ChampionBannerRoot>
  );
};
