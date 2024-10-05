import { CHAT_TYPE } from '@/constants/chat';
import MeChat from './MeChat';
import OtherChat from './OtherChat';
import { ChatImage, ChatFile, ChatVideo, ChatText, ChatNotice } from './ChatContent';
import clsx from 'clsx';

const componentsMap: any = {
  [CHAT_TYPE.image]: (props: any) => <ChatImage {...props} />,
  [CHAT_TYPE.document]: (props: any) => <ChatFile {...props} />,
  [CHAT_TYPE.video]: (props: any) => <ChatVideo {...props} />,
  [CHAT_TYPE.text]: (props: any) => <ChatText {...props} />,
  [CHAT_TYPE.notice]: (props: any) => <ChatNotice {...props} />
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

const ChatItem = ({ isMe, hasRead, createdAt, src, userName, href, type, content }: any) => {
  const Content = componentsMap[type];

  if (isMe) {
    return (
      <MeChat hasRead={hasRead} createdAt={createdAt}>
        <Content data-target="message" content={content} className={clsx('prevent-select', styleMap.me[type])} />
      </MeChat>
    );
  }

  return (
    <OtherChat href={href} src={src} userName={userName} createdAt={createdAt}>
      <Content
        data-target="message"
        content={content}
        className={clsx('ml-[40px] mt-[6px]', 'prevent-select', styleMap.other[type])}
      />
    </OtherChat>
  );
};

export default ChatItem;
