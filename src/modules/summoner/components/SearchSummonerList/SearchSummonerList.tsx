import * as React from 'react';
import Link from 'next/link';
import {
  RiHistoryFill,
  RiStarFill,
  RiStarLine,
} from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

import { useRecentSummoners } from '@/modules/summoner/hooks/useRecentSummoners';

import { Box } from '@/common/components/system/Box';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';
import { IconButton } from '@/common/components/system/IconButton';
import { Stack } from '@/common/components/system/Stack';
import * as Text from '@/common/components/system/Text';

import { RecentSummoner } from '@/modules/summoner/interfaces/summoner.interface';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import shadows from '@/common/design/tokens/shadows';

interface SummonerItemProps {
  id: string;
  region: RegionAlias;
  name: string;
  icon: number;
  type: 'favorite' | 'recent';
  onDelete: (id: string) => void;
  onAddToFavorite?: (summoner: RecentSummoner) => void;
}

const SummonerItem = (props: SummonerItemProps) => {
  const {
    id,
    region,
    name,
    icon,
    type,
    onDelete,
    onAddToFavorite,
  } = props;

  return (
    <Box
      backgroundColor="background.primary"
      display="flex"
      py={2}
      pr={2}
      pl={3}
      width="100%"
      alignItems="center"
      justifyContent="flex-start"
      borderRadius={4}
      boxShadow={shadows[1]}
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
          {type === 'favorite' ? <RiStarFill size={24} color="orange" /> : <RiHistoryFill size={24} />}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="4px 8px"
            marginLeft={3}
            borderRadius={4}
            backgroundColor="radix.primary5"
          >
            <Text.Caption variant="caption1" color="radix.primary11">
              {region.toUpperCase()}
            </Text.Caption>
          </Box>
        </Box>

        <Box
          component="img"
          width={32}
          height={32}
          alt="Summoner icon"
          borderRadius="50%"
          mr={2}
          src={`http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/${icon}.png`}
        />

        <Link href={`/${region}/summoner/${name}`} passHref>
          <Text.Paragraph
            component="a"
            variant="body2"
            color="radix.primary"
            noWrap
          >
            {name}
          </Text.Paragraph>
        </Link>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        marginLeft="auto"
      >
        {type === 'recent' && (
          <IconButton
            title="Add to favorite"
            label="Add to favorite"
            onClick={() => onAddToFavorite?.({
              id,
              name,
              icon,
              region,
            })}
          >
            <RiStarLine size={24} />
          </IconButton>
        )}
        <IconButton
          title="Delete from list"
          label="Delete from list"
          onClick={() => onDelete(id)}
        >
          <IoMdClose size={24} />
        </IconButton>
      </Box>
    </Box>
  );
};

export const SearchSummonerList = () => {
  const {
    recent,
    favorites,
    addFavoriteSummoner,
    deleteFavoriteSummoner,
    deleteRecentSummoner,
  } = useRecentSummoners();

  return (
    <DisplayOnBrowserMount>
      {((recent.length > 0) || (recent.length > 0)) && (
        <Box
          padding={3}
          backgroundColor="radix.gray4"
          borderRadius={4}
          boxShadow={shadows[4]}
        >
          <Stack space={4} direction="column" component="ul">
            {recent.length > 0 && (
              <Box>
                <Text.Paragraph component="h6" variant="body2">Recent</Text.Paragraph>

                <Stack space={2} component="ul" direction="column">
                  {recent.map((summoner) => (
                    <SummonerItem
                      key={summoner.id}
                      type="recent"
                      id={summoner.id}
                      icon={summoner.icon}
                      name={summoner.name}
                      region={summoner.region}
                      onDelete={deleteRecentSummoner}
                      onAddToFavorite={addFavoriteSummoner}
                    />
                  ))}
                </Stack>
              </Box>
            )}
            {favorites.length > 0 && (
              <Box>
                <Text.Paragraph component="h6" variant="body2">Favorites</Text.Paragraph>

                <Stack space={2} direction="column" component="ul">
                  {favorites.map((summoner) => (
                    <SummonerItem
                      key={summoner.id}
                      type="favorite"
                      id={summoner.id}
                      icon={summoner.icon}
                      name={summoner.name}
                      region={summoner.region}
                      onDelete={deleteFavoriteSummoner}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Box>
      )}
    </DisplayOnBrowserMount>
  );
};
