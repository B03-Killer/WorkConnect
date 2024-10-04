import api from '@/api';
import type { CreateChatMessageProps } from '@/types/chat';
import { PostUploadFileProps } from '@/types/storage';
import { useMutation } from '@tanstack/react-query';

type UseChatMessageProps = Pick<CreateChatMessageProps, 'channel_id'> & {
  onSuccess?: () => void;
};

type UseChatMessageMutationProps = Omit<CreateChatMessageProps, 'channel_id'>;

export const useMutationChatMessage = ({ channel_id, ...props }: UseChatMessageProps) => {
  return useMutation({
    mutationFn: ({ content, type }: UseChatMessageMutationProps) => {
      return api.chat.createChatMessage({
        channel_id,
        content,
        type
      });
    },
    ...props
  });
};

export const useMutationDeleteChatMessage = ({ channel_id, ...props }: UseChatMessageProps) => {
  return useMutation({
    mutationFn: (id: number) => {
      return api.chat.deleteChatMessage({ channel_id, id });
    },
    ...props
  });
};

export const useMutationUploadFile = ({ ...options }) => {
  return useMutation({
    mutationFn: ({ formData, storagePath, maxFileSize = 3 }: PostUploadFileProps) =>
      api.storage.postUploadFile({
        formData,
        storagePath,
        maxFileSize
      }),
    ...options
  });
};

export const useMutationUpdateChannelActiveAt = () => {
  return useMutation({
    mutationFn: (channelId: number) => api.channel.updateChannelActiveAt(channelId)
  });
};
