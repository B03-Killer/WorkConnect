import { queryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import api from '@/api';

export const getChannelInfoOptions = (id: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.CHANNEL_INFO(id),
    queryFn: () => api.channel.getChannelInfo(id),
    refetchOnWindowFocus: false,
    staleTime: 0,
    select: (data) => data[0]
  });
};

export const getUsersInChannelOptions = (channelId: number) => {
  return queryOptions({
    queryKey: QUERY_KEYS.USERS_IN_CHANNEL(channelId),
    queryFn: () => api.channel.getUsersInChannel(channelId),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};
