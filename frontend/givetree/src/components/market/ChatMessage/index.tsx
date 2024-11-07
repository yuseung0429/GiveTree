import { ReactNode } from 'react';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import * as s from './ChatMessage.css';

import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';
import Box from '@/components/common/Box';

interface ChatMessageProps {
  children: ReactNode;
  profile?: ReactNode;
  me?: boolean;
  createdAt: string;
}

const ChatMessage = ({
  children,
  profile,
  me = false,
  createdAt,
}: ChatMessageProps) => {
  return (
    <>
      {profile}
      <Flex
        flexDirection={me ? 'row' : 'row-reverse'}
        alignItems="flex-end"
        gap="0.25rem"
        style={{ alignSelf: me ? 'flex-end' : 'flex-start' }}
      >
        <Box padding="0.25rem 0">
          <Typography color={colorPalette.text[400]} size={typography.size.xs}>
            {new Date(createdAt).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </Box>
        <div className={s.balloon({ me })}>{children}</div>
      </Flex>
    </>
  );
};

export default ChatMessage;
