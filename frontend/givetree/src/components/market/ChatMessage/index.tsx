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
  isMine?: boolean;
  createdAt: string;
}

const ChatMessage = ({
  children,
  profile,
  isMine = false,
  createdAt,
}: ChatMessageProps) => {
  return (
    <Flex
      flexDirection="column"
      gap="0.75rem"
      style={{ padding: '0.75rem 0.25rem' }}
    >
      {profile}
      <Flex
        flexDirection={isMine ? 'row' : 'row-reverse'}
        alignItems="flex-end"
        gap="0.25rem"
        style={{ alignSelf: isMine ? 'flex-end' : 'flex-start' }}
      >
        <Box padding="0.25rem 0">
          <Typography color={colorPalette.text[400]} size={typography.size.xs}>
            {new Date(createdAt).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </Box>
        <div className={s.balloon({ isMine })}>{children}</div>
      </Flex>
    </Flex>
  );
};

export default ChatMessage;
