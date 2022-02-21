import * as React from 'react';

import { Stack } from '@/common/components/layout/Stack';
import * as Text from '@/common/components/system/Text';

export interface PlayerPerformaceProps {
  gold: number;
  damage: number;
}

export const PlayerPerformance = (props: PlayerPerformaceProps) => {
  const {
    gold,
    damage,
  } = props;

  return (
    <Stack
      direction="column"
      space={1}
    >
      <Text.Paragraph variant="body3">GOLD: {gold}</Text.Paragraph>
      <Text.Paragraph variant="body3">DMG: {damage}</Text.Paragraph>
    </Stack>
  );
};
