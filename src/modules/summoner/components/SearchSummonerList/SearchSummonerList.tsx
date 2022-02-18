import * as React from 'react';
import Link from 'next/link';
import {
  RiCloseLine,
  RiHistoryFill,
  RiStarFill,
  RiStarLine,
} from 'react-icons/ri';
import { useTranslation } from 'next-i18next';

import { useRecentSummoners } from '@/modules/summoner/hooks/useRecentSummoners';
import { Box } from '@/common/components/layout/Box';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';
import { IconButton } from '@/common/components/system/IconButton';
import { Stack } from '@/common/components/layout/Stack';
import * as Text from '@/common/components/system/Text';
import { RecentSummoner } from '@/modules/summoner/interfaces/summoner.interface';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import shadows from '@/common/design/tokens/shadows';

import * as S from './styled';

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

  const { t } = useTranslation('index');

  return (
    <Box
      backgroundColor="background.primary"
      display="flex"
      py="12px"
      px={2}
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
          minWidth={84}
          alignItems="center"
        >
          {type === 'favorite' ? <RiStarFill size={24} color="orange" /> : <RiHistoryFill size={24} />}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="4px 8px"
            marginLeft={2}
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
            fontWeight={500}
            color="radix.primary11"
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
            size="small"
            title={t('found.actions.addToFavorite')}
            label={t('found.actions.addToFavorite')}
            onClick={() => onAddToFavorite?.({
              id,
              name,
              icon,
              region,
            })}
          >
            <RiStarLine />
          </IconButton>
        )}
        <IconButton
          size="small"
          title={t('found.actions.delete')}
          label={t('found.actions.delete')}
          onClick={() => onDelete(id)}
        >
          <RiCloseLine />
        </IconButton>
      </Box>
    </Box>
  );
};

export const SearchSummonerList = () => {
  const { t } = useTranslation('index');

  const {
    recent,
    favorites,
    addFavoriteSummoner,
    deleteFavoriteSummoner,
    deleteRecentSummoner,
  } = useRecentSummoners();

  return (
    <DisplayOnBrowserMount>
      {((recent.length > 0) || (favorites.length > 0)) && (
        <Box
          backgroundColor="radix.gray4"
          borderRadius={4}
          boxShadow={shadows[4]}
          py={3}
        >
          <Box
            component={S.ScrollbarArea}
            maxHeight={320}
            overflowY="scroll"
            px={3}
            pr={1}
          >
            <Stack space={4} direction="column" component="ul">
              {recent.length > 0 && (
                <Box>
                  <Text.Paragraph component="h6" variant="body2">{t('found.recent.title')}</Text.Paragraph>

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
                  <Text.Paragraph component="h6" variant="body2">{t('found.favorites.title')}</Text.Paragraph>

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
        </Box>
      )}
    </DisplayOnBrowserMount>
  );
};
