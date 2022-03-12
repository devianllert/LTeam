import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ChampionStart, ChampionStartProps } from '../ChampionStart';

export default {
  title: 'Modules/Champions/Components/ChampionStart',
  component: ChampionStart,
} as Meta;

const Template: Story<ChampionStartProps> = (args) => <ChampionStart {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  stats: {
    mostFrequent: {
      items: [
        'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
        'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerDot.png',
      ],
      games: 11058,
      winRate: 49.90,
    },
    mostWinRate: {
      items: [
        'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
        'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerTeleport.png',
      ],
      games: 223,
      winRate: 60.09,
    },
  },
};
