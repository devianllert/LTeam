import * as React from 'react';

import * as Text from '@/common/components/system/Text';
import { Container } from '@/common/components/layout/Container';
import { Box } from '@/common/components/layout/Box';
import { Inset } from '@/common/components/layout/Inset';

import * as S from './styled';

export const MainFooter = (): JSX.Element => {
  return (
    <Box component="footer">
      <Container>
        <Inset vertical={4}>
          <S.MainFooterRoot>
            <Text.Paragraph
              variant="body3"
              color="text.secondary"
              textAlign="center"
            >
              LTeam.gg isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties.
              <br />
              Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
            </Text.Paragraph>
          </S.MainFooterRoot>
        </Inset>
      </Container>
    </Box>
  );
};
