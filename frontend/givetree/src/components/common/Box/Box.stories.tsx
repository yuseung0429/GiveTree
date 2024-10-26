import type { Meta, StoryObj } from '@storybook/react';

import Box from '.';

const meta = {
  title: 'UI/Box',
  component: Box,

  parameters: {
    layout: 'fullscreen',
  },

  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],

  tags: ['autodocs'],

  argTypes: {
    children: {
      table: { disable: true },
    },

    backgroundColor: {
      control: 'color',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof Box>;

export const Primary: Story = {
  args: {
    children: <>Box</>,
  },
};
