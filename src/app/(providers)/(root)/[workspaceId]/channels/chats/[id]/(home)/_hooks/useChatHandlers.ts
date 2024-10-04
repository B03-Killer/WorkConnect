import { GetChatMessageType } from '@/types/chat';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeChannel';
import { useCallback, useState } from 'react';
import { useMutationUpdateChannelActiveAt } from '../../../_hook/useChatMutation';
import {
  useInvalidateChatMessages,
  useInvalidateLatestNotice,
  useInvalidateUsersInChannel
} from '../../../_hook/useChatQuery';

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
  const { invalidate: invalidateUsersInChannel } = useInvalidateUsersInChannel();
  const { invalidate: invalidateChatMessages } = useInvalidateChatMessages();
  const { invalidate: invalidateLatestNotice } = useInvalidateLatestNotice();
  const { mutateAsync: updateChannelActiveAt } = useMutationUpdateChannelActiveAt();
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
