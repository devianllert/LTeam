import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RiCheckLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';

import { zIndex } from 'styled-system';
import { regions } from '@/modules/summoner/constants/regions';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';

import { Box } from '@/common/components/layout/Box';
import * as Text from '@/common/components/system/Text';
import * as Modal from '@/common/components/system/Modal';
import { Stack } from '@/common/components/layout/Stack';
import { ButtonBase } from '@/common/components/system/ButtonBase';
import { Input, InputAdornment } from '@/common/components/system/Input';
import { IconButton } from '@/common/components/system/IconButton';
import { shadows } from '@/common/design/tokens/shadows';
import { SearchSummonerList } from '@/modules/summoner/components/SearchSummonerList';

export const SummonerInput = () => {
  const { t } = useTranslation('index');
  const router = useRouter();

  const [summoner, setSummoner] = React.useState('');
  const [region, setRegion] = React.useState<RegionAlias>(regions.euw.value);
  const [regionsModalIsOpen, setRegionsModalIsOpen] = React.useState(false);
  const [isInputOpen, setIsInputOpen] = React.useState(false);

  React.useEffect(() => setIsInputOpen(false), [router.query]);

  const changeRegion = (newRegion: RegionAlias) => {
    setRegion(newRegion);
    setRegionsModalIsOpen(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!summoner.trim()) return;

    await router.push(`/${region}/summoner/${summoner}`);
    setSummoner('');
  };

  return (
    <Modal.Root open={isInputOpen} onOpenChange={setIsInputOpen}>
      <Modal.Trigger asChild>
        <Box>
          <Input
            fullWidth
            placeholder={t('search.title')}
            name="summonerUsername"
            onChange={(event) => setSummoner(event.currentTarget.value)}
            suffix={(
              <InputAdornment position="end">
                <Box minWidth="96px" display="flex" alignItems="center">
                  <Box
                    component={ButtonBase}
                    type="button"
                    ml="auto"
                    mr={1}
                    px={2}
                    borderRadius={4}
                    backgroundColor="radix.primary9"
                    color="white"
                  >
                    {region.toUpperCase()}
                  </Box>
                  <IconButton
                    title={t('search.actions.search')}
                    label={t('search.actions.search')}
                    size="small"
                    type="submit"
                  >
                    <RiSearchLine />
                  </IconButton>
                </Box>
              </InputAdornment>
                )}
          />
        </Box>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.StyledOverlay />
        <Box
          component={Modal.StyledContent}
          padding={3}
          borderRadius={4}
          boxShadow={shadows[4]}
          backgroundColor="background.secondary"
          position="absolute"
          top="30%"
          left="50%"
        >
          <Modal.Close asChild>
            <IconButton
              size="small"
              sx={{
                position: 'fixed',
                top: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <RiCloseLine />
            </IconButton>
          </Modal.Close>

          <Box
            padding={2}
            component="form"
            onSubmit={onSubmit}
            display="flex"
            flexDirection="column"
            maxWidth="440px"
          >
            <Input
              fullWidth
              placeholder={t('search.title')}
              name="summonerUsername"
              value={summoner}
              onChange={(event) => setSummoner(event.currentTarget.value)}
              suffix={(
                <InputAdornment position="end">
                  <Box minWidth="96px" display="flex" alignItems="center">
                    <Modal.Root open={regionsModalIsOpen} onOpenChange={setRegionsModalIsOpen}>
                      <Modal.Trigger asChild>
                        <Box
                          component={ButtonBase}
                          type="button"
                          ml="auto"
                          mr={1}
                          px={2}
                          borderRadius={4}
                          backgroundColor="radix.primary9"
                          color="white"
                        >
                          {region.toUpperCase()}
                        </Box>
                      </Modal.Trigger>

                      <Modal.Portal>
                        <Box
                          component={Modal.StyledOverlay}
                          zIndex={1300}
                        />

                        <Box
                          component={Modal.StyledContent}
                          padding={3}
                          borderRadius={4}
                          boxShadow={shadows[4]}
                          maxWidth="440px"
                          backgroundColor="background.secondary"
                        >
                          <Modal.Close asChild>
                            <IconButton
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                              }}
                            >
                              <RiCloseLine />
                            </IconButton>
                          </Modal.Close>

                          <Modal.Title asChild>
                            <Text.Heading variant="h6" textAlign="center">{t('regions.title')}</Text.Heading>
                          </Modal.Title>

                          <Box component={Stack} direction={['column', 'row']} mt={3}>
                            {Object.keys(regions).map((item) => (
                              <Box
                                width={['100%', '96px']}
                                key={item}
                              >
                                <Box
                                  component={ButtonBase}
                                  type="button"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  width="100%"
                                  color={region === item ? 'radix.primary11' : 'text.primary'}
                                  onClick={() => changeRegion(item as RegionAlias)}
                                >
                                  <Text.Paragraph
                                    variant="body2"
                                    component="span"
                                    fontWeight={region === item ? 500 : 400}
                                  >
                                    {item.toUpperCase()}
                                  </Text.Paragraph>

                                  {region === item && <RiCheckLine size={16} />}
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Modal.Portal>
                    </Modal.Root>

                    <IconButton
                      title={t('search.actions.search')}
                      label={t('search.actions.search')}
                      size="small"
                      type="submit"
                    >
                      <RiSearchLine />
                    </IconButton>
                  </Box>
                </InputAdornment>
              )}
            />

            <Box mt={2}>
              <SearchSummonerList />
            </Box>
          </Box>
        </Box>
      </Modal.Portal>
    </Modal.Root>

  );
};
