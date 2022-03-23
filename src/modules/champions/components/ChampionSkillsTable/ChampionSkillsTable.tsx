import * as React from 'react';

import * as S from './styled';

import { ChampionSkillLine, SpellData } from '@/modules/champions/components/ChampionSkillLine';
import { Card } from '@/modules/champions/components/Card';
import { Box } from '@/common/components/layout/Box';

export interface ChampionSkillsTableProps {
  /**
   * The content
   */
  spells: {
    q: SpellData;
    w: SpellData;
    e: SpellData;
    r: SpellData;
    p: SpellData;
  }
}

export const ChampionSkillsTable = (props: ChampionSkillsTableProps): JSX.Element => {
  const {
    spells,
  } = props;

  return (
    <S.ChampionSkillsTableRoot>
      <Card cardHeading="Skill Path">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          // overflowY="auto"
        >
          <Box>

            <ChampionSkillLine
              spell={spells.q}
            />
          </Box>

          <Box
            mt={1}
          >
            <ChampionSkillLine
              spell={spells.w}
            />
          </Box>

          <Box
            mt={1}
          >
            <ChampionSkillLine
              spell={spells.e}
            />
          </Box>

          <Box
            mt={1}
          >
            <ChampionSkillLine
              spell={spells.r}
            />
          </Box>

          <Box
            mt={1}
          >
            <ChampionSkillLine
              spell={spells.p}
            />
          </Box>
        </Box>
      </Card>
    </S.ChampionSkillsTableRoot>
  );
};
