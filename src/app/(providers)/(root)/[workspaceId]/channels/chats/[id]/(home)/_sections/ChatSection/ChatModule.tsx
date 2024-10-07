'use client';

import useChatContextMenuStore from '@/store/chatContextMenuStore';
import { isEmpty } from '@/utils/isEmpty';
import { useEffect, useRef } from 'react';
import { useMutationUpdateChannelActiveAt } from '../../../../_hook/useChatMutation';
import { useGetUsersInChannel } from '../../../../_hook/useChatQuery';

import useChatMessageList from '../../../../../(chat)/[id]/(home)/_hooks/useChatMessageList';
import useGetParamsChannelId from '../../../../../(chat)/[id]/(home)/_hooks/useGetParamsChannelId';
import { Chats } from '@/components/Chats';

const ChatModule = () => {
  const ref = useRef<HTMLDivElement>(null);
  const channelId = useGetParamsChannelId();

  const { openMenu } = useChatContextMenuStore();
  const { chatMessageList, lastActiveAt } = useChatMessageList();

  const { data: usersInChannel = {} } = useGetUsersInChannel(Number(channelId));
  const { mutate: updateChannelActiveAt } = useMutationUpdateChannelActiveAt();

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
            onContextMenu={({ targetElement, chat, isMe }) =>
              openMenu({
                targetElement,
                type: chat.type,
                text: chat.content,
                id: chat.id,
                isMe
              })
            }
          />
        )}
      </div>
    </article>
  );
};

export default ChatModule;
