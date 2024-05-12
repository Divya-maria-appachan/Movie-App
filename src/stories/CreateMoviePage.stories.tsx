import React from 'react';
import { Meta, Story } from '@storybook/react';
import CreateMoviePage from '../pages/CreateMoviePage';

export default {
  title: 'Pages/CreateMoviePage',
  component: CreateMoviePage,
} as Meta;

const Template: Story = () => <CreateMoviePage />;

export const Default = Template.bind({});
