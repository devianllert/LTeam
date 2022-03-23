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
  spell: {
    type: 'Q',
    skillName: 'Flair',
    skillImg: 'SamiraQ.png',
    takenAtLvl: [1, 4, 5, 7, 9],
  },
};

SamiraW.args = {
  spell: {
    type: 'W',
    skillName: 'Blade Whirl',
    skillImg: 'SamiraW.png',
    takenAtLvl: [1, 4, 5, 7, 9],
  },
};

SamiraE.args = {
  spell: {
    type: 'E',
    skillName: 'Wild Rush',
    skillImg: 'SamiraE.png',
    takenAtLvl: [1, 4, 5, 7, 9],
  },
};

SamiraR.args = {
  spell: {
    type: 'R',
    skillName: 'Inferno Trigger',
    skillImg: 'SamiraR.png',
    takenAtLvl: [6, 11, 16],
  },
};

SamiraP.args = {
  spell: {
    type: 'P',
    skillName: 'Daredevil Impulse',
    skillImg: 'SamiraP.Samira.png',
  },
};
