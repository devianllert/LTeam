import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { MainFooter } from '../MainFooter';

export default {
  title: 'Components/MainFooter',
  component: MainFooter,
} as Meta;

const Template: Story = (args) => <MainFooter {...args} />;

export const Basic = Template.bind({});
