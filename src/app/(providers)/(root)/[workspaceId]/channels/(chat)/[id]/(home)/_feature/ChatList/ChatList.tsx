'use client';

import { useGetUsersInChannel } from '@/hooks/queries/useChannels';
import { isEmpty } from '@/utils/isEmpty';
import { useEffect, useRef } from 'react';
import useChatMessageList from '../../_hooks/useChatMessageList';
import useGetParamsChannelId from '../../_hooks/useGetParamsChannelId';
import Chats from './Chats';
import useChatContextMenuStore, { OpenMenuProps2 } from '@/store/chatContextMenuStore';
import { useUpdateActiveAt } from '@/hooks/queries/useChat';

const ChatList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const channelId = useGetParamsChannelId();
  const { openMenu } = useChatContextMenuStore();

  const { chatMessageList, lastActiveAt } = useChatMessageList();

  const { data: usersInChannel = {} } = useGetUsersInChannel(Number(channelId));
  const { mutate: updateChannelActiveAt } = useUpdateActiveAt();

  useEffect(() => {
    if (!channelId) return;

    updateChannelActiveAt(channelId);
  }, [channelId]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ block: 'end' });
  }, [chatMessageList.length]);

  return (
    <article className="flex-grow overflow-y-scroll px-4 scroll-container">
      <div className="relative flex flex-col gap-6 py-4" ref={ref}>
        {!isEmpty(usersInChannel) && (
          <Chats
            data={chatMessageList}
            lastActiveAt={lastActiveAt}
            onContextMenu={({ event, type, content, id, isMe }: OpenMenuProps2) =>
              openMenu({
                event,
                type,
                content,
                id,
                isMe
              })
            }
          />
        )}
      </div>
    </article>
  );
};

export default ChatList;
