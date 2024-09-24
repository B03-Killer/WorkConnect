import type { GetChatMessageType } from '@/types/chat';
import type { GetUsersInChannelResponse } from '@/types/channel';
import { isEmpty } from '@/utils/isEmpty';
import { formatDate } from '@/utils/time';
import dayjs, { type Dayjs } from 'dayjs';
import OtherProfile from './OtherProfile';
import ReadBadge from './ReadBadge';
import Time from './Time';
import { Chat } from '../Chat';
import { MenuStoreType } from '@/store/chatContextMenuStore';

type ChatMessagesProps = {
  data: GetChatMessageType[] & { channel_id?: string };
  usersInChannel: GetUsersInChannelResponse;
  workspaceUserId: string;
  openMenu: MenuStoreType['openMenu'];
  workspaceId: number;
  noticeUrl: string;
  lastActiveAt: Dayjs | null;
};

const Chats = ({
  data = [],
  usersInChannel = {},
  workspaceUserId,
  openMenu,
  workspaceId,
  noticeUrl,
  lastActiveAt
}: ChatMessagesProps) => {
  if (isEmpty(usersInChannel)) return null;

  return (
    <>
      {data.map((chat) => {
        const userInfo = usersInChannel[chat.workspace_user_id || ''];
        const isMe = chat.workspace_user_id === workspaceUserId;
        const profileUrl = `/${workspaceId}/profile/${chat.workspace_user_id}`;
        const hasRead = isMe && lastActiveAt?.isAfter(dayjs(chat.created_at));

        return (
          <div key={chat.id} className={`flex items-end gap-2 justify-end ${isMe ? '' : 'flex-wrap flex-row-reverse'}`}>
            {!isMe && (
              <OtherProfile profileImage={userInfo?.profile_image} name={userInfo?.name} profileUrl={profileUrl} />
            )}
            <div className="flex flex-col gap-1">
              {hasRead && <ReadBadge />}
              <Time>{formatDate(chat.created_at, 'A h:mm').toKor()}</Time>
            </div>
            <Chat
              content={chat.content}
              type={chat.type}
              id={chat.id}
              isMe={isMe}
              noticeUrl={noticeUrl}
              openMenu={openMenu}
            />
          </div>
        );
      })}
    </>
  );
};

export default Chats;
