'use client';

import { useEffect, useRef } from 'react';
import Chats from '../Chats';
import { MessagesWrapper } from '../MessagesContainer';
import { useGetChatMessages, useGetUsersInChannel } from '../../../../_hook/useChatQuery';
import useGetParamsChannelId from '../../../../_hook/useGetParamsChannelId';
import useChatSubscription from '../../_hooks/useChatSubscription';

const Messages = () => {
  const channelId = useGetParamsChannelId();
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: chatMessages = [], isPending } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const {
    data: usersInChannel = {},
    isLoading,
    isPending: isPendingUsersInChannel
  } = useGetUsersInChannel(Number(channelId));

  const { payloadMessages } = useChatSubscription({ channelId, usersInChannel, isPendingUsersInChannel });

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages, isLoading]);

  return (
    <MessagesWrapper ref={containerRef}>
      <Chats data={[...chatMessages, ...payloadMessages]} usersInChannel={usersInChannel} />
    </MessagesWrapper>
  );
};

export default Messages;
