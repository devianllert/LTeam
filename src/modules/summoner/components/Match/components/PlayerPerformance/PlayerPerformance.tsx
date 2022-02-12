import * as React from 'react';

import { Box } from '@/common/components/system/Box';
import { Stack } from '@/common/components/system/Stack';
import * as Text from '@/common/components/system/Text';

export interface PlayerPerformaceProps {
  gold: number;
  damage: number;
  creeps: number;
  killParticipation: number;
}

export const PlayerPerformance = (props: PlayerPerformaceProps) => {
  const {
    gold,
    damage,
    creeps,
    killParticipation,
  } = props;

  return (
    <Stack
      direction="column"
      space={1}
    >
      <Text.Paragraph variant="body3">GOLD: {gold}</Text.Paragraph>
      <Text.Paragraph variant="body3">CS: {creeps}</Text.Paragraph>
      <Text.Paragraph variant="body3">DMG: {damage}</Text.Paragraph>
      <Text.Paragraph variant="body3">KP: {killParticipation.toFixed(2)}</Text.Paragraph>
    </Stack>
  );
};
