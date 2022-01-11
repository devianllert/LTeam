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

import * as S from './styled';
import { RecentSummoner } from '../../interfaces/summoner.interface';

export const LocalStorageSummoners = () => {
  const [recentSummoners, setRecentSummoners, deleteRecentSummoner] = useRecentSummoners();
  const [favoriteSummoners, setFavoriteSummoners, deleteFavoriteSummoner] = useFavoriteSummoners();

  const addToFavorite = (data: RecentSummoner) => {
    setFavoriteSummoners(data);
    deleteRecentSummoner(data);
  };

  return (
    <DisplayOnBrowserMount>
      {((recentSummoners.length > 0) || (favoriteSummoners.length > 0)) && (
      <Box
        padding={3}
        backgroundColor="radix.gray3"
      >
        {recentSummoners.length > 0 && (
          <>
            <Text.Paragraph>Recent</Text.Paragraph>

            <Stack component={S.Ul} direction="column">
              {recentSummoners.map((data) => {
                return (
                  <Box
                    component="li"
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
                      <IconButton color="inherit">
                        <RiStarLine size={24} onClick={() => addToFavorite(data)} />
                      </IconButton>
                      <IconButton color="inherit" onClick={() => deleteRecentSummoner(data)}>
                        <IoMdClose size={24} />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
        <Box
          marginTop={3}
        >
          {favoriteSummoners.length > 0 && (
            <>
              <Text.Paragraph>Favorite</Text.Paragraph>
              <S.Ul>
                {favoriteSummoners.map((data) => {
                  return (
                    <S.Li
                      key={data.id}
                    >
                      <Box
                        display="flex"
                        padding={2}
                        width="100%"
                        alignItems="center"
                        justifyContent="flex-start"
                        backgroundColor="radix.gray1"
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
                              backgroundColor="radix.gray5"
                              padding="4px 8px"
                              marginLeft={3}
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
                          <RiStarFill size={24} color="gold" />

                          <IconButton color="inherit" onClick={() => deleteFavoriteSummoner(data)}>
                            <IoMdClose size={24} />
                          </IconButton>
                        </Box>
                      </Box>
                    </S.Li>
                  );
                })}
              </S.Ul>
            </>
          )}
        </Box>
      </Box>
      )}
    </DisplayOnBrowserMount>
  );
};
