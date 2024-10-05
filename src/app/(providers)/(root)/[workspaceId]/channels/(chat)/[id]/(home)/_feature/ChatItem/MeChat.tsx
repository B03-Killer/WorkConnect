import type { StrictPropsWithChildren } from '@/types/common';
import { ChatItem } from './ChatItem';
import type { MeChatProps } from './types';

const MeChat = ({ hasRead, createdAt, children }: StrictPropsWithChildren<MeChatProps>) => {
  return (
    <ChatItem.Wrapper>
      <ChatItem.Utility>
        <ChatItem.Time createdAt={createdAt} />
        {hasRead && <ChatItem.ReadBadge />}
      </ChatItem.Utility>
      {children}
    </ChatItem.Wrapper>
  );
};

export default MeChat;
