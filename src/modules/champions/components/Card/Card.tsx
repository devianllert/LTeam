import * as React from 'react';

import { Box } from '@/components/layout/Box';
import * as Text from '@/components/system/Text';

import * as S from './styled';

export interface CardProps {
  /**
   * The content
   */
  children: React.ReactNode;
  cardHeading: string;
}

export const Card = (props: CardProps): JSX.Element => {
  const {
    children,
    cardHeading,
  } = props;

  return (
    <S.CardRoot>
      <Box
        display="flex"
        alignItems="center"
        padding={3}
        borderRadius="16px 16px 0 0"
        backgroundColor="background.secondary"
      >
        <Text.Heading variant="h6">{cardHeading}</Text.Heading>
      </Box>

      <S.Content>
        {children}
      </S.Content>
    </S.CardRoot>
  );
};
