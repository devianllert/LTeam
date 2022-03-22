import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ChampionSkillLine, ChampionSkillLineProps } from '../ChampionSkillLine';

export default {
  title: 'Modules/Champions/Components/ChampionSkillLine',
  component: ChampionSkillLine,
} as Meta;

const Template: Story<ChampionSkillLineProps> = (args) => <ChampionSkillLine {...args} />;

export const SamiraQ = Template.bind({});
export const SamiraW = Template.bind({});
export const SamiraE = Template.bind({});
export const SamiraR = Template.bind({});
export const SamiraP = Template.bind({});

SamiraQ.args = {
  type: 'Q',
  skillName: 'Flair',
  skiillImg: 'SamiraQ.png',
  takenAtLvl: [1, 4, 5, 7, 9],
};

SamiraW.args = {
  type: 'W',
  skillName: 'Blade Whirl',
  skiillImg: 'SamiraW.png',
  takenAtLvl: [1, 4, 5, 7, 9],
};

SamiraE.args = {
  type: 'E',
  skillName: 'Wild Rush',
  skiillImg: 'SamiraE.png',
  takenAtLvl: [1, 4, 5, 7, 9],
};

SamiraR.args = {
  type: 'R',
  skillName: 'Inferno Trigger',
  skiillImg: 'SamiraR.png',
  takenAtLvl: [6, 11, 16],
};

SamiraP.args = {
  type: 'P',
  skillName: 'Daredevil Impulse',
  skiillImg: 'SamiraP.Samira.png',
};
