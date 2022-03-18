import * as React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';

import { RiSearchLine } from 'react-icons/ri';

import { MainLayout } from '@/layouts/main/components/MainLayout';
import { Box } from '@/common/components/layout/Box';
import { InputAdornment } from '@/common/components/system/Input/InputAdornment';
import { Input } from '@/common/components/system/Input';
import { Stack } from '@/components/layout/Stack';

import { ChampionCard } from '@/modules/champions/components/ChampionCard';

import { Container } from '@/common/components/layout/Container';

import { AllChampions } from '@/modules/champions/interfaces/champion';
import { IconButton } from '@/common/components/system/IconButton';

export const IndexPage = () => {
  const query = useQuery(['champions'], async () => {
    const { data } = await axios.get<AllChampions>('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json');
    const champions = Object.values(data.data);

    return champions;
  });

  const [searchedChampions, setSearchedChampions] = React.useState('');

  const champions = searchedChampions ? (query.data.filter((champion) => champion.name.toLowerCase().match(searchedChampions.toLowerCase())) ?? []) : (query.data ?? []);

  return (
    <>
      <Container>

        <Box
          maxWidth="200px"
          width="100%"
          mt={5}
          mb={5}
        >
          <Input
            suffix={(
              <InputAdornment position="end">
                <IconButton size="small" edge="end">
                  <RiSearchLine />
                </IconButton>
              </InputAdornment>
            )}
            onChange={(event) => setSearchedChampions(event.currentTarget.value)}
            color="black"
            fullWidth
            placeholder="Search champion"
          />
        </Box>
        <Box
          display="grid"
          gridGap="8px"
          gridTemplateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)']}
        >
          {champions.map((champion) => (
            <ChampionCard
              key={champion.key}
              championKey={champion.key}
              championName={champion.name}
              championId={champion.id}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
