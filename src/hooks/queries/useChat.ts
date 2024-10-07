import api from '@/api';
import { createQueryOptions } from './common';
import { CHAT_QUERY_KEYS } from '@/constants/queryKeys';
import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { CreateChatMessageProps, GetChatMessagesResponse, GetChatMessageType } from '@/types/chat';
import { PostUploadFileProps } from '@/types/storage';

const QUERY_OPTIONS = {
  getMessages: (channelId: number) =>
    createQueryOptions<GetChatMessagesResponse>({
      key: CHAT_QUERY_KEYS.CHAT_MESSAGES(channelId),
      fn: () => api.chat.getChatMessages(channelId)
    }),
  getLatestNotice: (id: number) =>
    createQueryOptions<GetChatMessageType>({
      key: CHAT_QUERY_KEYS.LATEST_NOTICE(id),
      fn: () => api.chat.getLatestNotice(id)
    })
};

const QUERY_MUTATIONS = {
  createMessage: (channelId: number) => ({
    mutationFn: ({ content, type }: CreateChatMessageProps) =>
      api.chat.createChatMessage({
        channel_id: channelId,
        content,
        type
      })
  }),
  deleteMessage: (channelId: number) => ({
    mutationFn: (id: number) => {
      return api.chat.deleteChatMessage({ channel_id: channelId, id });
    }
  }),
  uploadFile: (options: QueryOptions) => ({
    mutationFn: ({ formData, storagePath, maxFileSize }: PostUploadFileProps) =>
      api.storage.postUploadFile({
        formData,
        storagePath,
        maxFileSize
      }),
    ...options
  })
};

export const useGetChatMessages = (channelId: number) => useQuery(QUERY_OPTIONS.getMessages(channelId));
export const useGetLatestNotice = (id: number) => useQuery(QUERY_OPTIONS.getLatestNotice(id));

export const useCreateMessage = (channelId: number) => {
  return useMutation(QUERY_MUTATIONS.createMessage(channelId));
};
export const useDeleteMessage = (channelId: number) => {
  return useMutation(QUERY_MUTATIONS.deleteMessage(channelId));
};
export const useUploadFile = (options: QueryOptions) => {
  return useMutation(QUERY_MUTATIONS.uploadFile(options));
};
