import type { Meta, StoryObj } from '@storybook/react';

import colorPalette from '@/styles/tokens/colorPalette';

import { chip } from './Chip.css';

import Chip from './';

const meta = {
  title: 'UI/Chip',
  component: Chip,
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
      description: 'Chip Label의 내용',
      control: 'text',
    },

    color: {
      description: 'Chip의 색상',
      control: 'radio',
      options: Object.keys(colorPalette),
    },

    variant: {
      description: 'Chip의 variant',
      control: 'radio',
      options: Object.keys(chip.classNames.variants.variant),
    },

    size: {
      description: 'Chip의 크기',
      control: 'radio',
      options: Object.keys(chip.classNames.variants.size),
    },

    onClick: {
      description: '클릭 이벤트가 정의되면 hover, active가 생깁니다.',
      control: 'radio',
      options: [undefined, () => console.log('click')],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    children: 'Chip',
  },
};
