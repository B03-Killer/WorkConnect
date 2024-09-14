import api from '@/api';
import type { GetChatMessagesProps } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { getChannelInfoOptions, getUsersInChannelOptions } from '../_utils/getQueryOptions';
import { QUERY_KEYS } from '../_constants/constants';

/**
 * 쿼리를 선언한후에 import해서 사용하는 아래의 패턴은 좋은 것 같아요. 다만,
 * QUERY_KEYS 너무 멀리 두지 말고 해당 파일과 가깝게 (또는 같이 둬서) 필요한 query는 각각 선언해서 아래처럼 사용하는 것이 경험상 더 좋았습니다.
 *
 * 리고 invalidation만 필요한 경우에도 따로 query에 선언해서 import해서 사용하시면 쿼리키 관리가 더 명확해지는 것 같습니다
 * (src/app/(providers)/(root)/[workspaceId]/channels/(chat)/[id]/(home)/_hooks/useChatHandlers.ts)
 * ``` typescript
 * const useInvalidateChatMessages = () => {
 *  const queryClient = useQueryClient();
 *  return { invalidate: () => queryClient.invalidateQueries(QUERY_KEYS.CHAT_MESSAGES(channel_id)) };
 * }
 *
 * const { invalidate } = useInvalidateChatMessages();
 * ```
 **/
export const useGetChatMessages = ({ channel_id }: GetChatMessagesProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_MESSAGES(channel_id),
    queryFn: () => api.chat.getChatMessages(channel_id),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useGetLatestNotice = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: QUERY_KEYS.LATEST_NOTICE(id),
    queryFn: () => api.chat.getLatestNotice(id),
    refetchOnWindowFocus: false,
    staleTime: 0
  });
};

export const useGetUsersInChannel = (channelId: number) => {
  return useQuery(getUsersInChannelOptions(channelId));
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
