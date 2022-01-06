import * as React from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { RiSearchLine } from 'react-icons/ri';

import { SummonerLeagueStatsData } from '@/modules/summoner/api';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';

import { MainLayout } from '@/layouts/main/components/MainLayout';
import { IconButton } from '@/common/components/system/IconButton';
import { getAppTitle } from '@/modules/core/meta/meta';
import { Box } from '@/common/components/system/Box';
import { InputAdornment } from '@/common/components/system/Input/InputAdornment';
import { Input } from '@/common/components/system/Input';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import * as Text from '@/common/components/system/Text';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { getTranslationsConfig } from '@/layouts/core/translations';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';

const logger = createLogger('Index');

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const IndexPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t, i18n } = useTranslation('index');

  const router = useRouter();

  const { region, summoner } = router.query;

  const query = useQuery(['summoner', region, summoner], async () => {
    const data = await fetch(`/api/${region as string}/summoner/${summoner as string}`);
    const fetchedSummonerData = await data.json() as SummonerLeagueStatsData;

    return fetchedSummonerData;
  });

  console.log(region, summoner);
  console.log(query.data?.data);

  return (
    <>
      <Head>
        <title>{getAppTitle('Search')}</title>
      </Head>

      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="text.primary"
        backgroundImage="linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url('/static/images/cosmic-queen-ashe-splash.jpg')"
        position="relative"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        px={2}
      >

        <Text.Heading variant="h1" color="white">LTeam</Text.Heading>

        <Box
          component="form"
          maxWidth="440px"
          width="100%"
          mt={8}
        >
          <Input
            suffix={(
              <InputAdornment position="end">
                <IconButton size="small" edge="end">
                  <RiSearchLine />
                </IconButton>
              </InputAdornment>
            )}
            color="black"
            fullWidth
            placeholder="Search summoner"
            value={summoner}
          />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      isReadyToRender: true,
      isServerRendering: true,
      ...await getTranslationsConfig(context, ['common', 'index']),
      serializedDataset: serializeSafe({}),
    },
  };
};

IndexPage.Layout = MainLayout;

export default IndexPage;
