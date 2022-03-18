import * as React from 'react';

import Link from 'next/link';

import * as Text from '@/components/system/Text';
import { Box } from '@/components/layout/Box';

import * as S from './styled';

export interface ChampionCardProps {
  /**
   * The content
   */
  championKey: string;
  championName: string;
  championId: string;
}

export const ChampionCard = (props: ChampionCardProps): JSX.Element => {
  const {
    championKey,
    championName,
    championId,
  } = props;

  return (
    <S.ChampionCardRoot>
      <Link
        href={`/champions/${championId}`}
        passHref
      >
        <Box
          display="flex"
          backgroundSize="cover"
          backgroundPosition="center"
          border="1px solid"
          borderColor="radix.yellow9"
          height={[140, 240, 420]}
          backgroundImage={`url(https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championKey}/${championKey}000.jpg)`}
        >
          <Box
            padding={2}
            marginTop="auto"
          >
            <Text.Paragraph fontSize="32px" color="radix.yellow9">{championName}</Text.Paragraph>
          </Box>
        </Box>
      </Link>
    </S.ChampionCardRoot>
  );
};
