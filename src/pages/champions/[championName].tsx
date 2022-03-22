import * as React from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Head from 'next/head';
import axios from 'axios';

import { MainLayout } from '@/layouts/main/components/MainLayout';
import { getAppTitle } from '@/modules/core/meta/meta';
import { Box } from '@/common/components/layout/Box';

import { ChampionBanner } from '@/modules/champions/components/ChampionBanner';
import { Card } from '@/modules/champions/components/Card';
import { ChampionStart } from '@/modules/champions/components/ChampionStart';
import { ChampionSkillLine } from '@/modules/champions/components/ChampionSkillLine';
import { ChampionSkillsTable } from '@/modules/champions/components/ChampionSkillsTable';

import { Container } from '@/common/components/layout/Container';
import { Stack } from '@/common/components/layout/Stack';

import { ChampionParamentrs } from '@/modules/champions/interfaces/champion';

import { capitalize } from '@/modules/core/js/string';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';

const statsSpells = {
  mostFrequent: {
    items: [
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerDot.png',
    ],
    games: 11058,
    winRate: 49.90,
  },
  mostWinRate: {
    items: [
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
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

export const ChampionPage: EnhancedNextPage = ():JSX.Element => {
  const router = useRouter();

  const { championName } = router.query;
  const champion = capitalize(championName as string ?? '');

  const query = useQuery(['champion', champion], async () => {
    const { data } = await axios.get<ChampionParamentrs>(`https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${champion}.json`);

    return data;
  });
  const championKey = query.data?.data[champion].key;

  return (
    <>
      <Head>
        <title>{getAppTitle('Search')}</title>
      </Head>

      <ChampionBanner
        championRole="Support"
        rank={5}
        winRate={58.21}
        championName={champion}
        championKey={championKey as string}
      />

      <Container>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          mt={3}
          overflowX="auto"
        >
          <Card
            cardHeading="Skill Path"
          >
            <Box
              display="flex"
              flexDirection="column"
            >
              <Box
                my={1}
              >
                <ChampionSkillLine
                  type="Q"
                  skillName={query.data?.data[champion].spells[0].name ?? ''}
                  skiillImg={query.data?.data[champion].spells[0].image.full ?? ''}
                  takenAtLvl={[1, 4, 5, 7, 9]}
                />
              </Box>
              <Box
                my={2}
              >
                <ChampionSkillLine
                  type="W"
                  skillName={query.data?.data[champion].spells[1].name ?? ''}
                  skiillImg={query.data?.data[champion].spells[1].image.full ?? ''}
                  takenAtLvl={[3, 14, 15, 17, 18]}
                />
              </Box>
              <Box
                my={2}
              >
                <ChampionSkillLine
                  type="E"
                  skillName={query.data?.data[champion].spells[2].name ?? ''}
                  skiillImg={query.data?.data[champion].spells[2].image.full ?? ''}
                  takenAtLvl={[2, 8, 10, 12, 13]}
                />
              </Box>
              <Box
                my={2}
              >
                <ChampionSkillLine
                  type="R"
                  skillName={query.data?.data[champion].spells[3].name ?? ''}
                  skiillImg={query.data?.data[champion].spells[3].image.full ?? ''}
                  takenAtLvl={[6, 11, 16]}
                />
              </Box>
              <Box
                my={2}
              >
                <ChampionSkillLine
                  type="P"
                  skillName={query.data?.data[champion].passive.name ?? ''}
                  skiillImg={query.data?.data[champion].passive.image.full ?? ''}
                />
              </Box>
            </Box>
          </Card>
        </Box>

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

ChampionPage.Layout = MainLayout;

export default ChampionPage;
