import type { Meta, StoryObj } from '@storybook/react';

import colorPalette from '@/styles/tokens/colorPalette';

import TextField from '.';
import { textfield, container } from './TextField.css';

const meta = {
  title: 'UI/TextField',
  component: TextField,
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
    value: {
      description: 'TextField 내용',
      control: 'text',
    },

    defaultValue: {
      description: 'TextField의 defaultValue',
      control: 'text',
    },

    color: {
      description: 'TextField의 색상',
      control: 'select',
      options: Object.keys(colorPalette),
    },

    size: {
      description: 'TextField의 크기',
      control: 'radio',
      options: Object.keys(textfield.classNames.variants.size),
    },

    variant: {
      description: 'TextField의 variant',
      control: 'radio',
      options: Object.keys(container.classNames.variants.variant),
    },

    width: {
      description: 'TextField의 가로 크기',
      control: 'text',
    },

    height: {
      description:
        'TextField의 세로 크기입니다.\n\nmultiline = true 일 때만 적용됩니다.',
      control: 'text',
    },

    multiline: {
      description: 'true로 설정하면 textarea',
      control: 'boolean',
    },

    readOnly: {
      description: 'readOnly',
      control: 'boolean',
    },

    disabled: {
      description: 'disabled',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  args: {},
};
