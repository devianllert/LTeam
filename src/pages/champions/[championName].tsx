import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Head from 'next/head';
import axios from 'axios';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { MainLayout } from '@/layouts/main/components/MainLayout';
import { getAppTitle } from '@/modules/core/meta/meta';
import { Box } from '@/common/components/layout/Box';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';

import { ChampionBanner } from '@/modules/champions/components/ChampionBanner';
import { Card } from '@/modules/champions/components/Card';
import { ChampionStart } from '@/modules/champions/components/ChampionStart';

import { Container } from '@/common/components/layout/Container';
import { Stack } from '@/common/components/layout/Stack';

const statsSpells = {
  mostFrequent: {
    items: [
      'http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerDot.png',
    ],
    games: 11058,
    winRate: 49.90,
  },
  mostWinRate: {
    items: [
      'http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerTeleport.png',
    ],
    games: 223,
    winRate: 60.09,
  },
};

const statsItems = {
  mostFrequent: {
    items: [
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/2003.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/2003.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/3854.png',
    ],
    games: 11058,
    winRate: 49.90,
  },
  mostWinRate: {
    items: [
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/2003.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/1054.png',
    ],
    games: 223,
    winRate: 60.09,
  },
};

export const IndexPage = ():JSX.Element => {
  const router = useRouter();

  const { championName } = router.query;

  return (
    <>
      <Head>
        <title>{getAppTitle('Search')}</title>
      </Head>

      <ChampionBanner
        championRole="Support"
        rank={5}
        winRate={58.21}
        championName="Pyke"
        championKey={555}
      />

      <Container>

        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Stack
            direction="row"
            space={3}
          >
            <Card
              cardHeading="Summoner Spells"
            >
              <ChampionStart stats={statsSpells} />
            </Card>

            <Card
              cardHeading="Start Items"
            >
              <ChampionStart stats={statsItems} />
            </Card>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
