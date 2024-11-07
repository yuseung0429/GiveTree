import type { Meta, StoryObj } from '@storybook/react';

import Typography from '.';

const meta = {
  title: 'UI/Typography',
  component: Typography,

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
      description: '내용',
      control: 'text',
    },

    color: {
      description: '글자 색상',
      control: 'color',
    },

    size: {
      description: '글자 크기',
      control: 'text',
    },

    ellipsis: {
      description: '부모 크기 초과시 ...으로 표시',
      control: 'boolean',
    },

    as: {
      description: 'HTML Element의 종류',
      control: 'select',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },

    weight: {
      description: '글자 굵기',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: 'Typography',
  },
};
