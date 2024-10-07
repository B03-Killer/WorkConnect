import { CHAT_TYPE } from '@/constants/chat';
import MeChat from './MeChat';
import OtherChat from './OtherChat';
import { ChatImage, ChatFile, ChatVideo, ChatText, ChatNotice } from './ChatContent';
import clsx from 'clsx';
import { useCallback } from 'react';

const componentsMap: any = {
  [CHAT_TYPE.image]: ({ noticeUrl, ...props }: any) => <ChatImage {...props} />,
  [CHAT_TYPE.document]: ({ noticeUrl, ...props }: any) => <ChatFile {...props} />,
  [CHAT_TYPE.video]: ({ noticeUrl, ...props }: any) => <ChatVideo {...props} />,
  [CHAT_TYPE.text]: ({ noticeUrl, ...props }: any) => <ChatText {...props} />,
  [CHAT_TYPE.notice]: ({ noticeUrl, ...props }: any) => <ChatNotice {...props} noticeUrl={noticeUrl} />
};

const styleMap: any = {
  me: {
    [CHAT_TYPE.image]: 'rounded-lg w-[200px] h-auto',
    [CHAT_TYPE.document]: '',
    [CHAT_TYPE.video]: 'rounded-lg',
    [CHAT_TYPE.text]: 'bg-[#EBECFE] rounded-br-none',
    [CHAT_TYPE.notice]: 'rounded-br-none'
  },
  other: {
    [CHAT_TYPE.image]: 'rounded-lg w-[200px] h-auto',
    [CHAT_TYPE.document]: '',
    [CHAT_TYPE.video]: 'rounded-lg',
    [CHAT_TYPE.text]: 'bg-grey50 rounded-tl-none',
    [CHAT_TYPE.notice]: 'rounded-tl-none'
  }
};

const ChatItem = ({
  isMe,
  hasRead,
  createdAt,
  type,
  noticeUrl,
  content,
  otherProfileProps,
  onContextMenu,
  id
}: any) => {
  const Content = componentsMap[type];

  const handleContextMenu = useCallback(
    (event: React.TouchEvent) => {
      onContextMenu?.({ event, type, content, id, isMe });
    },
    [id]
  );

  if (isMe) {
    return (
      <MeChat hasRead={hasRead} createdAt={createdAt}>
        <Content
          data-target="message"
          content={content}
          noticeUrl={noticeUrl}
          className={clsx('prevent-select', styleMap.me[type])}
          onContextMenu={handleContextMenu}
        />
      </MeChat>
    );
  }

  return (
    <OtherChat createdAt={createdAt} {...otherProfileProps}>
      <Content
        data-target="message"
        content={content}
        noticeUrl={noticeUrl}
        className={clsx('ml-[40px] mt-[6px]', 'prevent-select', styleMap.other[type])}
        onContextMenu={handleContextMenu}
      />
    </OtherChat>
  );
};

export default ChatItem;
