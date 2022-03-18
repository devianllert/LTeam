import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ChampionCard, ChampionCardProps } from '../ChampionCard';

export default {
  title: 'Modules/Champions/Components/ChampionCard',
  component: ChampionCard,
} as Meta;

const Template: Story<ChampionCardProps> = (args) => <ChampionCard {...args} />;

export const Basic = Template.bind({});
export const Basic1 = Template.bind({});
export const Basic2 = Template.bind({});
export const Basic3 = Template.bind({});
export const Basic4 = Template.bind({});
export const Basic5 = Template.bind({});

Basic.args = {
  championKey: '84',
  championName: 'Akali',
  championId: 'Akali',
};

Basic1.args = {
  championKey: '12',
  championName: 'Alistar',
  championId: 'Alistar',
};

Basic2.args = {
  championKey: '32',
  championName: 'Amumu',
  championId: 'Amumu',
};

Basic3.args = {
  championKey: '34',
  championName: 'Anivia',
  championId: 'Anivia',
};

Basic4.args = {
  championKey: '1',
  championName: 'Annie',
  championId: 'Annie',
};

Basic5.args = {
  championKey: '136',
  championName: 'Aurelion Sol',
  championId: 'AurelionSol',
};
