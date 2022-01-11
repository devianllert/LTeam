import * as React from 'react';
import Link from 'next/link';
import {
  RiHistoryFill,
  RiStarFill,
  RiStarLine,
} from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

import { useRecentSummoners } from '@/modules/summoner/hooks/useRecentSummoners';
import { useFavoriteSummoners } from '@/modules/summoner/hooks/useFavoriteSummoner';

import { Box } from '@/common/components/system/Box';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';
import { IconButton } from '@/common/components/system/IconButton';
import { Stack } from '@/common/components/system/Stack';
import * as Text from '@/common/components/system/Text';

import { RecentSummoner } from '../../interfaces/summoner.interface';

interface SummonersProps {
  summonersList: RecentSummoner[];
  title: 'Recent' | 'Favorite';
  onStar?: (data: RecentSummoner) => void;
  onDelete: (data: RecentSummoner) => void;
}

const Summoners = (props: SummonersProps) => {
  const {
    summonersList,
    title,
    onStar,
    onDelete,
  } = props;
  return (
    <div>
      <Text.Paragraph>{title}</Text.Paragraph>

      <Stack
        component="ul"
        direction="column"
      >
        {summonersList.map((data) => {
          return (
            <Box
              key={data.id}
              backgroundColor="radix.gray1"
              display="flex"
              padding={2}
              width="100%"
              alignItems="center"
              justifyContent="flex-start"
              borderRadius={4}
            >
              <Box
                display="flex"
                alignItems="center"
                flex={1}
              >

                <Box
                  display="flex"
                  minWidth={96}
                  alignItems="center"
                >
                  <RiHistoryFill size={24} color="inherit" />

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding="4px 8px"
                    marginLeft={3}
                    backgroundColor="radix.gray5"
                  >
                    {data.region.toUpperCase()}
                  </Box>
                </Box>

                <Link href={`/${data.region}/summoner/${data.name}`} passHref>
                  <Text.Paragraph
                    component="a"
                    variant="body2"
                  >
                    {data.name}
                  </Text.Paragraph>
                </Link>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                marginLeft="auto"
              >
                <IconButton color="inherit" onClick={() => onStar?.(data)}>
                  {title === 'Recent' ? <RiStarLine size={24} /> : <RiStarFill size={24} color="gold" />}
                </IconButton>
                <IconButton color="inherit" onClick={() => onDelete(data)}>
                  <IoMdClose size={24} />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </div>
  );
};

export const LocalStorageSummoners = () => {
  const [recentSummoners, setRecentSummoners, deleteRecentSummoner] = useRecentSummoners();
  const [favoriteSummoners, setFavoriteSummoners, deleteFavoriteSummoner] = useFavoriteSummoners();

  const addToFavorite = (data: RecentSummoner) => {
    setFavoriteSummoners(data);
    deleteRecentSummoner(data);
  };

  const deleteFromRecent = (data: RecentSummoner) => {
    deleteRecentSummoner(data);
  };

  const deleteFromFavorite = (data: RecentSummoner) => {
    deleteFavoriteSummoner(data);
  };

  return (
    <DisplayOnBrowserMount>
      {((recentSummoners.length > 0) || (favoriteSummoners.length > 0)) && (
      <Box
        padding={3}
        backgroundColor="radix.gray3"
      >
        <Stack direction="column">

          {recentSummoners.length > 0 && (
            <Summoners
              summonersList={recentSummoners}
              title="Recent"
              onStar={addToFavorite}
              onDelete={deleteFromRecent}
            />
          )}
          {favoriteSummoners.length > 0 && (
            <Summoners
              summonersList={favoriteSummoners}
              title="Favorite"
              onDelete={deleteFromFavorite}
            />
          )}
        </Stack>
      </Box>
      )}
    </DisplayOnBrowserMount>
  );
};
