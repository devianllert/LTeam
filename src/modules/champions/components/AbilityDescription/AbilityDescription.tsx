import * as React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import {
  ChampionPreview,
  FetchedChampion,
  Spell,
  Passive,
} from '@/modules/champions/interfaces/champion.interface';

import { abilityButton } from '@/modules/champions/constants/abilityButton';

import { Box } from '@/common/components/system/Box';
import { Stack } from '@/common/components/system/Stack';
import * as Text from '@/common/components/system/Text';
import * as S from './styled';

export interface AbilityDescriptionProps {
  abilities: {
    passive: Passive;
    spells: Spell[];
    type: string;
  };
}

export const AbilityDescription = (props: AbilityDescriptionProps) => {
  const { abilities } = props;

  return (
    <Box>

      <Tabs.Root>
        <Tabs.List>
          <S.Tab
            path={`https://ddragon.leagueoflegends.com/cdn/12.2.1/img/passive/${abilities.passive.image.full}`}
            value="passive"
            className="passive"
          />
          {abilities.spells.map((spell, index) => (
            <S.Tab
              path={`https://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/${spell.image.full}`}
              value={spell.id}
              key={spell.id}
              className="ability"
              index={index + 1}
            />
          ))}
        </Tabs.List>
        <Tabs.Content value="passive">
          <Box
            display="flex"
            flexDirection="column"
            padding={2}
          >
            <Text.Heading variant="h6">{abilities.passive.name}</Text.Heading>

            <Text.Paragraph variant="body2" dangerouslySetInnerHTML={{ __html: `${abilities.passive.description}` }} />
          </Box>
        </Tabs.Content>
        {abilities.spells.map((spell, index) => (
          <Tabs.Content key={spell.id} value={spell.id}>
            <Box
              display="flex"
              flexDirection="column"
              padding={2}
            >
              <Stack space={2} direction="column">
                <Box
                  display="flex"
                  alignItems="center"
                >
                  <Text.Heading variant="h6">{spell.name}</Text.Heading>
                  <Box
                    padding="5px"
                    color="text.secondary"
                    marginLeft={2}
                  >
                    <Text.Paragraph variant="body1">{abilityButton[index + 1]}</Text.Paragraph>
                  </Box>
                </Box>

                <Text.Paragraph variant="body3" dangerouslySetInnerHTML={{ __html: `${spell.description}` }} />

                <Text.Paragraph variant="body2">Cooldown: {spell.cooldownBurn} seconds</Text.Paragraph>

                <Text.Paragraph variant="body2">Range: {spell.rangeBurn}</Text.Paragraph>

                {(abilities.type !== 'None') && <Text.Paragraph variant="body2">Cost: {spell.costBurn}</Text.Paragraph>}
              </Stack>
            </Box>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};
