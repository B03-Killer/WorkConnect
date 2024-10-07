import { GetChatMessageType } from '@/types/chat';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeChannel';
import { useCallback, useState } from 'react';

import { useInvalidateChatMessages, useInvalidateLatestNotice, useUpdateActiveAt } from '@/hooks/queries/useChat';
import { useInvalidateUsersInChannel } from '@/hooks/queries/useChannels';

type RealtimePayloadMessagesType = GetChatMessageType & {
  channel_id: string;
};

type RealtimeChatPayloadType = {
  new: RealtimePayloadMessagesType;
  old: RealtimePayloadMessagesType;
  eventType: RealtimeSubscribeProps['eventHandlers'][0]['event'];
};

type HandleNoticeUpdatesProps = { latestNoticeId: number | undefined; channelId: number };

type HandleChatUpdatesProps = {
  channelId: number;
};

export const useChatHandlers = () => {
  const invalidateUsersInChannel = useInvalidateUsersInChannel();
  const invalidateChatMessages = useInvalidateChatMessages();
  const invalidateLatestNotice = useInvalidateLatestNotice();
  const { mutateAsync: updateChannelActiveAt } = useUpdateActiveAt();
  const [payloadMessages, setPayloadMessages] = useState<RealtimePayloadMessagesType[]>([]);

  const handleMessagesUpdates = useCallback(({ channelId }: HandleChatUpdatesProps) => {
    return async (payload: RealtimeChatPayloadType) => {
      const { eventType, new: newPayload } = payload;

      switch (eventType) {
        case 'INSERT':
          setPayloadMessages((prev) => [...prev, newPayload]);
          await updateChannelActiveAt(channelId);
          await invalidateUsersInChannel(channelId);
          break;
        case 'DELETE':
          invalidateChatMessages(channelId);
          setPayloadMessages([]);
          break;
      }
    };
  }, []);

  const handleNoticeUpdates = useCallback(({ latestNoticeId, channelId }: HandleNoticeUpdatesProps) => {
    return (payload: RealtimeChatPayloadType) => {
      const { eventType, new: newPayload, old } = payload;

      const isNoticeDeleted = eventType === 'DELETE' && latestNoticeId === old.id;
      const isNoticeUpdated = newPayload.type === 'notice';

      if (isNoticeDeleted || isNoticeUpdated) {
        invalidateLatestNotice(channelId);
      }
    };
  }, []);

  const handleUserInfoUpdates = useCallback(({ channelId }: HandleChatUpdatesProps) => {
    return () => {
      invalidateUsersInChannel(channelId);
    };
  }, []);

  return {
    handleNoticeUpdates,
    handleMessagesUpdates,
    payloadMessages,
    handleUserInfoUpdates
  };
};
