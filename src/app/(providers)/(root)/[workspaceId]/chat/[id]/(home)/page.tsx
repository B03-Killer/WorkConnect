'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GetChatMessageType } from '@/types/chat';
import { useParams } from 'next/navigation';
import { useGetChatMessages, useGetLatestNotice, useGetUsersInChannel } from '../../_hooks/useQueryChat';
import { QUERY_KEYS } from '../../_constants/constants';
import { subscribeToChat } from '../../_utils/subscribe';
import ChatMessagesWrapper from '../_components/ChatMessagesWrapper';
import ChatMessages from '../_components/ChatMessages';
import ChatFooter from '../_components/ChatFooter';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeSubscription';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import ChatNotice from '../_components/ChatNotice';
import { isEmpty } from '@/utils/isEmpty';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

type RealtimeChatPayloadType = {
  new: RealtimePayloadMessagesType;
  old: RealtimePayloadMessagesType;
  eventType: RealtimeSubscribeProps['eventHandlers'][0]['event'];
};

const ChatDetailPage = () => {
  const { id: channelId } = useParams();
  const stringId = Array.isArray(channelId) ? channelId[0] : channelId;
  const workspaceUserId = useWorkspaceUserId();

  const containerRef = useRef<HTMLDivElement>(null);
  const [payloadMessages, setPayloadMessages] = useState<RealtimePayloadMessagesType[]>([]);
  const [isOpenUtil, setIsOpenUtil] = useState(false);
  const queryClient = useQueryClient();

  const { data: chatMessages = [], isPending: isPendingChatMessages } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { data: usersInChannel = {}, isPending: isPendingUsersInChannel } = useGetUsersInChannel({
    channel_id: Number(channelId),
    workspace_user_id: workspaceUserId
  });

  const isPending = isPendingChatMessages || isPendingUsersInChannel;

  const { data: latestNotice } = useGetLatestNotice({ id: stringId });

  const isExistLatestNotice = !isEmpty(latestNotice);

  // TODO: 그런 관점에서 useState를 굳이 유지할 필요가 있낭? 근데... 필요하긴 한데 왜냐면 db 호출 계속 하는거 아니니까 ㅠㅠ
  const handleChatUpdates = (payload: RealtimeChatPayloadType) => {
    if (payload.eventType === 'DELETE' && latestNotice?.id === payload.old.id) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LATEST_NOTICE(stringId) });
    }

    if (payload.new.type === 'notice') {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LATEST_NOTICE(stringId) });
    }

    if (payload.eventType === 'INSERT') {
      setPayloadMessages((prev) => [...prev, payload.new]);
      return;
    }

    if (payload.eventType === 'DELETE') {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT_MESSAGES(Number(channelId)) });
      setPayloadMessages([]);
    }
  };

  const handleUserUpdates = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId)) });
  };

  const handleOpenUtil = () => {
    setIsOpenUtil((prev) => !prev);
  };

  const userIds = useMemo(() => {
    return Object.keys(usersInChannel).join(',');
  }, [usersInChannel]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages]);

  useEffect(subscribeToChat({ handleUserUpdates, handleChatUpdates, id: stringId, userIds }), [
    userIds,
    latestNotice?.id
  ]);

  if (isPending) return null;

  return (
    <div
      className={`flex flex-col flex-grow h-[calc(100dvh+42px)] transform ease-in-out duration-300 ${
        isOpenUtil ? 'translate-y-[-96px]' : 'translate-y-[0px]'
      }`}
    >
      {isExistLatestNotice && <ChatNotice latestNotice={latestNotice} />}
      <ChatMessagesWrapper ref={containerRef}>
        <ChatMessages data={chatMessages} usersInChannel={usersInChannel} />
        <ChatMessages data={payloadMessages} usersInChannel={usersInChannel} />
      </ChatMessagesWrapper>
      <ChatFooter id={stringId} handleOpenUtil={handleOpenUtil} />
      {isOpenUtil && <div className="fixed top-0 left-0 w-full h-full z-40" onClick={handleOpenUtil} />}
    </div>
  );
};

export default ChatDetailPage;
