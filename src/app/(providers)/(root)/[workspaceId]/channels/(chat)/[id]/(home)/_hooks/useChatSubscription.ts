import { useEffect } from 'react';
import { useGetUsersInChannel } from '../../../_hook/useChatQuery';
import { useChatHandlers } from './useChatHandlers';
import { handleSubscribeToChat } from '../_utils/subscribe';
import { GetUsersInChannelResponse } from '@/types/channel';
import { isEmpty } from '@/utils/isEmpty';

type UseChatSubscriptionProps = {
  channelId: number;
  usersInChannel: GetUsersInChannelResponse;
  isPendingUsersInChannel: boolean;
};

const useChatSubscription = ({ channelId, usersInChannel, isPendingUsersInChannel }: UseChatSubscriptionProps) => {
  const { handleMessagesUpdates, handleUserInfoUpdates, payloadMessages } = useChatHandlers();

  useEffect(() => {
    if (!channelId || isPendingUsersInChannel || isEmpty(usersInChannel)) return;

    const channel = handleSubscribeToChat({
      handleMessagesUpdates: handleMessagesUpdates({ channelId }),
      handleUserInfoUpdates: handleUserInfoUpdates({ channelId }),
      userIds: Object.keys(usersInChannel).join(',')
    }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [channelId, isPendingUsersInChannel, usersInChannel]);

  return { payloadMessages };
};

export default useChatSubscription;
