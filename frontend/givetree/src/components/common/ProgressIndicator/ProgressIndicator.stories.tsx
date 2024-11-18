import type { Meta, StoryObj } from '@storybook/react';

import ProgressIndicator from '.';

import { progressIndicator } from './ProgressIndicator.css';

import colorPalette from '@/styles/tokens/colorPalette';

const meta = {
  title: 'UI/ProgressIndicator',
  component: ProgressIndicator,
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
    color: {
      description: '색상',
      control: 'select',
      options: Object.keys(colorPalette),
    },

    size: {
      description: '크기',
      control: 'radio',
      options: Object.keys(progressIndicator.classNames.variants.size),
    },

    value: {
      description: 'value',
      control: 'number',
    },

    max: {
      description: '최대값',
      control: 'number',
    },
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;

type Story = StoryObj<typeof ProgressIndicator>;

export const Primary: Story = {
  args: {
    value: 5,
    max: 10,
  },
};
