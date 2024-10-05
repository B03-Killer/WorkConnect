import type { StrictPropsWithChildren } from '@/types/common';
import { ChatItem } from './ChatItem';
import type { OtherChatProps } from './types';

const OtherChat = ({ href, src, userName, createdAt, children }: StrictPropsWithChildren<OtherChatProps>) => {
  return (
    <ChatItem.Wrapper className="flex-wrap flex-row-reverse">
      <ChatItem.Profile href={href} src={src} userName={userName} />
      <ChatItem.Utility>
        <ChatItem.Time createdAt={createdAt} />
      </ChatItem.Utility>
      {children}
    </ChatItem.Wrapper>
  );
};

export default OtherChat;
