'use client';

import { useGetUsersInChannel } from '@/hooks/queries/useChannels';
import { isEmpty } from '@/utils/isEmpty';
import { useEffect, useRef } from 'react';
import { useMutationUpdateChannelActiveAt } from '../../../../../chats/_hook/useChatMutation';
import useChatMessageList from '../../../../../chats/[id]/(home)/_hooks/useChatMessageList';
import useGetParamsChannelId from '../../../../../chats/_hook/useGetParamsChannelId';
import Chats from './Chats';

const ChatList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const channelId = useGetParamsChannelId();

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
        {!isEmpty(usersInChannel) && <Chats data={chatMessageList} lastActiveAt={lastActiveAt} />}
      </div>
    </article>
  );
};

export default ChatList;
