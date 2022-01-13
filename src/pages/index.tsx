import * as React from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { RiCheckLine, RiSearchLine } from 'react-icons/ri';

import { regions } from '@/modules/summoner/constants/regions';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';

import { MainLayout } from '@/layouts/main/components/MainLayout';
import { IconButton } from '@/common/components/system/IconButton';
import { ButtonBase } from '@/common/components/system/ButtonBase';
import { getAppTitle } from '@/modules/core/meta/meta';
import { Box } from '@/common/components/system/Box';
import { InputAdornment } from '@/common/components/system/Input/InputAdornment';
import { Input } from '@/common/components/system/Input';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import * as Text from '@/common/components/system/Text';
import * as Modal from '@/common/components/system/Modal';
import { SearchSummonerList } from '@/modules/summoner/components/SearchSummonerList';
import { RegionAlias } from '@/modules/summoner/interfaces/region.interface';
import shadows from '@/common/design/tokens/shadows';
import { Stack } from '@/common/components/system/Stack';

const logger = createLogger('Index');

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const IndexPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t, i18n } = useTranslation('index');
  const router = useRouter();

  const [summoner, setSummoner] = React.useState('');
  const [region, setRegion] = React.useState<RegionAlias>(regions.euw.value);
  const [regionsModalIsOpen, setRegionsModalIsOpen] = React.useState(false);

  const changeRegion = (newRegion: RegionAlias) => {
    setRegion(newRegion);
    setRegionsModalIsOpen(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!summoner.trim()) return;

    await router.push(`/${region}/summoner/${summoner}`);
  };

  return (
    <>
      <Head>
        <title>{getAppTitle('Search')}</title>
        <meta name="description" content="Real-time LoL Stats! Check your Summoner, Live Spectate and using powerful global League of Legends Statistics!" />
      </Head>

      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        color="text.primary"
        backgroundImage="linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45) ), url('/static/images/cosmic-queen-ashe-splash.jpg')"
        position="relative"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        px={2}
        py={64}
      >
        <Box
          maxWidth="440px"
          width="100%"
          pt="10%"
        >
          <Text.Heading variant="h1" color="white" textAlign="center">LTeam</Text.Heading>

          <Box
            component="form"
            mt={8}
            onSubmit={onSubmit}
            display="flex"
            flexDirection="column"
          >
            <Input
              fullWidth
              placeholder="Search summoner"
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
                        <Modal.StyledOverlay />

                        <Box
                          component={Modal.StyledContent}
                          padding={3}
                          borderRadius={4}
                          boxShadow={shadows[4]}
                          maxWidth="440px"
                          backgroundColor="background.secondary"
                        >
                          <Modal.Title asChild>
                            <Text.Heading variant="h6" textAlign="center">Regions</Text.Heading>
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

                    <IconButton size="small">
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
      </Box>
    </>
  );
};

export const getStaticProps = getTranslationsStaticProps(['common', 'index']);

IndexPage.Layout = MainLayout;

export default IndexPage;
