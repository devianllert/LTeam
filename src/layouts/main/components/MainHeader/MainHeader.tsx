import * as React from 'react';
import {
  RiSearch2Line, RiSettings2Line,
} from 'react-icons/ri';
import { useColorMode } from 'theme-ui';
import { useTranslation } from 'next-i18next';
import * as timeago from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';

import * as Text from '@/common/components/system/Text';
import { Stack } from '@/common/components/layout/Stack';
import { Container } from '@/common/components/layout/Container';
import { IconButton } from '@/common/components/system/IconButton';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';
import { LocaleToggler } from '@/common/components/LocaleToggler';

import * as S from './styled';
import { ActiveLink } from '@/common/components/system/ActiveLink';
import { Input, InputAdornment } from '@/common/components/system/Input';
import { Box } from '@/common/components/layout/Box';
import * as DropdownMenu from '@/common/components/system/DropdownMenu';
import { Switch } from '@/common/components/system/Switch';

timeago.register('ru', ru);

export type MainHeaderProps = unknown;

export const MainHeader = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [colorMode, setColorMode] = useColorMode();

  const toggleColorMode = (event: Event) => {
    event.preventDefault();
    setColorMode((prevMode) => (prevMode === 'dark' ? 'default' : 'dark'));
  };

  return (
    <S.MainHeaderContainer>
      <Container>
        <S.MainHeaderRoot>
          {/* <Link href="/" passHref>
            <Text.Heading variant="h6" component="a">{APP_TITLE}</Text.Heading>
          </Link> */}
          <S.MainHeaderNavigation>
            <S.MainHeaderNavigationList>
              <S.MainHeaderNavigationListItem>
                <ActiveLink href="/">
                  <S.MainHeaderLink>Home</S.MainHeaderLink>
                </ActiveLink>
              </S.MainHeaderNavigationListItem>

              <S.MainHeaderNavigationListItem>
                <ActiveLink href="/champions">
                  <S.MainHeaderLink>Champions</S.MainHeaderLink>
                </ActiveLink>
              </S.MainHeaderNavigationListItem>

              <S.MainHeaderNavigationListItem>
                <ActiveLink href="/statistics">
                  <S.MainHeaderLink>Statistics</S.MainHeaderLink>
                </ActiveLink>
              </S.MainHeaderNavigationListItem>
            </S.MainHeaderNavigationList>
          </S.MainHeaderNavigation>

          <Box>
            <Input
              placeholder="Search..."
              suffix={(
                <InputAdornment>
                  <RiSearch2Line />
                </InputAdornment>
              )}
            />
          </Box>

          <DisplayOnBrowserMount>
            <Stack direction="row" alignItems="center" space={3}>
              {/* <Text.Heading variant="subtitle2" component="span">
                {t('lastUpdate')}:
                {' '}
                <Timeago
                  datetime={process.env.NEXT_PUBLIC_APP_BUILD_TIME}
                  locale={i18n.language}
                />
              </Text.Heading> */}

              <LocaleToggler />

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <IconButton
                    color="gray"
                    type="button"
                  >
                    <RiSettings2Line />
                  </IconButton>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="end">
                  <DropdownMenu.Item>
                    Settings
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    onSelect={toggleColorMode}
                    asChild
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                    >
                      Dark mode

                      <Switch size="small" checked={colorMode !== 'default'} />
                    </Box>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Stack>
          </DisplayOnBrowserMount>
        </S.MainHeaderRoot>
      </Container>
    </S.MainHeaderContainer>
  );
};
