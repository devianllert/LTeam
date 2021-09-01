import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Input } from 'theme-ui';

import { getAppTitle } from '@/modules/core/meta/meta';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import { Typography } from '@/common/components/system/Typography';
import { Box } from '@/common/components/system/Box';
import { WeatherLayout } from '@/layouts/weather/components/WeatherLayout';

const logger = createLogger('Weather');

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = getTranslationsStaticProps();

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const WeatherSearchPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const router = useRouter();

  const [text, setText] = React.useState('');

  const onSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await router.push(`/weather/${text}`);
  };

  return (
    <>
      <Head>
        <title>{getAppTitle('Weather')}</title>
      </Head>

      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="text.primary"
        background="linear-gradient(180deg, rgba(13,28,139,1) 0%, rgba(83,36,224,1) 65%)"
        px={2}
      >
        <Typography variant="h1" component="h1">Weather</Typography>

        <Box
          maxWidth="440px"
          width="100%"
          background="white"
          borderRadius="4px"
          mt={8}
          boxShadow={2}
          zIndex={1}
        >
          <form onSubmit={onSearch}>
            <Input color="black" value={text} onChange={(event) => setText(event.currentTarget.value)} placeholder="City, Country" />
          </form>
        </Box>
      </Box>
    </>
  );
};

WeatherSearchPage.Layout = WeatherLayout;

export default WeatherSearchPage;
