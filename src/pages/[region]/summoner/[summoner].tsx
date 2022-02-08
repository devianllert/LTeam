import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Head from 'next/head';
import { RiSearchLine } from 'react-icons/ri';
import axios from 'axios';

import { summonerRequest, SummonerResponse } from '@/modules/summoner/api';
import { getSummonerByName } from '@/modules/riot/api/summoner';
import { SummonerV4DTO } from '@/modules/riot/interfaces/summoner.interface';
import { RecentSummoner } from '@/modules/summoner/interfaces/summoner.interface';
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
import * as Text from '@/common/components/system/Text';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { useRecentSummoners } from '@/modules/summoner/hooks/useRecentSummoners';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import { LoLRegion } from '@/modules/riot/constants/platforms';
import { getRegionFromAlias } from '@/modules/summoner/utils/region';

const logger = createLogger('Index');

type GetServerSidePageProps = SSRPageProps;

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

  const commonServerSideProps = await getCoreServerSideProps()(context);

  const region = context.query.region as RegionAlias;
  const summoner = context.query.summoner as string;

  const regionKey = getRegionFromAlias(region).key;

  const queryClient = new QueryClient();

  if ('props' in commonServerSideProps) {
    const {
      props: { ...pageData },
    } = commonServerSideProps;

    try {
      await queryClient.fetchQuery(['summoner', region, summoner], () => getSummonerByName({ platform: regionKey as LoLRegion, name: summoner }));

      return {
        // Props returned here will be available as page properties (pageProps)
        props: {
          ...pageData,
          [REACT_QUERY_STATE_PROP_NAME]: dehydrate(queryClient),
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error('Errors were detected in query.');
    }
  } else {
    return commonServerSideProps;
  }
};

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
  const summonerName = summoner as string;

  const query = useQuery(['summoner', region, summoner], async () => {
    const { data } = await axios.get<SummonerV4DTO>(`/api/riot/${region as string}/summoner/${summonerName}`);

    return data;
  });

  const { addRecentSummoner } = useRecentSummoners();

  React.useEffect(() => {
    const searchedSummoner: RecentSummoner = {
      name: query.data?.name ?? '',
      region: region as RegionAlias,
      icon: query.data?.profileIconId ?? 0,
      id: query.data?.id ?? '',
    };

    addRecentSummoner(searchedSummoner);
  }, [query.data?.id]);

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
            defaultValue={summoner}
          />
        </Box>
      </Box>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
