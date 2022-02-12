import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Head from 'next/head';
import axios from 'axios';

import { SummonerV4DTO } from '@/modules/riot/interfaces/summoner.interface';
import { SummonerLeagueDTO } from '@/modules/riot/interfaces/league.interface';
import { RecentSummoner } from '@/modules/summoner/interfaces/summoner.interface';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { MainLayout } from '@/layouts/main/components/MainLayout';
import { getAppTitle } from '@/modules/core/meta/meta';
import { SummonerProfileStats } from '@/modules/summoner/components/SummonerProfileStats';
import { Match } from '@/modules/summoner/components/Match';
import { Box } from '@/common/components/system/Box';
import * as Text from '@/common/components/system/Text';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { useRecentSummoners } from '@/modules/summoner/hooks/useRecentSummoners';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import { LoLRegion, regionToCluster } from '@/modules/riot/constants/platforms';
import { getRegionFromAlias } from '@/modules/summoner/utils/region';
import { getSummonerByName } from '@/modules/riot/api/summoner';
import { getAllMatches, getMatchesFullInfo } from '@/modules/riot/api/match';
import { getSummonerLeague } from '@/modules/riot/api/league';
import { MatchDTO } from '@/modules/riot/interfaces/match.interface';
import { Stack } from '@/common/components/system/Stack';

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
      await queryClient.fetchQuery(['summoner', region, summoner], async () => {
        const summonerInfo = await getSummonerByName({ platform: regionKey as LoLRegion, name: summoner });
        const allMatches = await getAllMatches({
          platform: regionToCluster(regionKey as LoLRegion),
          puuid: summonerInfo.puuid,
          limit: 10,
          offset: 0,
        });

        const allMatchesInfo = await getMatchesFullInfo({ platform: regionToCluster(regionKey as LoLRegion), matchesId: allMatches });
        console.log(allMatchesInfo);
        const summonerLeagueStats = await getSummonerLeague({ platform: regionKey as LoLRegion, summonerId: summonerInfo.id });
        return {
          summonerInfo,
          summonerLeagueStats,
          allMatchesInfo,
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
    const summonerInfo = await axios.get<SummonerV4DTO>(`/api/riot/${region as string}/summoner/${summonerName}`);
    const summonerLeagueStats = await axios.get<SummonerLeagueDTO[]>(`/api/riot/${region as string}/league/${summonerInfo.data.id}`);
    const allMatches = await axios.get<MatchDTO[]>(`/api/riot/${region as string}/matches/${summonerInfo.data.puuid}`);

    return {
      summonerInfo: summonerInfo.data,
      allMatchesInfo: allMatches.data,
      summonerLeagueStats: summonerLeagueStats.data,
    };
  });

  console.log(query.data);

  const { addRecentSummoner } = useRecentSummoners();

  React.useEffect(() => {
    const searchedSummoner: RecentSummoner = {
      name: query.data?.summonerInfo.name ?? '',
      region: region as RegionAlias,
      icon: query.data?.summonerInfo.profileIconId ?? 0,
      id: query.data?.summonerInfo.id ?? '',
    };

    addRecentSummoner(searchedSummoner);
  }, [query.data?.summonerInfo.id]);

  const getWinRate = () => {
    const win = query.data?.summonerLeagueStats[0].wins ?? 0;
    const lose = query.data?.summonerLeagueStats[0].losses ?? 0;

    const winRate = (win / (win + lose)) * 100;
    return winRate;
  };

  const winRate = getWinRate();
  const matches = query.data?.allMatchesInfo ?? [];
  // console.log(matches);

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

        <SummonerProfileStats
          summonerLevel={query.data?.summonerInfo.summonerLevel ?? 0}
          profileIconId={query.data?.summonerInfo.profileIconId ?? 0}
          summonerName={query.data?.summonerInfo.name ?? ''}
          profileStats={query.data?.summonerLeagueStats[0] ?? {} as SummonerLeagueDTO}
        />

        <Box
          marginTop={3}
        >
          <Stack
            direction="column"
            space={4}
          >
            {matches.map((matchData) => (
              <Match
                key={matchData.metadata.matchId}
                matchData={matchData}
                summoner={query.data?.summonerInfo.puuid ?? ''}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
