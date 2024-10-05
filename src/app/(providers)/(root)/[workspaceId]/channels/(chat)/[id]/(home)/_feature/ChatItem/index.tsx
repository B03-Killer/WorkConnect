import { CHAT_TYPE } from '@/constants/chat';
import MeChat from './MeChat';
import OtherChat from './OtherChat';
import { ChatImage, ChatFile, ChatVideo, ChatText, ChatNotice } from './ChatContent';

const componentsMap: any = {
  [CHAT_TYPE.image]: (props: any) => <ChatImage {...props} />,
  [CHAT_TYPE.document]: (props: any) => <ChatFile {...props} />,
  [CHAT_TYPE.video]: (props: any) => <ChatVideo {...props} />,
  [CHAT_TYPE.text]: (props: any) => <ChatText {...props} />,
  [CHAT_TYPE.notice]: (props: any) => <ChatNotice {...props} />
};

const ChatItem = ({ isMe, hasRead, createdAt, src, userName, href, type }: any) => {
  const Content = componentsMap[type];

  if (isMe) {
    return (
      <MeChat hasRead={hasRead} createdAt={createdAt}>
        <Content data-target="message" />
      </MeChat>
    );
  }

  return (
    <OtherChat href={href} src={src} userName={userName} createdAt={createdAt}>
      <Content data-target="message" />
    </OtherChat>
  );
};

export default ChatItem;
