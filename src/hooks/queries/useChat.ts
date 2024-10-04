import api from '@/api';
import { createQueryOptions } from './common';
import { CHAT_QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const QUERY_OPTIONS = {
  getMessages: (channelId: number) =>
    createQueryOptions<any>({
      key: CHAT_QUERY_KEYS.CHAT_MESSAGES(channelId),
      fn: () => api.chat.getChatMessages(channelId)
    }),
  getLatestNotice: (id: number) =>
    createQueryOptions<any>({
      key: CHAT_QUERY_KEYS.LATEST_NOTICE(id),
      fn: () => api.chat.getLatestNotice(id)
    })
};

export const useGetChatMessages = (channelId: number) => useQuery(QUERY_OPTIONS.getMessages(channelId));
export const useGetLatestNotice = (id: number) => useQuery(QUERY_OPTIONS.getLatestNotice(id));
