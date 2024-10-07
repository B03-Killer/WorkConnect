import dayjs, { type Dayjs } from 'dayjs';
import ChatItem from '../ChatItem';

// type ChatsProps = {
//   data: Omit<ChatProps, 'hasRead'>[];
//   onContextMenu: ChatProps['onContextMenu'];
//   lastActiveAt: Dayjs | null;
// };

const Chats = ({ data = [], onContextMenu, lastActiveAt }: any) => {
  return data.map(({ chat, isMe, noticeUrl, otherProfileProps }: any) => {
    const hasRead = isMe && lastActiveAt?.isAfter(dayjs(chat.created_at));

    return (
      <ChatItem
        key={chat.id}
        id={chat.id}
        isMe={isMe}
        hasRead={hasRead ?? false}
        createdAt={chat.created_at}
        type={chat.type}
        content={chat.content}
        onContextMenu={onContextMenu}
        otherProfileProps={otherProfileProps}
        noticeUrl={noticeUrl}
      />
    );
  });
};

export default Chats;
