import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';

import * as React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import {
  ChampionPreview,
  FetchedChampion,
  Spell,
  Passive,
} from '@/modules/champions/interfaces/champion.interface';
import { fetchChampion } from '@/modules/champions/api/api';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { getCoreServerSideProps } from '@/layouts/core/SSR';
import { REACT_QUERY_STATE_PROP_NAME } from '@/modules/core/rquery/react-query';
import { replaceAllOccurrences } from '@/modules/core/js/string';

import { Box } from '@/common/components/system/Box';
import { Button } from '@/common/components/system/Button';
import * as Text from '@/common/components/system/Text';
import { AbilityDescription } from '@/modules/champions/components/AbilityDescription';

import { abilityButton } from '@/modules/champions/constants/abilityButton';

type GetServerSidePageProps = SSRPageProps;

export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (
  context,
): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

  const commonServerSideProps = await getCoreServerSideProps()(context);

  const { champion } = context.query;

  const queryClient = new QueryClient();

  if ('props' in commonServerSideProps) {
    const {
      props: { ...pageData },
    } = commonServerSideProps;

    try {
      await queryClient.fetchQuery(['champions', champion], async () => {
        const data = await fetchChampion(champion as string);
        return data.data[champion as string];
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

const ChampionPage: NextPage = () => {
  const router = useRouter();
  const { champion } = router.query;

  const query = useQuery(['champions', champion], async () => {
    const data = await fetchChampion(champion as string);
    return data.data[champion as string];
  });
  console.log(query.data);

  const abilities = {
    passive: query.data?.passive,
    spells: query.data?.spells,
    type: query.data?.partype,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginLeft="auto"
      marginRight="auto"
    >
      <Box
        display="flex"
        flexDirection="column"
        marginTop={5}
        width="350px"
      >
        <Box
          display="flex"
        >

          <Box
            borderRadius="50%"
            overflow="hidden"
            width={96}
            height={96}
            border="2px solid"
            borderColor="radix.yellow9"
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/${query.data?.id as string}.png`}
              alt=""
              width={96}
              height={96}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            marginLeft={3}
          >
            <Text.Paragraph
              fontSize={32}
              fontWeight={700}
            >
              {query.data?.name}
            </Text.Paragraph>

            <Box
              display="flex"
              marginTop={1}
            >
              {query.data?.tags.map((tag, index) => (
                <Box
                  display="flex"
                  key={tag}
                >
                  <Text.Paragraph>{tag}</Text.Paragraph>
                  <Text.Paragraph>{query.data.tags.length !== index + 1 ? '/' : ''}</Text.Paragraph>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          marginTop={2}
        >
          {abilities.passive && abilities.spells && abilities.type && <AbilityDescription abilities={{ passive: abilities.passive, spells: abilities.spells, type: abilities.type }} />}
        </Box>
      </Box>
    </Box>
  );
};

export default ChampionPage;
