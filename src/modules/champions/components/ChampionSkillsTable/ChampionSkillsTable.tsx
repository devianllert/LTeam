import * as React from 'react';

import * as S from './styled';

import { ChampionSkillLine } from '@/modules/champions/components/ChampionSkillLine';
import { Card } from '@/modules/champions/components/Card';
import { Stack } from '@/common/components/layout/Stack';
import { Box } from '@/common/components/layout/Box';

export interface ChampionSkillsTableProps {
  /**
   * The content
   */
  q: {
    skillName: string;
    skiillImg: string;
  };
  w: {
    skillName: string;
    skiillImg: string;
  }
  e: {
    skillName: string;
    skiillImg: string;
  }
  r: {
    skillName: string;
    skiillImg: string;
  }
  p: {
    skillName: string;
    skiillImg: string;
  }
}

export const ChampionSkillsTable = (props: ChampionSkillsTableProps): JSX.Element => {
  const {
    q,
    w,
    e,
    r,
    p,
  } = props;

  return (
    <S.ChampionSkillsTableRoot>
      <Card cardHeading="Skill Path">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box>

            <ChampionSkillLine
              type="Q"
              skillName={q.skillName ?? ''}
              skiillImg={q.skiillImg ?? ''}
              takenAtLvl={[1, 4, 5, 7, 9]}
            />
          </Box>

          <Box
            mt={2}
          >
            <ChampionSkillLine
              type="W"
              skillName={w.skillName ?? ''}
              skiillImg={w.skiillImg ?? ''}
              takenAtLvl={[3, 14, 15, 17, 18]}
            />
          </Box>

          <Box
            mt={2}
          >
            <ChampionSkillLine
              type="E"
              skillName={e.skillName ?? ''}
              skiillImg={e.skiillImg ?? ''}
              takenAtLvl={[2, 8, 10, 12, 13]}
            />
          </Box>

          <Box
            mt={2}
          >
            <ChampionSkillLine
              type="R"
              skillName={r.skillName ?? ''}
              skiillImg={r.skiillImg ?? ''}
              takenAtLvl={[6, 11, 16]}
            />
          </Box>

          <Box
            mt={2}
          >
            <ChampionSkillLine
              type="P"
              skillName={p.skillName ?? ''}
              skiillImg={p.skiillImg ?? ''}
            />
          </Box>
        </Box>
      </Card>
    </S.ChampionSkillsTableRoot>
  );
};
