import * as React from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { RiSearchLine } from 'react-icons/ri';

import Link from 'next/link';
import { summonerRequest, SummonerLeagueStatsData } from '@/modules/summoner/api';

import { regions } from '@/modules/summoner/constants/regions';

import { Summoner, readFromLocalStorage } from '@/modules/summoner/utilits/storage';

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

  const [summoner, setSummoner] = React.useState('');
  const [searchedSummoners, setSearchedSummoners] = React.useState(readFromLocalStorage('ResentlySearchedSummoners') as Summoner[] ?? []);
  const [region, setRegion] = React.useState('euw1');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!summoner.trim()) return;

    await router.push(`/${region}/summoner/${summoner}`);
  };

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
          onSubmit={onSubmit}
          display="flex"
          flexDirection="column"
        >
          <Input
            suffix={(
              <InputAdornment position="end">
                <select
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setRegion(event.currentTarget.value)}
                  value={region}
                >
                  {regions.map((data) => {
                    return (
                      <option value={data.region} key={data.region}>{data.value}</option>
                    );
                  })}
                </select>

                <IconButton size="small" edge="end" onClick={onSubmit}>
                  <RiSearchLine />
                </IconButton>
              </InputAdornment>
            )}
            color="black"
            fullWidth
            placeholder="Search summoner"
            value={summoner}
            onChange={(event) => setSummoner(event.currentTarget.value)}
          />
          <ol>
            {searchedSummoners.map((data) => {
              return (
                <li
                  key={data.summonerId}
                >
                  <Link href={`/${data.summonerRegion.region}/summoner/${data.summonerName}`}>
                    <Box
                      display="flex"
                    >
                      <Text.Paragraph>{data.summonerRegion.value}</Text.Paragraph>
                      <Text.Paragraph>{data.summonerName}</Text.Paragraph>
                    </Box>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Box>
      </Box>
    </>
  );
};

export const getStaticProps = getTranslationsStaticProps(['common', 'index']);

IndexPage.Layout = MainLayout;

export default IndexPage;
