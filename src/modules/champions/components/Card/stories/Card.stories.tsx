import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Card, CardProps } from '../Card';
import { ChampionStart } from '../../ChampionStart';

const statsSpells = {
  mostFrequent: {
    items: [
      'http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerDot.png',
    ],
    games: 11058,
    winRate: 49.90,
  },
  mostWinRate: {
    items: [
      'http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerFlash.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/SummonerTeleport.png',
    ],
    games: 223,
    winRate: 60.09,
  },
};

const statsItems = {
  mostFrequent: {
    items: [
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/2003.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/2003.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/3854.png',
    ],
    games: 11058,
    winRate: 49.90,
  },
  mostWinRate: {
    items: [
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/2003.png',
      'https://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/1054.png',
    ],
    games: 223,
    winRate: 60.09,
  },
};

export default {
  title: 'Modules/Champions/Components/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Basic = Template.bind({});

export const ChampionSpells = Template.bind({});
export const ChampionsFirstBuy = Template.bind({});

Basic.args = {
  cardHeading: 'Basic Card',
  children: 'Card Content',
};

ChampionSpells.args = {
  cardHeading: 'Summoner Spells',
  children: <ChampionStart stats={statsSpells} />,
};

ChampionsFirstBuy.args = {
  cardHeading: 'Start Items',
  children: <ChampionStart stats={statsItems} />,
};
