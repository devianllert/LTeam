import * as React from 'react';

import {
  RiHistoryFill,
  RiStarFill,
  RiStarLine,
} from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

import { useRouter } from 'next/router';
import { useRecentSummoners } from '@/modules/summoner/hooks/useRecentSummoners';
import { useFavoriteSummoners } from '@/modules/summoner/hooks/useFavoriteSummoner';

import { Box } from '@/common/components/system/Box';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';
import { Button } from '@/common/components/system/Button';
import { IconButton } from '@/common/components/system/IconButton';
import * as Text from '@/common/components/system/Text';

import * as S from './styled';

export const LocalStorageSummoners = () => {
  const [recentSummoners] = useRecentSummoners();
  const [favoriteSummoners, setFavoriteSummoners] = useFavoriteSummoners();

  const router = useRouter();

  const ClickOnSummoner = async (region, summoner) => {
    await router.push(`/${region}/summoner/${summoner}`);
  };

  const deleteSummoner = () => {};

  return (
    <DisplayOnBrowserMount>
      <Box
        padding={3}
        backgroundColor="white"
      >
        {recentSummoners.length > 0 && (
          <S.Ul>
            Recent
            {recentSummoners.map((data) => {
              return (
                <S.Li
                  key={data.id}
                >
                  <Button
                    onClick={() => ClickOnSummoner(data.region, data.name)}
                    variant="text"
                    fullWidth
                  >
                    <Box
                      display="flex"
                      padding={2}
                      width="100%"
                      alignItems="center"
                      justifyContent="flex-start"
                      backgroundColor="whitesmoke"
                      borderRadius={4}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        flex={1}
                      >
                        <RiHistoryFill size={24} color="inherit" />

                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          backgroundColor="white"
                          padding="2px 4px"
                        >{data.region}
                        </Box>

                        <Text.Paragraph lineHeight={1}>{data.name}</Text.Paragraph>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        flex={1}
                      >
                        <IconButton color="inherit">
                          <RiStarLine size={24} onClick={() => setFavoriteSummoners(data)} />
                        </IconButton>
                        <IconButton color="inherit">
                          <IoMdClose size={24} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Button>
                </S.Li>
              );
            })}
          </S.Ul>
        )}
        <Box
          marginTop={3}
        >
          {favoriteSummoners.length > 0 && (
            <S.Ul>
              Favorite
              {favoriteSummoners.map((data) => {
                return (
                  <S.Li
                    key={data.id}
                  >
                    <Button
                      onClick={() => ClickOnSummoner(data.region, data.name)}
                      variant="text"
                      fullWidth
                    >
                      <Box
                        display="flex"
                        padding={2}
                        width="100%"
                        alignItems="center"
                        justifyContent="flex-start"
                        backgroundColor="whitesmoke"
                        borderRadius={4}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          flex={1}
                        >
                          <RiHistoryFill size={24} color="inherit" />

                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            backgroundColor="white"
                            padding="2px 4px"
                          >{data.region}
                          </Box>

                          <Text.Paragraph>{data.name}</Text.Paragraph>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                          flex={1}
                        >
                          <IconButton>
                            <RiStarFill size={24} color="gold" />
                          </IconButton>
                          <IconButton color="inherit">
                            <IoMdClose size={24} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Button>
                  </S.Li>
                );
              })}
            </S.Ul>
          )}
        </Box>
      </Box>
    </DisplayOnBrowserMount>
  );
};
