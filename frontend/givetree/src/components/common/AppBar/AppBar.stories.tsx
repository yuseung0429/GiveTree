import type { Meta, StoryObj } from '@storybook/react';

import AppBar from '.';

import { HiMagnifyingGlass, HiOutlineBell } from 'react-icons/hi2';
import AppBarMenu from '@/components/common/AppBarMenu';

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

    transparent: {
      description: 'AppBar를 투명하게',
      type: 'boolean',
    },

    showBackButton: {
      description: '뒤로가기 버튼 표시 여부',
      type: 'boolean',
    },
  },
} satisfies Meta<typeof AppBar>;

export default meta;

type Story = StoryObj<typeof AppBar>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <AppBarMenu>
          <HiMagnifyingGlass />
        </AppBarMenu>
        <AppBarMenu>
          <HiOutlineBell />
        </AppBarMenu>
      </>
    ),
    title: 'AppBar',
  },
};
