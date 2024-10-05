import api from '@/api';
import { GetUsersInChannelResponse } from '@/types/channel';
import { CHANNEL_QUERY_KEYS } from '@/constants/queryKeys';
import { createQueryOptions, getPrefetchQuery, useGetQuery } from './common';

const QUERY_OPTIONS = {
  getUsers: (channelId: number) =>
    createQueryOptions<GetUsersInChannelResponse>({
      key: CHANNEL_QUERY_KEYS.USERS_IN_CHANNEL(channelId),
      fn: () => api.channel.getUsersInChannel(channelId)
    }),
  getInfo: (id: number) =>
    createQueryOptions<any>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_INFO(id),
      fn: () => api.channel.getChannelInfo(id),
      selectFn: (data) => data[0]
    }),
  getDocuments: (channelId: number) =>
    createQueryOptions<any>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_DOCUMENTS(channelId),
      fn: () => api.chat.getChannelDocuments(channelId)
    }),
  getMedia: (channelId: number) =>
    createQueryOptions<any>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_MEDIA(channelId),
      fn: () => api.chat.getChannelMedia(channelId)
    }),
  getNotices: (channelId: number) =>
    createQueryOptions<any>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_NOTICES(channelId),
      fn: () => api.chat.getChannelNotices(channelId)
    })
};

export const useGetChannelInfo = (id: number) => useGetQuery(QUERY_OPTIONS.getInfo(id));
export const useGetChannelDocuments = (channelId: number) => useGetQuery(QUERY_OPTIONS.getDocuments(channelId));
export const useGetChannelMedia = (channelId: number) => useGetQuery(QUERY_OPTIONS.getMedia(channelId));
export const useGetChannelNotices = (channelId: number) => useGetQuery(QUERY_OPTIONS.getNotices(channelId));
export const useGetUsersInChannel = (channelId: number) => useGetQuery(QUERY_OPTIONS.getUsers(channelId));

export const useGetPrefetchChannelInfo = async (id: number) => {
  return await getPrefetchQuery(QUERY_OPTIONS.getInfo(id));
};