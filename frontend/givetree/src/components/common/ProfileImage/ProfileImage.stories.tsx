import type { Meta, StoryObj } from '@storybook/react';

import ProfileImage from '.';

import { profileImage } from './ProfileImage.css';

const meta = {
  title: 'UI/ProfileImage',
  component: ProfileImage,
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
    src: {
      description: '프로필 이미지의 주소',
      control: 'text',
    },

    borderColor: {
      description: '프로필 테두리 색상',
      control: 'color',
    },

    size: {
      description: '크기',
      control: 'radio',
      options: Object.keys(profileImage.classNames.variants.size),
    },
  },
} satisfies Meta<typeof ProfileImage>;

export default meta;

type Story = StoryObj<typeof ProfileImage>;

export const Primary: Story = {
  args: {
    src: 'https://lab.ssafy.com/s11-final/S11P31D210/uploads/8647d5488af31025299be70aa7d29990/handsomeman.png?w=2048&q=75',
  },
};
