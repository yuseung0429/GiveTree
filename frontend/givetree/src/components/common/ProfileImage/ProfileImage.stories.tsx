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
    src: 'https://github.com/user-attachments/assets/14513e04-bf23-4d90-8f29-7f6295690ea5',
  },
};
