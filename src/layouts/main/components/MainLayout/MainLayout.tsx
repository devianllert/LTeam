import * as React from 'react';

import { Box } from '@/common/components/layout/Box';
import * as Text from '@/common/components/system/Text';

import { MainHeader } from '../MainHeader';
import { MainFooter } from '../MainFooter';

import * as S from './styled';

export interface MainLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <S.MainLayoutContainer>
      <MainHeader />

      {children}

      <MainFooter />
    </S.MainLayoutContainer>
  );
};
