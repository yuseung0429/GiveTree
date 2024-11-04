import type { Meta, StoryObj } from '@storybook/react';

import AppBar from '.';

import { HiMagnifyingGlass, HiOutlineBell } from 'react-icons/hi2';

const meta = {
  title: 'UI/AppBar',
  component: AppBar,
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

  tags: ['!autodocs'],

  argTypes: {
    children: {
      control: false,
    },

    title: {
      description: 'AppBar Title',
      type: 'string',
    },

    onBackClick: {
      description: '뒤로가기 버튼 클릭 이벤트',
      control: false,
    },
  },
} satisfies Meta<typeof AppBar>;

export default meta;

type Story = StoryObj<typeof AppBar>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <AppBar.Menu>
          <HiMagnifyingGlass />
        </AppBar.Menu>
        <AppBar.Menu>
          <HiOutlineBell />
        </AppBar.Menu>
      </>
    ),
    title: 'AppBar',
  },
};
