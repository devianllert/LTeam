import * as React from 'react';

import { Box } from '@/components/layout/Box';
import * as Text from '@/components/system/Text';
import { Stack } from '@/components/layout/Stack';

import * as S from './styled';

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export interface ChampionSkillLineProps {
  /**
   * The content
   */
  type: 'Q' | 'W' | 'E' | 'R' | 'P';
  takenAtLvl?: number[];
  skillName: string;
  skiillImg: string;
}

export const ChampionSkillLine = (props: ChampionSkillLineProps): JSX.Element => {
  const {
    type,
    takenAtLvl: onLvlTaked,
    skillName,
    skiillImg,
  } = props;

  const getImg = (partofPath) => (type === 'P' ? `https://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/${partofPath}` : `https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${skiillImg}`);

  return (
    <S.ChampionSkillLineRoot>
      <Box
        display="flex"
        alignItems="center"
      >
        <Box
          borderRadius="4px"
          display="flex"
          alignItems="center"
          backgroundColor="background.secondary"
          width={340}
          mr={1}
        >
          <Box
            borderRadius="4px"
            display="flex"
            position="relative"
            backgroundSize="cover"
            width={48}
            height={48}
            backgroundImage={`url(${getImg(skiillImg)})`}
          >
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              backgroundColor="background.secondary"
              width={20}
              height={20}
              right="-8px"
              bottom="-8px"
            >
              <Text.Paragraph variant="body3" color="radix.yellow9">{type}</Text.Paragraph>
            </Box>
          </Box>

          <Text.Paragraph variant="body1" sx={{ marginLeft: 3 }}>{skillName}</Text.Paragraph>
        </Box>
        {onLvlTaked && levels.map((level) => (
          <Box
            mx={1}
            key={level}
            backgroundColor="background.secondary"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={48}
            height={48}
            borderRadius="4px"
            border={onLvlTaked.includes(level) ? '1px solid' : 'none'}
            borderColor="radix.yellow9"
          >
            {onLvlTaked.includes(level) && <Text.Paragraph variant="body2">{level}</Text.Paragraph>}
          </Box>
        ))}

        {!onLvlTaked && <Box backgroundColor="background.secondary" width={948} height={48} />}
      </Box>
    </S.ChampionSkillLineRoot>
  );
};
