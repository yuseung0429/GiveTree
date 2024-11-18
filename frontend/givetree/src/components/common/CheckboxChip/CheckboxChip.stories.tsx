import type { Meta, StoryObj } from '@storybook/react';

import CheckboxChip from '.';

import { checkboxChip } from './CheckboxChip.css';

const meta = {
  title: 'UI/CheckboxChip',
  component: CheckboxChip,
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
    size: {
      description: '크기',
      control: 'radio',
      options: Object.keys(checkboxChip.classNames.variants.size),
    },

    disabled: {
      description:
        '비활성화 여부                                                              ',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CheckboxChip>;

export default meta;

type Story = StoryObj<typeof CheckboxChip>;

export const Primary: Story = {
  args: {
    children: 'CheckboxChip',
  },
};
