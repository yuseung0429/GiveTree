import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '.';

import { checkbox } from './Checkbox.css';

import colorPalette from '@/styles/tokens/colorPalette';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
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
      options: Object.keys(checkbox.classNames.variants.size),
    },

    disabled: {
      description:
        '비활성화 여부                                                              ',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    children: 'Checkbox',
  },
};
