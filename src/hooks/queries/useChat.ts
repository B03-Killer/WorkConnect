import api from '@/api';
import { createQueryOptions } from './common';
import { CHAT_QUERY_KEYS } from '@/constants/queryKeys';
import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { CreateChatMessageProps, GetChatMessagesResponse, GetChatMessageType } from '@/types/chat';
import { PostUploadFileProps } from '@/types/storage';

const OPTIONS = {
  getMessages: (channelId: number) => {
    return createQueryOptions<GetChatMessagesResponse>({
      key: CHAT_QUERY_KEYS.CHAT_MESSAGES(channelId),
      fn: () => api.chat.getChatMessages(channelId)
    });
  },
  getLatestNotice: (id: number) => {
    return createQueryOptions<GetChatMessageType>({
      key: CHAT_QUERY_KEYS.LATEST_NOTICE(id),
      fn: () => api.chat.getLatestNotice(id)
    });
  }
};

const MUTATIONS = {
  createMessage: (channelId: number) => ({
    mutationFn: ({ content, type }: CreateChatMessageProps) => {
      return api.chat.createChatMessage({
        channel_id: channelId,
        content,
        type
      });
    }
  }),
  deleteMessage: (channelId: number) => ({
    mutationFn: (id: number) => {
      return api.chat.deleteChatMessage({ channel_id: channelId, id });
    }
  }),
  uploadFile: (options: QueryOptions) => ({
    mutationFn: ({ formData, storagePath, maxFileSize }: PostUploadFileProps) => {
      return api.storage.postUploadFile({
        formData,
        storagePath,
        maxFileSize
      });
    },
    ...options
  }),
  updateActiveAt: () => ({
    mutationFn: (channelId: number) => {
      return api.channel.updateChannelActiveAt(channelId);
    }
  })
};

export const useGetChatMessages = (channelId: number) => useQuery(OPTIONS.getMessages(channelId));
export const useGetLatestNotice = (id: number) => useQuery(OPTIONS.getLatestNotice(id));
export const CHAT_QUERY_OPTIONS = OPTIONS;

export const useCreateMessage = (channelId: number) => {
  return useMutation(MUTATIONS.createMessage(channelId));
};
export const useDeleteMessage = (channelId: number) => {
  return useMutation(MUTATIONS.deleteMessage(channelId));
};
export const useUploadFile = (options: QueryOptions) => {
  return useMutation(MUTATIONS.uploadFile(options));
};
export const useUpdateActiveAt = () => {
  return useMutation(MUTATIONS.updateActiveAt());
};
