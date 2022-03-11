import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ChampionBanner, ChampionBannerProps } from '../ChampionBanner';

export default {
  title: 'Modules/Champions/Components/ChampionBanner',
  component: ChampionBanner,
} as Meta;

const Template: Story<ChampionBannerProps> = (args) => <ChampionBanner {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  championRole: 'Support',
  championName: 'Pyke',
  rank: 5,
  winRate: 52.28,
  championKey: 555,
};
