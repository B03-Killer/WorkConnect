'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import useGetParamsChannelId from './useGetParamsChannelId';
import { useGetLatestNotice } from '@/hooks/queries/useChat';

const useChatNotice = () => {
  const channelId = useGetParamsChannelId();
  const workspaceId = useWorkspaceId();
  const { data: latestNotice } = useGetLatestNotice(channelId);

  const noticeUrl = `/${workspaceId}/channels/${channelId}/notice`;

  return { noticeUrl, latestNotice };
};

export default useChatNotice;
