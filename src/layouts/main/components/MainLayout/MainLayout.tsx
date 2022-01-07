import * as React from 'react';

import { MainHeader } from '../MainHeader';

import { MainFooter } from '../MainFooter';
import { Box } from '@/common/components/system/Box';
import * as Text from '@/common/components/system/Text';

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

      <Box
        display="flex"
        marginLeft="auto"
        marginRight="auto"
      >
        <MainFooter>
          <Text.Paragraph
            fontSize="inherit"
          >
            LTeam.gg isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties.
          </Text.Paragraph>
          <Text.Paragraph
            fontSize="inherit"
          >
            Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </Text.Paragraph>
        </MainFooter>
      </Box>
    </S.MainLayoutContainer>
  );
};
