import type { Meta, StoryObj } from '@storybook/react';

import NavigationBar from './index';

const meta = {
  component: NavigationBar,
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};