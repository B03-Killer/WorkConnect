import { REALTIME_CHANNEL_NAME } from '@/constants/realtime';
import createRealtimeChannel from '@/utils/createRealtimeChannel';

type SubscribeToChatProps = {
  handleMessagesUpdates: (payload: any) => void;
  handleUserInfoUpdates: () => void;
  userIds: string;
};

/**
 * @function handleSubscribeToChat
 * @description
 * filter 옵션을 사용하면 DELETE 이벤트를 감지하지 못하는 이슈로 인해 filter를 주석처리함
 */
export const handleSubscribeToChat = ({
  handleMessagesUpdates,
  handleUserInfoUpdates,
  userIds
}: SubscribeToChatProps) => {
  return createRealtimeChannel({
    channelName: REALTIME_CHANNEL_NAME.CHAT,
    eventHandlers: [
      {
        event: '*',
        schema: 'public',
        table: 'chat',
        //filter: `channel_id=eq.${id}`,
        handler: handleMessagesUpdates
      },
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'workspace_user',
        filter: `id=in.(${userIds})`,
        handler: handleUserInfoUpdates
      }
    ]
  });
};

/**
 * @function handleSubscribeToNotice
 * @description
 * filter 옵션을 사용하면 DELETE 이벤트를 감지하지 못하는 이슈로 인해 filter를 주석처리함
 */
export const handleSubscribeToNotice = ({ handler, id }: { handler: (payload: any) => void; id: number }) => {
  return createRealtimeChannel({
    channelName: REALTIME_CHANNEL_NAME.CHAT_FOR_NOTICE,
    eventHandlers: [
      {
        event: '*',
        schema: 'public',
        table: 'chat',
        //filter: `channel_id=eq.${id}`,
        handler
      }
    ]
  });
};
