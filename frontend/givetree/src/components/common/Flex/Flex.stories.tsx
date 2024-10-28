import type { Meta, StoryObj } from '@storybook/react';

import Flex from '.';

const meta = {
  title: 'UI/Flex',
  component: Flex,

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

    flexWrap: {
      control: 'text',
    },

    flexDirection: {
      control: 'text',
    },

    gap: {
      control: 'text',
    },

    alignItems: {
      control: 'text',
    },

    justifyContent: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof Flex>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <div
          style={{
            width: '4rem',
            height: '4rem',
            background: 'red',
          }}
        ></div>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            background: 'green',
          }}
        ></div>
        <div
          style={{
            width: '2rem',
            height: '2rem',
            background: 'blue',
          }}
        ></div>
      </>
    ),
  },
};
