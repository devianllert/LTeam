import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { MainFooter, MainFooterProps } from '../MainFooter';

export default {
  title: 'Components/MainFooter',
  component: MainFooter,
} as Meta;

const Template: Story<MainFooterProps> = (args) => <MainFooter {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'MainFooter',
};