import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import * as React from 'react';

import NextLink from 'next/link';

import { dehydrate, QueryClient, useQuery } from 'react-query';

import { RiSearchLine } from 'react-icons/ri';
import axios from 'axios';
import { Link } from '@/common/components/system/Link';

import { Box } from '@/common/components/system/Box';
import { InputAdornment } from '@/common/components/system/Input/InputAdornment';
import { Input } from '@/common/components/system/Input';
import * as Text from '@/common/components/system/Text';

import { fetchAllChampions, fetchFreeChampion } from '@/modules/champions/api/api';
import { createLogger } from '@/modules/core/logging/logger';
import { IconButton } from '@/common/components/system/IconButton';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';

import { FreeChampions } from '@/modules/champions/interfaces/champion.interface';

const logger = createLogger('Champions');

type GetServerSidePageProps = SSRPageProps;

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

  const commonServerSideProps = await getCoreServerSideProps()(context);

  const queryClient = new QueryClient();

  if ('props' in commonServerSideProps) {
    const {
      props: { ...pageData },
    } = commonServerSideProps;

    try {
      await queryClient.fetchQuery(['champions'], async () => {
        const champions = await fetchAllChampions();
        const fetchedCampions = Object.values(champions);
        const data = await fetchFreeChampion();
        return {
          allChampions: fetchedCampions,
          freeChampions: data,
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
      // logger.error(error);
      throw new Error('Errors were detected in query.');
    }
  } else {
    return commonServerSideProps;
  }
};

const ChampionsPage: NextPage = () => {
  const query = useQuery(['champions'], async () => {
    const champions = await fetchAllChampions();
    const fetchedCampions = Object.values(champions);
    const { data } = await axios.get<FreeChampions>('/api/champions');
    return {
      allChampions: fetchedCampions,
      freeChampions: data,
    };
  });

  const [searchedChampion, setSearchedChampion] = React.useState('');
  const [outputChampions, setOutputChampions] = React.useState(query.data?.allChampions || []);

  React.useEffect(() => {
    if (searchedChampion === '') {
      setOutputChampions(query.data?.allChampions || []);
    } else {
      setOutputChampions(query.data?.allChampions.filter((champion) => champion.name.toLowerCase().match(searchedChampion.toLowerCase())) || []);
    }
  }, [searchedChampion, query.data]);

  return (
    <>
      <Box
        maxWidth="200px"
        width="100%"
      >
        <Input
          suffix={(
            <InputAdornment position="end">
              <IconButton size="small" edge="end">
                <RiSearchLine />
              </IconButton>
            </InputAdornment>
            )}
          onChange={(event) => setSearchedChampion(event.currentTarget.value)}
          color="black"
          fullWidth
          placeholder="Search champion"
        />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
      >
        {outputChampions.map((champion) => (
          <Box
            key={champion.id}
            margin="8px 8px 8px 0"
          >
            <NextLink href={`/champions/${champion.id}`} passHref>
              <Link href={`/champions/${champion.id}`}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    border={query.data?.freeChampions.freeChampionIds.includes(Number(champion.key)) ? '1px solid' : 'none'}
                    borderColor="radix.yellow9"
                  >
                    <img
                      src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.key}.png`}
                      alt=""
                      width={96}
                      height={96}
                    />
                  </Box>
                  <Text.Paragraph
                    variant="body3"
                  >
                    {champion.name}
                  </Text.Paragraph>
                </Box>
              </Link>
            </NextLink>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ChampionsPage;
