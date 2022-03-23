import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ChampionSkillsTable, ChampionSkillsTableProps } from '../ChampionSkillsTable';

export default {
  title: 'Modules/Champions/Components/ChampionSkillsTable',
  component: ChampionSkillsTable,
} as Meta;

const Template: Story<ChampionSkillsTableProps> = (args) => <ChampionSkillsTable {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  spells: {
    q: {
      type: 'Q',
      takenAtLvl: [1, 4, 5, 7, 9],
      skillName: 'Flair',
      skillImg: 'SamiraQ.png',
    },
    w: {
      type: 'W',
      takenAtLvl: [3, 14, 15, 17, 18],
      skillName: 'Blade Whirl',
      skillImg: 'SamiraW.png',
    },
    e: {
      type: 'E',
      takenAtLvl: [2, 8, 10, 12, 13],
      skillName: 'Wild Rush',
      skillImg: 'SamiraE.png',
    },
    r: {
      type: 'R',
      takenAtLvl: [6, 11, 16],
      skillName: 'Inferno Trigger',
      skillImg: 'SamiraR.png',
    },
    p: {
      type: 'P',
      skillName: 'Daredevil Impulse',
      skillImg: 'SamiraP.Samira.png',
    },
  },
};
