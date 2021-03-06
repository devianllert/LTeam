import { Router } from 'next/router';

import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { MultiversalPageProps } from '@/layouts/core/types/MultiversalPageProps';

/**
 * Props that are provided to the render function of the application (in _app)
 * Those props can be consolidated by either getInitialProps, getServerProps or getStaticProps, depending on the page and its configuration
 *
 * @see MultiversalAppBootstrap for usage
 */
export type MultiversalAppBootstrapProps<PP extends MultiversalPageProps = MultiversalPageProps> = {
  /**
   * Page component, not provided if pageProps.statusCode is 3xx or 4xx
   */
  Component: EnhancedNextPage;
  err?: Error; // Only defined if there was an error
  pageProps: PP; // Props forwarded to the Page component
  router: Router;

  // XXX Next.js internals (unstable API) - See https://github.com/vercel/next.js/discussions/12558#discussioncomment-9177
  __N_SSG?: boolean; // Stands for "server-side generated" or "static site generation", indicates the page was generated through getStaticProps
  __N_SSR?: boolean; // Stands for "server-side rendering", indicates the page was generated through getServerSideProps
  __N_SSP?: boolean; // Stands for "server-side props"
};
