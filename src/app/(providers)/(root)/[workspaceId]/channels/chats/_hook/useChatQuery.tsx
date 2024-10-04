import api from '@/api';
import type { GetChatMessagesProps } from '@/types/chat';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getChannelInfoOptions, getUsersInChannelOptions } from '../_utils/getQueryOptions';
import { QUERY_KEYS } from '../_constants/constants';
import { GetUsersInChannelResponse } from '@/types/channel';

export const useGetChatMessages = ({ channel_id }: GetChatMessagesProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_MESSAGES(channel_id),
    queryFn: () => api.chat.getChatMessages(channel_id),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useInvalidateChatMessages = () => {
  const queryClient = useQueryClient();

  return {
    invalidate: (channelId: number) =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT_MESSAGES(Number(channelId)) })
  };
};

export const useGetLatestNotice = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: QUERY_KEYS.LATEST_NOTICE(id),
    queryFn: () => api.chat.getLatestNotice(id),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useInvalidateLatestNotice = () => {
  const queryClient = useQueryClient();

  return {
    invalidate: (channelId: number) => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LATEST_NOTICE(channelId) })
  };
};

export const useGetUsersInChannel = (channelId: number) => {
  return useQuery(getUsersInChannelOptions(channelId));
};

export const useInvalidateUsersInChannel = () => {
  const queryClient = useQueryClient();

  return {
    invalidate: (channelId: number) =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId)) })
  };
};

export const useGetQueryDataUsersInChannel = (channelId: number) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<GetUsersInChannelResponse>(QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId)));
};

export const useGetChannelInfo = ({ id }: { id: number }) => {
  return useQuery(getChannelInfoOptions(id));
};

export const useGetChannelDocuments = (channelId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNEL_DOCUMENTS(channelId),
    queryFn: () => api.chat.getChannelDocuments(channelId),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useGetChannelMedia = (channelId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNEL_MEDIA(channelId),
    queryFn: () => api.chat.getChannelMedia(channelId),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useGetChannelNotices = (channelId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHANNEL_NOTICES(channelId),
    queryFn: () => api.chat.getChannelNotices(channelId),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};
