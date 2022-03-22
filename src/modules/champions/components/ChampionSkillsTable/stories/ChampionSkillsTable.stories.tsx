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
  q: {
    skillName: 'Flair',
    skiillImg: 'SamiraQ.png',
  },
  w: {
    skillName: 'Blade Whirl',
    skiillImg: 'SamiraW.png',
  },
  e: {
    skillName: 'Wild Rush',
    skiillImg: 'SamiraE.png',
  },
  r: {
    skillName: 'Inferno Trigger',
    skiillImg: 'SamiraR.png',
  },
  p: {
    skillName: 'Daredevil Impulse',
    skiillImg: 'SamiraP.Samira.png',
  },
};
