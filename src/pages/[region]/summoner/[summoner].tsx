import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Head from 'next/head';
import axios from 'axios';

import { SummonerBasicInfo } from '@/modules/riot/interfaces/summoner.interface';
import { RecentSummoner } from '@/modules/summoner/interfaces/summoner.interface';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { MainLayout } from '@/layouts/main/components/MainLayout';
import { getAppTitle } from '@/modules/core/meta/meta';
import { SummonerProfileStats } from '@/modules/summoner/components/SummonerProfileStats';
import { Box } from '@/common/components/layout/Box';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { useRecentSummoners } from '@/modules/summoner/hooks/useRecentSummoners';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import { LoLRegion, regionToCluster } from '@/modules/riot/constants/platforms';
import { getRegionFromAlias } from '@/modules/summoner/utils/region';
import { getSummonerByName } from '@/modules/riot/api/summoner';
import { getMatches } from '@/modules/riot/api/match';
import { getSummonerLeagues } from '@/modules/riot/api/league';
import { MatchList } from '@/modules/match/components/MatchList';
import { Container } from '@/common/components/layout/Container';
import { getSummonerSpellsData } from '@/modules/riot/api/summonerSpells';
import { getSummonerRunesData } from '@/modules/riot/api/summonerRunes';
import { SummonerInput } from '@/modules/summoner/components/SummonerInput';

const logger = createLogger('Index');

type GetServerSidePageProps = SSRPageProps;

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

  const commonServerSideProps = await getCoreServerSideProps(['index'])(context);

  const region = context.query.region as RegionAlias;
  const summoner = context.query.summoner as string;

  const regionKey = getRegionFromAlias(region).key as LoLRegion;

  const queryClient = new QueryClient();

  if ('props' in commonServerSideProps) {
    const {
      props: { ...pageData },
    } = commonServerSideProps;

    try {
      const data = await queryClient.fetchQuery(['summoner', region, summoner], async () => {
        const account = await getSummonerByName({ platform: regionKey, name: summoner });
        const leagues = await getSummonerLeagues({ platform: regionKey, summonerId: account.id });

        return {
          account,
          leagues,
        };
      });

      await queryClient.fetchQuery(['matches', summoner], async () => {
        const getSummonerSpellPromise = getSummonerSpellsData();
        const getSummonerRunesPromise = getSummonerRunesData();
        const getMatchesPromise = getMatches({
          platform: regionToCluster(regionKey),
          puuid: data.account.puuid,
          limit: 5,
          offset: 0,
        });
        const [
          summonerSpellsData,
          summonerRunesData,
          matches,
        ] = await Promise.all([getSummonerSpellPromise, getSummonerRunesPromise, getMatchesPromise]);

        return {
          data: matches,
          summonerSpellsData,
          summonerRunes: summonerRunesData,
        };
      });

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
    const { data } = await axios.get<SummonerBasicInfo>(`/api/riot/${region as string}/summoner/${summonerName}`);

    return data;
  }, {
    refetchOnWindowFocus: false,
  });

  const { addRecentSummoner } = useRecentSummoners();

  React.useEffect(() => {
    const searchedSummoner: RecentSummoner = {
      name: query.data?.account.name ?? '',
      region: region as RegionAlias,
      icon: query.data?.account.profileIconId ?? 0,
      id: query.data?.account.id ?? '',
    };

    addRecentSummoner(searchedSummoner);
  }, [query.data?.account.id]);

  return (
    <>
      <Head>
        <title>{getAppTitle('Search')}</title>
      </Head>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={24}
        left="calc(50% - 152px)"
        zIndex={1}
      >
        <SummonerInput />
      </Box>

      <Container>
        <SummonerProfileStats
          summonerLevel={query.data?.account.summonerLevel ?? 0}
          profileIconId={query.data?.account.profileIconId ?? 0}
          summonerName={query.data?.account.name ?? ''}
          profileStats={query.data?.leagues}
        />

        {query.data?.account.puuid && <MatchList puuid={query.data.account.puuid} />}

      </Container>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
