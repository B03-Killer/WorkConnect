'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useGetLatestNotice } from '../../../_hook/useChatQuery';
import useGetParamsChannelId from '../../../_hook/useGetParamsChannelId';

const useChatNotice = () => {
  const channelId = useGetParamsChannelId();
  const workspaceId = useWorkspaceId();
  const { data: latestNotice } = useGetLatestNotice({ id: channelId });

  const noticeUrl = `/${workspaceId}/channels/${channelId}/notice`;

  return { noticeUrl, latestNotice };
};

export default useChatNotice;
