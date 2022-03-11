import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ChampionAbilities, ChampionAbilitiesProps } from '../ChampionAbilities';

export default {
  title: 'Modules/Champions/Components/ChampionAbilities',
  component: ChampionAbilities,
} as Meta;

const Template: Story<ChampionAbilitiesProps> = (args) => <ChampionAbilities {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'ChampionAbilities',
};
